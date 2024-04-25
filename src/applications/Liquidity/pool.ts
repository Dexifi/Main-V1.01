import { useLiquidity } from "@/applications/Liquidity/store";
import axios from "@/data/axios";
import {
  AmmPoolApiResponse,
  infoApiResponse,
} from "@/applications/Liquidity/type";
import {
  raydiumGetPollAPI,
  raydiumInfoAPI,
} from "@/applications/Liquidity/config";
import { ApiPrice, ENDPOINT, RAYDIUM_MAINNET } from "@raydium-io/raydium-sdk";

const fetchNextPage = async () => {
  const config = useLiquidity.getState().poolApiConfig;
  config.currentPage += 1;
  useLiquidity.setState({
    poolApiConfig: config,
  });
  const {
    data: { data },
  } = await fetchPool(config.currentPage, config.type);
  useLiquidity.setState({
    ammPools: [
      ...(config.currentPage === 1 ? [] : useLiquidity.getState().ammPools),
      ...data.data,
    ],
  });
};
const fetchPrevPage = async () => {
  const config = useLiquidity.getState().poolApiConfig;
  config.currentPage -= 1;
  useLiquidity.setState({
    poolApiConfig: config,
  });
  const data = useLiquidity.getState().ammPools;

  for (let i = 0; i < config.pageSize; i++) data.pop();

  useLiquidity.setState({
    ammPools: data,
  });
};

const fetchPool = (
  page: number,
  type: "all" | "standard" | "concentrated",
  size?: number
) => {
  const config = useLiquidity.getState().poolApiConfig;
  return axios.get<AmmPoolApiResponse>(
    `https://uapi.raydium.io/v3/pools/info/${type}/default/desc/${
      size ?? config.pageSize
    }/${page}`
  );
};
const fetchInfo = async () => {
  const data = await axios.get<infoApiResponse>(raydiumInfoAPI);
  useLiquidity.setState({
    raydiumInfo: data.data,
  });
};

const fetchPoolById = async (id: string, setInPools?: boolean) => {
  if (!id) return console.error("id is required");
  const config = useLiquidity.getState().poolApiConfig;
  const { data } = await axios.get<any>(raydiumGetPollAPI + id);
  config.currentPage = 0;
  if (setInPools) {
    if (data.data[0]) {
      useLiquidity.setState({
        ammPools: data.data,
      });
    } else {
      useLiquidity.setState({
        ammPools: [],
      });
    }
  } else {
    return data;
  }
};

const fetchTokensPrice = async () => {
  const data = await axios
    .get<ApiPrice>(ENDPOINT + RAYDIUM_MAINNET.price)
    .then((res) => res.data);
  useLiquidity.setState({ tokenPrices: data });
};
export const RaydiumPools = {
  fetchNextPage,
  fetchPrevPage,
  fetchPool,
  fetchPoolById,
  fetchInfo,
  fetchTokensPrice,
};
