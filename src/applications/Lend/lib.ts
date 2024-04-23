import BigNumber from "bignumber.js";

export function formatCompact(value: BigNumber) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(Number(value.toString()));
}
