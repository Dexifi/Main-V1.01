import { Connection, PublicKey } from "@solana/web3.js";
import { useCallback, useEffect } from "react";
import {
  Farm,
  RAYDIUM_MAINNET,
  ENDPOINT,
  ApiFarmInfo,
} from "@raydium-io/raydium-sdk";
import axios from "axios";
const useFarm = (connection: Connection, owner: PublicKey | null) => {
  // fetch pools
  const getFarms = useCallback(async () => {
    const farmPools = await axios
      .get<ApiFarmInfo>(ENDPOINT + RAYDIUM_MAINNET.farmInfo)
      .then((res) => res.data);
    console.log(farmPools);
  }, []);

  useEffect(() => {
    let load = true;
    if (load) {
      load = false;
      getFarms();
    }
  }, [getFarms]);

  return {};
};
export default useFarm;
