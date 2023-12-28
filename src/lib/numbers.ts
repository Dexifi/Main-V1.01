"use client";

const formatedNumber = (x: number, fixed: number = 2, isMobile = false) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return x >= item.value;
    });

  let value = item
    ? (x / item.value).toFixed(3).replace(rx, "$1") + item.symbol
    : "0";

  return isMobile
    ? value
    : x
        .toFixed(fixed)
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export default formatedNumber;
