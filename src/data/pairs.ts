import axios from "@/data/axios";
import { ApiPairs } from "@raydium-io/raydium-sdk";

export const fetchPairs = () =>
  axios.get<ApiPairs>("https://api.raydium.io/v2/main/pairs");
