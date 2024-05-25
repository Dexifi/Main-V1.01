import { Token } from "@/types/token";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { connection } from "@/lib/get-connections";
import { BaseWalletAdapter } from "@solana/wallet-adapter-base";
import { useDashboard } from "@/applications/Dashboard/store";
import axios from "@/data/axios";
import { SOL_MINT } from "@/applications/Liquidity/config";
import { TokenInfo } from "@solana/spl-token-registry";
import { fetchFarmPools } from "@/data/pools";
import { getPrice } from "@/data/price";
import { findToken } from "@/lib/get-wallet";
import {
  ApiFarmInfo,
  ApiPairsItem,
  ENDPOINT,
  Farm,
  FarmPoolKeys,
  RAYDIUM_MAINNET,
} from "@raydium-io/raydium-sdk";
import { SolendMarket } from "@solendprotocol/solend-sdk/index";
import { Market, OpenOrders } from "@openbook-dex/openbook";

import { FarmType, ownerOpenOrders, stateType } from "./types";
import { userCLMMDeposit, userDeposit } from "@/applications/Liquidity/deposit";
import { useLiquidity } from "@/applications/Liquidity/store";
import { RaydiumPools } from "@/applications/Liquidity/pool";
import { fetchPairs } from "@/data/pairs";
import { Metaplex } from "@metaplex-foundation/js";

export const initialData = async (wallet: BaseWalletAdapter) => {
  await getWalletBalance(wallet);
  await getTokensPrice();
  await getStakes(wallet);
  await getLends(wallet);
  await getTrades(wallet);
  await getLiquidities(wallet);
  await getFarm(wallet);
  await getNft(wallet);
};

const getWalletBalance = async (wallet: BaseWalletAdapter) => {
  const publicKey = wallet.publicKey;
  if (!publicKey) return;
  const localTokens: Token[] = [];
  let totalBalance = 0;
  const walletTokens = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: publicKey.toString(),
          },
        },
      ],
    }
  );
  const tokenMints = walletTokens.map((token: any) => {
    return token.account.data.parsed.info.mint;
  });

  const prices = await axios
    .get(
      `https://price.jup.ag/v4/price?ids=${
        tokenMints.join(",") + "," + SOL_MINT
      }`
    )
    .then((res) => res.data.data);
  const tokens = await axios
    .get<TokenInfo[]>("https://token.jup.ag/all")
    .then((res) => res.data);

  for (const token of walletTokens) {
    // @ts-ignore
    const key = token.account.data.parsed.info.mint as string;
    const tokenDetails = tokens.find((t) => t.address === key);
    if (!tokenDetails?.name) continue;
    const price = prices[key]?.price;
    // @ts-ignore
    const amount = token.account.data.parsed.info.tokenAmount.uiAmount;
    localTokens.push({
      ...tokenDetails,
      amount: amount,
      price: price,
    });
    totalBalance += (amount ?? 0) * (price ?? 0);
  }
  // get SOL Balance
  const solPrice = prices[SOL_MINT.toBase58()].price;

  const solBalance = await connection.getBalance(publicKey);
  localTokens.push({
    symbol: "SOL",
    name: "Solana",
    amount: solBalance / LAMPORTS_PER_SOL,
    logoURI: "assets/images/solana-1@2x.png",
    tags: ["native"],
    decimals: 9,
    address: "So11111111111111111111111111111111111111112",
    price: solPrice,
  });
  totalBalance += (solBalance / LAMPORTS_PER_SOL) * solPrice;

  useDashboard.setState({ walletTokenAccounts: localTokens });

  const netWorth = useDashboard.getState().netWorth;
  useDashboard.setState({
    netWorth: { ...netWorth, totalWallet: totalBalance },
  });
};

const getStakes = async (wallet: BaseWalletAdapter) => {
  if (!wallet.publicKey) return;

  const farmPools = await fetchFarmPools();

  const stakeInfo = farmPools.stake[0];
  const lpPrice = await getPrice(stakeInfo.symbol);
  const lpToken = await findToken(stakeInfo.symbol);
  const farmInfoWithKeys = {
    ...stakeInfo,
    id: new PublicKey(stakeInfo.id),
    programId: new PublicKey(stakeInfo.programId),
    baseMint: new PublicKey(stakeInfo.lpMint),
    quoteMint: new PublicKey(stakeInfo.lpMint),
    lpMint: new PublicKey(stakeInfo.lpMint),
    authority: new PublicKey(stakeInfo.authority),
    lpVault: new PublicKey(stakeInfo.lpVault),
    rewardInfos: stakeInfo.rewardInfos.map((r) => ({
      ...r,
      rewardMint: new PublicKey(r.rewardMint),
      rewardVault: new PublicKey(r.rewardVault),
    })),
  };

  const parsedStakeFarmInfo = await Farm.fetchMultipleInfoAndUpdate({
    chainTime: 0,
    connection,
    pools: [farmInfoWithKeys],
    owner: wallet.publicKey,
    config: { commitment: "confirmed" },
  });
  let totalDeposit = 0;
  let totalPendingReward = 0;
  const userDeposit = [];
  for (const [key, value] of Object.entries(parsedStakeFarmInfo)) {
    userDeposit.push({
      lpToken: stakeInfo.symbol,
      stakeAmount:
        (value.ledger?.deposited.toNumber() ?? 0) /
          10 ** (lpToken?.decimals ?? 6) ?? 0,
      pendingReward:
        // @ts-ignore
        value.wrapped?.pendingRewards[0].toNumber() /
          10 ** (lpToken?.decimals ?? 6) ?? 0,
      lpPrice: lpPrice,
      apy: 0,
      token: lpToken,
    });
    totalDeposit +=
      ((value.ledger?.deposited.toNumber() ?? 0) /
        10 ** (lpToken?.decimals ?? 6)) *
        lpPrice ?? 0;

    totalPendingReward +=
      // @ts-ignore
      (value.ledger?.[""].toNumber() ?? 0) / 10 ** (lpToken?.decimals ?? 6) ??
      0;
  }
  const netWorth = useDashboard.getState().netWorth;
  useDashboard.setState({
    stakes: userDeposit,
    netWorth: {
      ...netWorth,
      totalStake: totalDeposit,
      totalStakesReward: totalPendingReward,
    },
  });
};

const getLends = async (wallet: BaseWalletAdapter) => {
  if (!wallet.publicKey) return;
  //  Initial Solend Markets
  const lStates: stateType[] = [];
  const m = await SolendMarket.initialize(connection, "production");
  await m.loadReserves();
  await m.loadRewards();
  //  get User Data in Solend Wallets
  const walletObligations = await m.fetchObligationByWallet(wallet.publicKey);

  if (!walletObligations) {
    return;
  }

  for (const deposit of walletObligations.deposits) {
    const reserved = m.reserves.find(
      (res) => res?.stats?.mintAddress === deposit.mintAddress
    );

    if (reserved && reserved.stats) {
      const t = reserved.totalBorrowAPY();
      const state = reserved?.stats;
      const token = await findToken(state.symbol);
      lStates.push({ ...state, token });
    }
  }

  useDashboard.setState({
    netWorth: {
      ...useDashboard.getState().netWorth,
      totalLend: walletObligations.obligationStats.userTotalDeposit,
    },
    lend: {
      deposits: walletObligations.deposits,
      borrows: walletObligations.borrows,
      states: lStates,
      userObligationState: walletObligations.obligationStats,
    },
  });
};

const ProgramID = new PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX");

const getTrades = async (wallet: BaseWalletAdapter) => {
  if (!wallet.publicKey || !connection) return;

  const orders = await OpenOrders.findForOwner(
    connection,
    wallet.publicKey,
    ProgramID
  );
  const data: ownerOpenOrders[] = [];
  for (const order of orders) {
    const market = await Market.load(connection, order.market, {}, ProgramID);
    const orders = await market.loadOrdersForOwner(
      connection,
      wallet.publicKey,
      30000
    );

    const baseToken = await findToken(market.decoded.baseMint.toString());
    const quoteToken = await findToken(market.decoded.quoteMint.toString());
    data.push({
      protocol: "OpenBook",
      protocolIcon: "/assets/openBook.svg",
      mint: baseToken,
      market,
      baseToken,
      quoteToken,
      openOrder: order,
      orders: orders,
      isDone:
        order.baseTokenFree.toNumber() === order.baseTokenTotal.toNumber() &&
        order.quoteTokenFree.toNumber() === order.quoteTokenTotal.toNumber(),
      fee:
        order.baseTokenTotal.toNumber() / 10 ** (baseToken?.decimals ?? 0) +
        order.quoteTokenTotal.toNumber() / 10 ** (quoteToken?.decimals ?? 0),
    });
  }

  useDashboard.setState({ trades: data });
};

const getLiquidities = async (wallet: BaseWalletAdapter) => {
  await userDeposit(connection, wallet.publicKey);
  await userCLMMDeposit(connection, wallet.publicKey);
  const { userClmmDeposits, userAmmDeposits } = useLiquidity.getState();
  const clmmDetails = [];
  const ammDetails = [];
  let totalClmmDepositBalance = 0;
  let totalAmmDepositBalance = 0;
  const tokensPrice = useDashboard.getState().tokensPrice;
  if (!tokensPrice) return;
  for (const userClmmDeposit of userClmmDeposits) {
    const poolData = await RaydiumPools.fetchPoolById(
      userClmmDeposit.state.id.toBase58()
    );
    userClmmDeposit.positionAccount?.forEach((position) => {
      const tokenA =
        (position.amountA.toNumber() /
          10 ** (userClmmDeposit.state.mintA.decimals ?? 0)) *
        tokensPrice[userClmmDeposit.state.mintA.mint.toBase58()];
      const tokenB =
        (position.amountB.toNumber() /
          10 ** (userClmmDeposit.state.mintB.decimals ?? 0)) *
        tokensPrice[userClmmDeposit.state.mintB.mint.toBase58()];
      totalClmmDepositBalance += tokenA + tokenB;
    });

    clmmDetails.push({
      ...userClmmDeposit,
      poolDetail: poolData.data[0],
    });
  }
  for (const userAmmDeposit of userAmmDeposits) {
    const poolData = await RaydiumPools.fetchPoolById(userAmmDeposit.ammId);
    totalAmmDepositBalance +=
      (userAmmDeposit.amount / 10 ** (userAmmDeposit.lpMint?.decimals ?? 0)) *
        poolData.data[0].lpPrice ?? 0;

    ammDetails.push({
      ...userAmmDeposit,
      poolDetail: poolData.data[0],
    });
  }

  useDashboard.setState({
    netWorth: {
      ...useDashboard.getState().netWorth,
      totalClmm: totalClmmDepositBalance,
      totalAmm: totalAmmDepositBalance,
    },
    liquidity: { clmm: clmmDetails, amm: ammDetails },
  });
};

const getTokensPrice = async () => {
  await RaydiumPools.fetchTokensPrice();
  const tokensPrice = useLiquidity.getState().tokenPrices;
  useDashboard.setState({ tokensPrice });
};

const getFarm = async (wallet: BaseWalletAdapter) => {
  if (!wallet.publicKey) return;

  let localPendingReward = 0;
  let localUserDepositedFarm: FarmType[] = [];
  let localDeposit = 0;
  let localRewardAmount = 0;

  // TODO move to data
  const farmPools = await axios
    .get<ApiFarmInfo>(ENDPOINT + RAYDIUM_MAINNET.farmInfo)
    .then((res) => res.data);

  const farmInfo = [
    ...farmPools.raydium,
    ...farmPools.fusion,
    ...farmPools.ecosystem,
  ];

  const farmInfoWithKeys = farmInfo.map((farm) => {
    return {
      ...farm,
      id: new PublicKey(farm.id),
      programId: new PublicKey(farm.programId),
      baseMint: new PublicKey(farm.lpMint),
      quoteMint: new PublicKey(farm.lpMint),
      lpMint: new PublicKey(farm.lpMint),
      authority: new PublicKey(farm.authority),
      lpVault: new PublicKey(farm.lpVault),
      rewardInfos: farm.rewardInfos.map((r) => ({
        ...r,
        rewardMint: new PublicKey(r.rewardMint),
        rewardVault: new PublicKey(r.rewardVault),
      })),
    };
  });
  const parsedFarmInfo = await Farm.fetchMultipleInfoAndUpdate({
    chainTime: 0,
    connection,
    pools: farmInfoWithKeys,
    owner: wallet.publicKey,
    config: { commitment: "confirmed" },
  });
  for (const [key, value] of Object.entries(parsedFarmInfo)) {
    if (value.ledger) {
      const lpToken = await findToken(value.apiPoolInfo.lpMint.toString());
      const pair = await fetchPairs().then((res) =>
        res.data.find(
          (pair) => pair.lpMint === value.apiPoolInfo.lpMint.toString()
        )
      );
      const icons = await getPoolIcons(pair);

      // get pending rewards:
      for (const [index, reward] of Object.entries(
        value.apiPoolInfo.rewardInfos
      )) {
        const rewardToken = await findToken(reward.rewardMint.toString());
        if (!rewardToken) return;
        const rewardPrice = (await getPrice(rewardToken?.symbol)) ?? 0;
        const rewardAmount =
          (value.wrapped?.pendingRewards[Number(index)].toNumber() ?? 0) /
          10 ** (lpToken?.decimals ?? 6);
        localRewardAmount = rewardAmount;
      }
      // end of pending rewards

      const rewards = await getRewards(value.apiPoolInfo.rewardInfos);

      localUserDepositedFarm.push({
        lpAmount:
          (value.ledger?.deposited.toNumber() ?? 0) /
          10 ** (lpToken?.decimals ?? 6),
        pendingReward: localPendingReward,
        rewardAmount: localRewardAmount,
        rewards,
        poolIcon: icons,
        poolName: pair?.name ?? "",
        apr: pair?.apr7d ?? 0,
        protocolIcon: "/assets/images/raydiumraycoin-1@2x.png",
        value:
          ((value.ledger?.deposited.toNumber() ?? 0) /
            10 ** (lpToken?.decimals ?? 6)) *
          (pair?.lpPrice ?? 0),
        protocol: "Raydium",
      });

      localDeposit +=
        ((value.ledger?.deposited.toNumber() ?? 0) /
          10 ** (lpToken?.decimals ?? 6)) *
        (pair?.lpPrice ?? 0);
    }
  }
  useDashboard.setState({
    netWorth: {
      ...useDashboard.getState().netWorth,
      totalFarm: localDeposit,
    },
    farms: localUserDepositedFarm,
  });
};

const getPoolIcons = async (pair?: ApiPairsItem) => {
  const promises = pair?.name.split("-").map(async (sym) => {
    const token = await findToken(sym);
    return token?.logoURI ?? "";
  });

  // Ensure all promises are resolved before returning the values
  const icons = await Promise.all(promises || []);
  return icons;
};

const getRewards = async (rewardToken: FarmPoolKeys["rewardInfos"]) => {
  const data = [];
  for (const reward of rewardToken) {
    const token = await findToken(reward.rewardMint.toString());
    data.push({
      currency: token?.symbol ?? "",
      icon: token?.logoURI ?? "",
    });
  }
  return data;
};

const getNft = async (wallet: BaseWalletAdapter) => {
  const metaplex = Metaplex.make(connection);
  if (!wallet.publicKey) return;
  const nfts = await metaplex
    .nfts()
    .findAllByOwner({ owner: wallet.publicKey });
  useDashboard.setState({ nft: nfts });
};
