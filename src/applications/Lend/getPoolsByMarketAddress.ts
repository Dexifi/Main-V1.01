import { LendState, useLend } from "./store";

const getPoolsByMarketAddress = async (
  marketAddress: string
): Promise<LendState["poolList"]> => {
  //  promis to wait to reservers load from chain

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (useLend.getState().poolList) {
        clearInterval(interval);
        resolve(
          useLend
            .getState()
            .poolList.filter((r) => r.poolAddress === marketAddress)
        );
      }
    }, 100);
  });
};

export default getPoolsByMarketAddress;
