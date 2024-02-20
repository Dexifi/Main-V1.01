import axios from "@/data/axios";

export const getPrice = async (symbol: string) => {
  let price = await axios.get(`https://price.jup.ag/v4/price?ids=${symbol}`, {
    id: symbol,
  });
  return price?.data?.data[symbol]?.price as number;
};
