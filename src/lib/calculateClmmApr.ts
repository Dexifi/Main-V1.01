import {
  ApiClmmPoolsItem,
  ENDPOINT,
  MathUtil,
  PoolInfoLayout,
  MAINNET_PROGRAM_ID as PROGRAMIDS,
  RAYDIUM_MAINNET as RAYDIUM_MAINNET_API,
} from "@raydium-io/raydium-sdk";
import { ParsedAccountData, PublicKey } from "@solana/web3.js";
import Decimal from "decimal.js";

import { formatClmmKeys } from "./formatClmmKeys";
import { connection } from "@/lib/get-connections";

export async function calculateClmmApr(poolId: string) {
  const poolAccountInfo = await connection.getAccountInfo(
    new PublicKey(poolId)
  );

  if (poolAccountInfo === null) throw Error("get pool account data error");

  const mintPrice: { [mint: string]: number } = {};
  for (const [mint, price] of Object.entries(
    await (await fetch(ENDPOINT + RAYDIUM_MAINNET_API.price)).json()
  ) as [string, number][])
    mintPrice[mint] = price;
  const clmmPools = await formatClmmKeys(
    connection,
    PROGRAMIDS.CLMM.toString(),
    true
  );

  const poolApiInfo: { [poolId: string]: ApiClmmPoolsItem } = {};
  for (const item of clmmPools) poolApiInfo[item.id] = item;

  const apiPoolInfo = poolApiInfo[poolId];
  if (apiPoolInfo === undefined) throw Error("api pool info check error");

  const poolInfo = PoolInfoLayout.decode(poolAccountInfo.data);

  const chainTime = await connection.getBlockTime(await connection.getSlot());
  if (chainTime === null) throw Error("get chain time error");

  const formatRewardInfo: {
    mint: string;
    price: number;
    sendCountYear: number;
    sendCountYearToU: number;
    tvl: number;
    apr: number;
  }[] = [];
  console.log(
    "poolInfo.rewardInfos",
    poolInfo.rewardInfos,
    PublicKey.default.toString()
  );
  for (const rewardInfo of poolInfo.rewardInfos) {
    if (rewardInfo.tokenMint.equals(PublicKey.default)) continue;

    const rewardVaultAdress = rewardInfo.tokenVault;
    const rewardVaultAccount = await connection.getParsedAccountInfo(
      rewardVaultAdress
    );
    const rewardVaultAccountData = rewardVaultAccount.value
      ?.data as ParsedAccountData;
    console.log(
      "rewardVaultAccountData.program",
      rewardVaultAccountData.program
    );
    if (rewardVaultAccountData.program !== "spl-token") continue;

    const rewardPerSecond =
      rewardInfo.openTime.toNumber() < chainTime &&
      rewardInfo.endTime.toNumber() > chainTime
        ? MathUtil.x64ToDecimal(rewardInfo.emissionsPerSecondX64)
        : new Decimal(0);

    const sendCountYear = new Decimal(
      rewardPerSecond.mul(3600 * 24 * 365).toString()
    ).div(10 ** rewardVaultAccountData.parsed.info.tokenAmount.decimals);
    const sendCountYearToU = sendCountYear.mul(
      mintPrice[rewardVaultAccountData.parsed.info.mint] ?? 0
    );
    console.log("apiPoolInfo.tvl;", apiPoolInfo.tvl);
    console.log("sendCountYearToU;", sendCountYearToU);
    const tvl = apiPoolInfo.tvl;

    formatRewardInfo.push({
      mint: rewardVaultAccountData.parsed.info.mint,
      price: mintPrice[rewardVaultAccountData.parsed.info.mint] ?? 0,
      sendCountYear: sendCountYear.toNumber(),
      sendCountYearToU: sendCountYearToU.toNumber(),
      tvl,
      apr: tvl !== 0 ? sendCountYearToU.div(tvl).toNumber() : 0,
    });
  }

  return formatRewardInfo;
}
