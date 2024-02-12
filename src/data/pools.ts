import axios from "axios";
import {
  ApiFarmInfo,
  ENDPOINT,
  RAYDIUM_MAINNET,
} from "@raydium-io/raydium-sdk";

export const fetchFarmPools = () =>
  axios
    .get<ApiFarmInfo>(ENDPOINT + RAYDIUM_MAINNET.farmInfo)
    .then((res) => res.data);
