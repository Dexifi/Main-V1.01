import { Connection, PublicKey } from "@solana/web3.js";
import {
  getProgramId,
  getReservesFromChain,
  SolendMarket,
} from "@solendprotocol/solend-sdk/index";
import { useLend } from "./store";
import SwitchboardProgram from "@switchboard-xyz/sbv2-lite";
import BigNumber from "bignumber.js";
import { formatCompact } from "./lib";
import { mainAddress, turboAddress } from "./config";

const InitialLending = async (connection: Connection) => {
  await getMarkets(connection);
  await getReserves(connection, mainAddress);
  await getReserves(connection, turboAddress);
};
export default InitialLending;

const getMarkets = async (connection: Connection) => {
  const TurboMarket = await SolendMarket.initialize(
    connection,
    "production", // optional environment argument
    turboAddress
  );
  const MainMarket = await SolendMarket.initialize(connection, "production");
  useLend.setState({ turboMarket: TurboMarket, mainMarket: MainMarket });
};

const getReserves = async (connection: Connection, poolAddress: string) => {
  const switchBoard = await SwitchboardProgram.loadMainnet(connection);
  const programId = getProgramId("production").toBase58();
  const currentSlot = await connection.getSlot();

  const reserves = await getReservesFromChain(
    connection,
    switchBoard,
    programId,
    currentSlot
  ).then(
    (res) => res.filter((r) => r.poolAddress === poolAddress)
    // .filter((r) => r.poolAddress === poolAddress)
  );
  const totalSupplyUsd = reserves.reduce(
    (subAcc, r) => r.totalSupplyUsd.plus(subAcc),
    new BigNumber(0)
  );
  const totalBorrowUsd = reserves.reduce(
    (subAcc, r) => r.totalBorrowUsd.plus(subAcc),
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
