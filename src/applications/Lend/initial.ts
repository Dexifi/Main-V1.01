import { Connection, PublicKey } from "@solana/web3.js";
import {
  fetchObligationsByAddress,
  formatObligation,
  getProgramId,
  getReservesFromChain,
  SolendMarket,
} from "@solendprotocol/solend-sdk/index";
import { LendState, useLend } from "./store";
import SwitchboardProgram from "@switchboard-xyz/sbv2-lite";
import BigNumber from "bignumber.js";
import { formatCompact } from "./lib";
import { mainAddress, turboAddress } from "./config";

const InitialLending = async (
  connection: Connection,
  publicKey: PublicKey | null
) => {
  await getMarkets(connection);
  await loadReserves(connection);
  await getMarketDetails(connection, mainAddress);
  await getMarketDetails(connection, turboAddress);
  publicKey && (await getObligations(connection, publicKey));
};
export default InitialLending;

const getMarkets = async (connection: Connection) => {
  const TurboMarket = await SolendMarket.initialize(
    connection,
    "production", // optional environment argument
    turboAddress
  );
  const MainMarket = await SolendMarket.initialize(connection, "production");
  await MainMarket.loadAll();
  await TurboMarket.loadAll();
  useLend.setState({ turboMarket: TurboMarket, mainMarket: MainMarket });
};

const loadReserves = async (connection: Connection) => {
  const switchBoard = await SwitchboardProgram.loadMainnet(connection);
  const programId = getProgramId("production").toBase58();
  const currentSlot = await connection.getSlot();
  const localData: LendState["poolList"] = [];
  const reserves = await getReservesFromChain(
    connection,
    switchBoard,
    programId,
    currentSlot
  );
  // useLend.getState().setPoolList(reserves);
  const mainMarket = useLend.getState().mainMarket;
  const turboMarket = useLend.getState().turboMarket;

  mainMarket?.reserves.map((marketReserve) => {
    const reserve = reserves.find(
      (r) => r.address === marketReserve.config.address
    );
    localData.push({ reserve, marketReserve });
  });
  turboMarket?.reserves.map((marketReserve) => {
    const reserve = reserves.find(
      (r) => r.address === marketReserve.config.address
    );
    localData.push({ reserve, marketReserve });
  });
  useLend.getState().setPoolList(localData);
};
const getMarketDetails = async (
  connection: Connection,
  poolAddress: string
) => {
  const reserves = useLend
    .getState()
    .poolList?.filter((r) => r.reserve?.poolAddress === poolAddress);

  const totalSupplyUsd = reserves.reduce(
    (subAcc, r) => r.reserve!.totalSupplyUsd.plus(subAcc),
    new BigNumber(0)
  );
  const totalBorrowUsd = reserves.reduce(
    (subAcc, r) => r.reserve!.totalBorrowUsd.plus(subAcc),
    new BigNumber(0)
  );

  const tvl = totalSupplyUsd.minus(totalBorrowUsd);
  if (poolAddress === mainAddress) {
    useLend.getState().setMainMarketDetails({
      tvl: formatCompact(tvl),
      totalSupply: formatCompact(totalSupplyUsd),
      totalBorrow: formatCompact(totalBorrowUsd),
      totalSupplyBN: totalSupplyUsd,
      totalBorrowBN: totalBorrowUsd,
      maxOutflow: 0,
      owner: "Solend",
    });
  } else {
    useLend.getState().setTurboMarketDetails({
      tvl: formatCompact(tvl),
      totalSupply: formatCompact(totalSupplyUsd),
      totalBorrow: formatCompact(totalBorrowUsd),
      totalSupplyBN: totalSupplyUsd,
      totalBorrowBN: totalBorrowUsd,
      maxOutflow: 0,
      owner: "Solend",
    });
  }
};

const getObligations = async (connection: Connection, publicKey: PublicKey) => {
  const mainMarket = useLend.getState().mainMarket;
  const turboMarket = useLend.getState().turboMarket;
  const mainObligation = await mainMarket?.fetchObligationByWallet(publicKey);
  mainObligation && useLend.getState().setMainObligations(mainObligation);
  const turboObligation = await turboMarket?.fetchObligationByWallet(publicKey);
  turboObligation && useLend.getState().setTurboObligations(turboObligation);
};
