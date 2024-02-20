import { Connection, PublicKey } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import {
  ApiFarmInfo,
  ApiPairsItem,
  ENDPOINT,
  Farm,
  FarmPoolKeys,
  RAYDIUM_MAINNET,
} from "@raydium-io/raydium-sdk";
import { findToken } from "@/lib/get-wallet";
import { fetchPairs } from "@/data/pairs";
import { getPrice } from "@/data/price";
import axios from "axios";

type userFarmType = {
  poolName: string;
  poolIcon: string[];
  protocol: string;
  protocolIcon: string;
  lpAmount: number;
  value: number;
  apr: number;
  rewardAmount: number;
  rewards: {
    currency: string;
    icon: string;
  }[];
  pendingReward: number;
};

const useFarm = (connection: Connection, owner: PublicKey | null) => {
  const [deposit, setDeposit] = useState(0);
  const [pendingReward, setPendingReward] = useState(0);
  const [userDepositedFarm, setUserDepositedFarm] = useState<userFarmType[]>(
    []
  );
  // fetch pools
  const getFarms = useCallback(async () => {
    if (!owner) return;

    let localPendingReward = 0;
    let localUserDepositedFarm: userFarmType[] = [];
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
      owner,
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

        localDeposit =
          localDeposit +
          ((value.ledger?.deposited.toNumber() ?? 0) /
            10 ** (lpToken?.decimals ?? 6)) *
            (pair?.lpPrice ?? 0);
      }
    }
    setPendingReward(localPendingReward);
    setDeposit(localDeposit);
    setUserDepositedFarm(localUserDepositedFarm);
  }, [connection, owner]);

  useEffect(() => {
    let load = true;
    if (load) {
      load = false;
      getFarms();
    }
  }, [getFarms]);

  return { pendingReward, deposit, userDepositedFarm };
};
export default useFarm;

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
