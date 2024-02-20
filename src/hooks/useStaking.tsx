import { useCallback, useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  ApiFarmInfo,
  ENDPOINT,
  Farm,
  RAYDIUM_MAINNET,
} from "@raydium-io/raydium-sdk";
import { findToken } from "@/lib/get-wallet";
import axios from "axios";
import { getPrice } from "@/data/price";
import { fetchFarmPools } from "@/data/pools";
import { TokenInfo } from "@solana/spl-token-registry";
import BN from "bn.js";

const WALLET_OFFSET = 44;
const DATA_SIZE = 200;

export type UserStake = {
  lpToken: string;
  stakeAmount: number;
  pendingReward: number;
  lpPrice: number;
  apy: number;
  token?: TokenInfo;
};
const useStaking = (connection: Connection, owner: PublicKey | null) => {
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalPendingReward, setTotalPendingReward] = useState(0);
  const [userDeposit, setUserDeposit] = useState<UserStake[]>([]);
  // fetch pools
  const getFarms = useCallback(async () => {
    if (!owner) return;

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
      owner,
      config: { commitment: "confirmed" },
    });
    for (const [key, value] of Object.entries(parsedStakeFarmInfo)) {
      // @ts-ignore

      setUserDeposit((e) => [
        ...e,
        {
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
        },
      ]);
      setTotalDeposit(
        ((value.ledger?.deposited.toNumber() ?? 0) /
          10 ** (lpToken?.decimals ?? 6)) *
          lpPrice ?? 0
      );
      setTotalPendingReward(
        // @ts-ignore
        (value.ledger?.[""].toNumber() ?? 0) / 10 ** (lpToken?.decimals ?? 6) ??
          0
      );
    }
  }, [connection, owner]);

  useEffect(() => {
    let load = true;
    if (load) {
      load = false;
      getFarms();
    }
    return () => {
      setTotalDeposit(0);
      setUserDeposit([]);
      setTotalPendingReward(0);
    };
  }, [getFarms]);

  return { totalDeposit, totalPendingReward, userDeposit };
};

export default useStaking;
