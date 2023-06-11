import styles from "../../pages/dashboard.module.css";
import { Connection, PublicKey } from "@solana/web3.js";
import { Farm, Liquidity } from "@raydium-io/raydium-sdk";
import {
  JsonPairItemInfo,
  FarmPoolsJsonFile,
  FarmPoolJsonInfo,
  TokenInfo,
} from "./types";
import axios from "axios";
import Decimal from "decimal.js";
import { useWallet } from "@solana/wallet-adapter-react";
import liquidityData from "./Raydiumdb/liquidityData.json";
import NodeCache from "node-cache";
import { connection } from "../../utils/get-connection";

const cache = new NodeCache({ stdTTL: 3000, checkperiod: 120 });

const GetLiquidity = () => {
  const { publicKey } = useWallet();

  async function fetchDataFromCache(url) {
    let data = cache.get(url);
    if (data === undefined) {
      console.log("Fetching data from axios:", url);
      const response = await axios.get(url);
      data = response.data;
      cache.set(url, data);
      console.log("chached");
    } else {
      console.log("Fetching data from cache:", url);
    }
    return data;
  }
  async function demoFarm(SOL_USDC_FARM_ID) {
    const owner = publicKey;
    fs.writeFile
    const liquidityData = await fetchDataFromCache(
      "https://api.raydium.io/v2/sdk/liquidity/mainnet.json"
    );

    const allLiquidity = [
      ...liquidityData.official,
      ...liquidityData.unOfficial,
    ];
    console.log("fetching farms");
    const farmData = await fetchDataFromCache(
      "https://api.raydium.io/v2/sdk/farm-v2/mainnet.json"
    );

    console.log("fetching pairs");
    const pairData = await fetchDataFromCache(
      "https://api.raydium.io/v2/main/pairs"
    );
    const pairApr = Object.fromEntries(
      pairData.map((i) => [
        i.ammId,
        { apr30d: i.apr30d, apr7d: i.apr7d, apr24h: i.apr24h },
      ])
    );

    console.log("fetching liquidity");

    console.log("fetching token data");
    const tokenData = await fetchDataFromCache(
      "https://api.raydium.io/v2/sdk/token/raydium.mainnet.json"
    );

    const allToken: Map<string, TokenInfo> = [
      ...tokenData.official,
      ...tokenData.unOfficial,
    ].reduce((acc, cur) => {
      acc.set(cur.mint, cur);
      return acc;
    }, new Map());

    console.log("fetching token prices");
    const tokenPrices = await fetchDataFromCache(
      "https://api.raydium.io/v2/main/price"
    );

    console.log("fetching chain time");
    const chainTimeData = await fetchDataFromCache(
      "https://api.raydium.io/v2/sdk/token/raydium.mainnet.json"
    );

    const currentBlockChainDate =
      chainTimeData.chainTime * 1000 + chainTimeData.offset * 1000;

    const allFarms: FarmPoolJsonInfo[] = Object.keys(farmData).reduce(
      // @ts-ignore
      (acc, cur) => [...acc.concat(farmData[cur])],
      []
    );

    const farmInfo = allFarms.find((farm) => farm.id === SOL_USDC_FARM_ID)!;
    const pairInfo = pairData.find((p) => p.lpMint === farmInfo.lpMint)!;
    const liquidityInfo = allLiquidity.find(
      (p) => p.lpMint === farmInfo.lpMint
    )!;

    const farmInfoWithKeys = {
      ...farmInfo,
      id: new PublicKey(farmInfo.id),
      programId: new PublicKey(farmInfo.programId),
      baseMint: new PublicKey(farmInfo.baseMint),
      quoteMint: new PublicKey(farmInfo.quoteMint),
      lpMint: new PublicKey(farmInfo.lpMint),
      authority: new PublicKey(farmInfo.authority),
      lpVault: new PublicKey(farmInfo.lpVault),
      rewardInfos: farmInfo.rewardInfos.map((r) => ({
        ...r,
        rewardMint: new PublicKey(r.rewardMint),
        rewardVault: new PublicKey(r.rewardVault),
      })),
    };

    console.log("decode farm data");
    const parsedFarmInfo = (
      await Farm.fetchMultipleInfoAndUpdate({
        connection,
        pools: [farmInfoWithKeys],
        owner,
        config: { commitment: "confirmed" },
      })
    )[SOL_USDC_FARM_ID];

    const tvl = new Decimal(parsedFarmInfo.lpVault.amount.toString())
      .div(10 ** liquidityInfo.lpDecimals)
      .mul(pairInfo.lpPrice || 0);

    const samples = await connection.getRecentPerformanceSamples(4);
    const slotList = samples.map((item) => item.numSlots);
    const blockSlotCountForSecond =
      slotList.reduce((a, b) => a + b, 0) / slotList.length / 60;

    const rewardsApr = parsedFarmInfo.state.rewardInfos.map((r: any, idx) => {
      if (farmInfo.version === 6) {
        const { rewardPerSecond, rewardOpenTime, rewardEndTime, rewardMint } =
          r;
        const isRewardBeforeStart =
          rewardOpenTime.toNumber() * 1000 < currentBlockChainDate;
        const isRewardAfterEnd =
          rewardEndTime.toNumber() * 1000 > currentBlockChainDate;
        if (isRewardBeforeStart || isRewardAfterEnd) return 0;

        if (!rewardMint) return 0;
        const rewardPrice = tokenPrices[rewardMint.toString()] || 0;
        if (!rewardPrice) return 0;
        const rewardToken = allToken.get(rewardMint.toString())!;
        if (!rewardToken) return 0;

        const reward = new Decimal(rewardPerSecond.toString())
          .div(10 ** rewardToken.decimals)
          .mul(60 * 60 * 24 * 365)
          .mul(rewardPrice);

        const tvl = new Decimal(parsedFarmInfo.lpVault.amount.toString())
          .div(10 ** liquidityInfo.lpDecimals)
          .mul(pairInfo.lpPrice || 0);

        const apr = reward.div(tvl);

        return apr.toNumber();
      }

      const rewardMint = farmInfo.rewardInfos[idx].rewardMint;
      const rewardPrice = tokenPrices[rewardMint] || 0;
      const rewardToken = allToken.get(rewardMint)!;
      const reward = new Decimal(r.perSlotReward.toString())
        .div(10 ** rewardToken.decimals)
        .mul(blockSlotCountForSecond * 60 * 60 * 24 * 365)
        .mul(rewardPrice);

      const apr = reward.div(tvl);

      return apr.toNumber();
    });

    const totalApr24h = new Decimal(
      rewardsApr.reduce((acc, cur) => acc + cur, 0)
    )
      .mul(100)
      .add(pairApr[liquidityInfo.id].apr24h);

    const userDeposited = new Decimal(
      parsedFarmInfo.ledger?.deposited.toString() || 0
    ).div(10 ** liquidityInfo.lpDecimals);

    console.log({
      userDeposited: userDeposited.toString(),
      tvl: tvl.toString(),
      totalApr24h: totalApr24h.toString(),
      rewards: rewardsApr
        .filter((apr) => apr > 0)
        .map((apr, idx) => ({
          apr: apr * 100 + "%",
          rewardToken: allToken.get(
            farmInfo.rewardInfos[idx].rewardMint ||
              // @ts-ignore
              parsedFarmInfo.state.rewardInfos[idx].rewardMint.toString()
          )!.symbol,
        })),
    });
  }
  const getInfos = async () => {
    // liquidityData.official.map((item) => {
    //   demoFarm(item);
    // });
    demoFarm("HUDr9BDaAGqi37xbQHzxCyXvfMCKPTPNF8g9c9bPu1Fu");
  };
  getInfos();
};
export default GetLiquidity;
