import { atom } from "jotai";
import amm_pools from "@/configuration/ammPools.json";
// const raydiumAmmPools = atomWithStorage("raydiumAmmPools", [], (get) => {});
//
// const strAtom = atom(localStorage.getItem("raydiumAmmPools") ?? "foo");
//
// const raydiumAmmPools = atom(
//   (get) => get(strAtom),
//   async (get, set, newStr) => {
//     const d = await axios
//       .get<ApiPoolInfo>("https://api.raydium.io/v2/sdk/liquidity/mainnet.json")
//       .then((res) => res.data.official);
//     set(d);
//     localStorage.setItem("raydiumAmmPools", newStr);
//   }
// );

import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { ApiPoolInfoItem } from "@raydium-io/raydium-sdk/src/baseInfo/interface";

export const raydiumAmmPoolsDefault = atomWithStorage<ApiPoolInfoItem[]>(
  "raydium-amm-pools",
  // @ts-ignore - only version not exist on type so its ok for now
  amm_pools
);
