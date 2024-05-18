"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useCreatePositionLiquidityModal } from "@/lib/stores/liquidity.store";
import { Pie, PieChart } from "recharts";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import ClmmChart from "@/components/ui/ClmmChart";

import { selectedPoolAtom } from "@/components/modals/store";
import { useWallet } from "@solana/wallet-adapter-react";
import { exploreAtom } from "@/stores/config";
import { RaydiumPools } from "@/applications/Liquidity/pool";
import { getWalletTokenAccount } from "@/hooks/useLiquidity";
import { connection } from "@/lib/get-connections";
import { useLiquidity } from "@/applications/Liquidity/store";
import formatedNumber from "@/lib/numbers";
import {
  Clmm,
  ClmmPoolInfo,
  fetchMultipleMintInfos,
  LiquidityMath,
  SqrtPriceMath,
  TOKEN_PROGRAM_ID,
  TokenAccount,
} from "@raydium-io/raydium-sdk";
import Decimal from "decimal.js";
import { formatClmmKeysById } from "@/applications/Liquidity/formatClmmKeysById";
import BN from "bn.js";
import assert from "assert";
import { userWalletBalance } from "@/applications/Liquidity/user";
import { raydiumActions } from "@/applications/Liquidity/actions";
import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";

type APRType = { feeApr: number; rewardsApr: number[]; apr: number };
type Props = {};

const CreatePositionModal = (props: Props) => {
  const { isOpen, onClose } = useCreatePositionLiquidityModal();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const [selectedPool] = useAtom(selectedPoolAtom);

  const { wallet } = useWallet();
  const tokenPrices = useLiquidity((state) => state.tokenPrices);
  const [aprPeriod, setAprPeriod] = useState<"day" | "week" | "month">("day");
  const [exploreAddress] = useAtom(exploreAtom);
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);
  const walletTokenAccounts = useLiquidity((state) => state.userTokens);
  const [tokensAmount, setTokensAmount] = useState({
    tokenA: 0,
    tokenB: 0,
    liquidity: new BN(0),
  });
  const [range, setRange] = useState({
    max: 0,
    min: 0,
  });

  const [userBalance, setUserBalance] = useState({
    tokenA: 0,
    tokenB: 0,
  });

  useEffect(() => {
    (async () => {
      if (
        selectedPool?.id &&
        selectedPool.type.toLocaleLowerCase() === "concentrated"
      ) {
        const chartData = await RaydiumPools.getChartPoints(selectedPool?.id);
        const d = chartData.map((p) => ({ x: p.x, y: p.y })).reverse();
        setChartData(d);
      }
    })();
  }, [selectedPool]);

  const handleSwitch = () => {};

  const tokenAName = useMemo(
    () =>
      selectedPool?.mintA.symbol
        ? selectedPool?.mintA.symbol
        : selectedPool?.mintA.address.slice(0, 4),
    [selectedPool]
  );
  const tokenBName = useMemo(
    () =>
      selectedPool?.mintB.symbol
        ? selectedPool?.mintB.symbol
        : selectedPool?.mintB.address.slice(0, 4),
    [selectedPool]
  );

  useEffect(() => {
    if (!wallet?.adapter.publicKey || !selectedPool || !walletTokenAccounts)
      return;
    const fetchUserBalance = async () => {
      if (!wallet?.adapter.publicKey || !selectedPool || !walletTokenAccounts)
        return;

      const tokenA =
        walletTokenAccounts.find(
          (account) => account.address === selectedPool.mintA.address
        )?.balance ?? 0;

      const tokenB =
        walletTokenAccounts.find(
          (account) => account.address === selectedPool.mintB.address
        )?.balance ?? 0;

      setUserBalance({
        tokenA: Number(formatedNumber(tokenA, 4)),
        tokenB: Number(formatedNumber(tokenB, 4)),
      });
    };
    fetchUserBalance();
  }, [selectedPool, wallet?.adapter.publicKey, walletTokenAccounts]);

  const handleSetRangeByPercent = (percent: number) => {
    if (selectedPool) {
      setRange({
        min: selectedPool?.price - selectedPool?.price * (percent / 100),
        max: selectedPool?.price + selectedPool?.price * (percent / 100),
      });
    }
  };

  useEffect(() => {
    if (selectedPool && range.max === 0) {
      handleSetRangeByPercent(0.5);
    }
  }, [handleSetRangeByPercent, range.max, selectedPool]);

  const [aprType, setAprType] = useState<"day" | "week" | "month">("day");
  const [estimateAPR, setEstimateAPR] = useState<APRType>();
  const [poolInfo, setPoolInfo] = useState<ClmmPoolInfo>();
  const [tickers, setTickers] = useState({
    lower: 0,
    upper: 0,
  });

  const getPoolInfo = useCallback(async () => {
    if (
      !wallet?.adapter.publicKey ||
      !walletTokenAccounts ||
      !selectedPool ||
      !selectedPool.id
    )
      return;

    const clmmPool = await formatClmmKeysById(selectedPool.id);
    const tokenAccounts = await getWalletTokenAccount(
      connection,
      wallet.adapter.publicKey
    );
    const {
      [clmmPool.id]: { state: PI },
    } = await Clmm.fetchMultiplePoolInfos({
      connection,
      poolKeys: [clmmPool],
      chainTime: new Date().getTime() / 1000,
      ownerInfo: {
        wallet: wallet?.adapter.publicKey,
        tokenAccounts: tokenAccounts,
      },
    });
    setPoolInfo(PI);
    return PI;
  }, [selectedPool, wallet?.adapter.publicKey, walletTokenAccounts]);

  useEffect(() => {
    if (!wallet?.adapter.publicKey || !selectedPool) return;
    getPoolInfo();
  }, [getPoolInfo, selectedPool, wallet?.adapter.publicKey]);
  const calculateTicks = useCallback(() => {
    if (!selectedPool || !poolInfo)
      return {
        lower: 0,
        upper: 0,
      };

    const { tick: tickLower } = Clmm.getPriceAndTick({
      poolInfo,
      baseIn: true,
      price: new Decimal(range.min),
    });
    const { tick: tickUpper } = Clmm.getPriceAndTick({
      poolInfo,
      baseIn: true,
      price: new Decimal(range.max),
    });
    setTickers({
      lower: tickLower,
      upper: tickUpper,
    });
    return {
      lower: tickLower,
      upper: tickUpper,
    };
  }, [poolInfo, range.max, range.min, selectedPool]);

  const handleEstimateAPR = useCallback(async () => {
    if (
      !selectedPool ||
      !wallet?.adapter.publicKey ||
      !walletTokenAccounts ||
      !poolInfo
    )
      return;
    const { lower, upper } = calculateTicks();
    const aprResult = Clmm.estimateAprsForPriceRangeMultiplier({
      aprType: aprPeriod,
      poolInfo,
      positionTickLowerIndex: lower,
      positionTickUpperIndex: upper,
    });

    setEstimateAPR(aprResult);
  }, [
    aprPeriod,
    calculateTicks,
    poolInfo,
    selectedPool,
    wallet?.adapter.publicKey,
    walletTokenAccounts,
  ]);
  useEffect(() => {
    if (
      !selectedPool ||
      !wallet?.adapter.publicKey ||
      !walletTokenAccounts ||
      !poolInfo
    )
      return;
    handleEstimateAPR();
  }, [
    handleEstimateAPR,
    poolInfo,
    selectedPool,
    wallet?.adapter.publicKey,
    walletTokenAccounts,
  ]);
  const calculateAmounts = useCallback(
    async (price: number, isMintA: boolean) => {
      const pi = await getPoolInfo();

      assert(pi, "poolInfo is not defined");

      const { lower, upper } = calculateTicks();

      const newPrice = new BN(
        price *
          10 **
            ((isMintA
              ? selectedPool?.mintA.decimals
              : selectedPool?.mintB.decimals) ?? 0)
      );

      const token2022 = await fetchMultipleMintInfos({
        connection,
        mints: [pi.mintA.mint, pi.mintB.mint],
      });
      const { amountSlippageA, amountSlippageB, liquidity } =
        Clmm.getLiquidityAmountOutFromAmountIn({
          poolInfo: pi,
          slippage: 0,
          inputA: isMintA,
          tickUpper: upper,
          tickLower: lower,
          amount: newPrice,
          add: true,
          amountHasFee: true,
          token2022Infos: token2022,
          epochInfo: await connection.getEpochInfo(),
        });

      setTokensAmount({
        liquidity: liquidity,
        tokenA:
          amountSlippageA.amount.toNumber() /
          10 ** (selectedPool?.mintA.decimals ?? 0),
        tokenB:
          amountSlippageB.amount.toNumber() /
          10 ** (selectedPool?.mintB.decimals ?? 0),
      });
    },
    [
      calculateTicks,
      getPoolInfo,
      selectedPool?.mintA.decimals,
      selectedPool?.mintB.decimals,
    ]
  );

  const updateAmountByPercent = useCallback(
    async (isMintA: boolean, percent: number) => {
      const targetAmount = userBalance[isMintA ? "tokenA" : "tokenB"];
      const newAmount = targetAmount * (percent / 100);
      setTokensAmount((e) => ({
        ...e,
        [isMintA ? "tokenA" : "tokenB"]: newAmount,
      }));
      await calculateAmounts(newAmount, isMintA);
    },
    [calculateAmounts, userBalance]
  );

  const handleCreatePosition = async () => {
    if (!selectedPool || !poolInfo || !wallet?.adapter.publicKey) return;
    const tokenAccounts = await getWalletTokenAccount(
      connection,
      wallet.adapter.publicKey
    );

    const tx = await raydiumActions.createClmmPosition({
      wallet: wallet.adapter as BaseSignerWalletAdapter,
      baseAmount: new BN(
        (tokensAmount.tokenA * 10 ** selectedPool.mintA.decimals).toFixed(0)
      ),

      liquidity: tokensAmount.liquidity,
      rangeLower: range.min,
      rangeUpper: range.max,

      poolInfo: poolInfo,
      walletTokenAccounts: tokenAccounts,
    });
    console.log("Transaction", tx);
  };

  if (!selectedPool) return <></>;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] w-full max-w-[760px]"
        style={{
          boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
          borderColor: "rgba(171,196,255,0.5",
        }}
      >
        {/* Header */}
        <div className={"flex flex-row justify-between items-center"}>
          <div className={"flex flex-row text-white gap-2 items-center"}>
            <div className={"flex flex-row]"}>
              <div
                className={
                  "bg-[#abc4ff] h-8 w-8 flex flex-row justify-center items-center rounded-full"
                }
              >
                <img
                  className={"w-6 h-6 rounded-full"}
                  src={selectedPool.mintA.logoURI}
                />
              </div>
              <div className={"flex flex-row]"}>
                <div
                  className={
                    "bg-[#abc4ff] h-8 w-8 flex flex-row justify-center items-center rounded-full -ml-3"
                  }
                >
                  <img
                    className={"w-6 h-6 rounded-full"}
                    src={selectedPool.mintB.logoURI}
                  />
                </div>
              </div>
            </div>
            <div className={"flex flex-row"}>
              <p>{tokenAName}</p>
              <p className={"px-0.5"}>/</p>
              <p>{tokenBName}</p>
            </div>
            <div className="flex flex-row text-sm items-center bg-[#0b1938] bg-opacity-50 rounded-sm px-2 text-[#abc4ff]">
              <p className={"text-[8px]"}>Pool Fee </p>
              <p className={"pl-1 text-[8px]"}>{selectedPool.feeRate * 100}%</p>
            </div>
          </div>
          {/* Header Switch Button */}
          <div className={"flex flex-row items-center justify-between gap-2"}>
            <div
              className={
                "bg-[#0b1938] h-7 flex flex-row justify-center items-center rounded-sm"
              }
            >
              <div role="group" className={"bg-[#0b1938] flex flex-row py-0.5"}>
                <Button
                  size={"sm"}
                  className={
                    "bg-[#0b1938] h-6 text-xs focus:z-10 focus:ring-2 focus:bg-[#0b1938] mr-1"
                  }
                >
                  {`${tokenAName} Price`}
                </Button>
                <Button
                  size={"sm"}
                  className={
                    "h-6 text-xs focus:z-10 focus:ring-2 focus:bg-[#0b1938]"
                  }
                >
                  {`${tokenBName} Price`}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/*  Columns Section */}
        <div className={"rounded-sm flex flex-row justify-between gap-2"}>
          {/*Left COl */}
          <div
            className={
              "flex flex-col w-full h-full rounded-sm py-3 px-2 gap-3 bg-[#0b1938]"
            }
          >
            {/*Header*/}
            <div
              className={
                "flex flex-row justify-between text-[#abc4ff] text-base"
              }
            >
              <p>Deposit Amount</p>
            </div>
            {/*  First Box */}
            {/*for switch between header button SOL/USDC*/}
            <div className={"flex flex-col gap-3"}>
              {" "}
              {/*for switch between header button SOL/USDC*/}
              <div className={"p-3 border rounded-sm border-[#757788]"}>
                <div
                  className={
                    "flex flex-row justify-between text-xs text-[rgba(171,196,255,.5)]"
                  }
                >
                  <p>
                    {`${selectedPool.mintA.address.slice(
                      0,
                      4
                    )}...${selectedPool.mintA.address.slice(
                      selectedPool.mintA.address.length - 4
                    )}`}
                  </p>
                  <div className={"flex flex-row"}>
                    <p>Balance:</p>
                    <p>{userBalance.tokenA > 0 ? userBalance.tokenA : "-"}</p>
                  </div>
                </div>
                <div className={"flex flex-row gap-1.5 items-center mt-2"}>
                  <div className={"flex flex-row"}>
                    <div
                      className={
                        "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                      }
                    >
                      <img
                        alt={"icon"}
                        className={"w-4 h-4 rounded-full"}
                        src={
                          selectedPool.mintA.logoURI ?? "/images/unknown.png"
                        }
                      />
                    </div>
                  </div>
                  <p className={"text-base text-[#abc4ff]"}>{tokenAName}</p>
                  <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
                  <div
                    className={"flex flex-row justify-between gap-1 text-xs"}
                  >
                    <button
                      onClick={() => updateAmountByPercent(true, 100)}
                      className={"bg-[#0d111b] text-[#abc4ff] px-1 rounded-sm "}
                    >
                      Max
                    </button>
                    <button
                      onClick={() => updateAmountByPercent(true, 50)}
                      className={"bg-[#0d111b] text-[#abc4ff] px-1 rounded-sm "}
                    >
                      Half
                    </button>
                    <input
                      value={tokensAmount.tokenA}
                      onChange={async (event) => {
                        setTokensAmount((e) => ({
                          ...e,
                          tokenA: parseFloat(event.target.value),
                        }));
                        await calculateAmounts(
                          parseFloat(event.target.value),
                          true
                        );
                      }}
                      className={
                        "bg-[#0b1938] text-white text-right outline-0 border-0 w-8/12 h-5"
                      }
                      type={"number"}
                    />
                  </div>
                </div>
                <div
                  className={"flex flex-row justify-end text-xs text-[#abc4ff]"}
                >
                  <p>
                    $
                    {formatedNumber(
                      tokensAmount.tokenA *
                        (tokenPrices[selectedPool.mintA.address ?? ""] ?? 0)
                    )}
                  </p>
                </div>
              </div>
              {/*  Second Box */}
              <div className={"p-3 border rounded-sm border-[#757788]"}>
                <div
                  className={
                    "flex flex-row justify-between text-xs text-[rgba(171,196,255,.5)]"
                  }
                >
                  <p>
                    {`${selectedPool.mintB.address.slice(
                      0,
                      4
                    )}...${selectedPool.mintB.address.slice(
                      selectedPool.mintB.address.length - 4
                    )}`}
                  </p>
                  <div className={"flex flex-row"}>
                    <p>Balance:</p>
                    <p>{userBalance.tokenB > 0 ? userBalance.tokenB : "-"}</p>
                  </div>
                </div>
                <div className={"flex flex-row gap-1.5 items-center mt-2"}>
                  <div className={"flex flex-row"}>
                    <div
                      className={
                        "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                      }
                    >
                      <img
                        alt={"icon"}
                        className={"w-4 h-4 rounded-full"}
                        src={
                          selectedPool.mintB.logoURI ?? "/images/unknown.png"
                        }
                      />
                    </div>
                  </div>
                  <p className={"text-base text-[#abc4ff]"}>{tokenBName}</p>
                  <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
                  <div
                    className={"flex flex-row justify-between gap-1 text-xs"}
                  >
                    <button
                      onClick={() => updateAmountByPercent(false, 100)}
                      className={"bg-[#0d111b] text-[#abc4ff] px-1 rounded-sm "}
                    >
                      Max
                    </button>
                    <button
                      onClick={() => updateAmountByPercent(false, 50)}
                      className={"bg-[#0d111b] text-[#abc4ff] px-1 rounded-sm "}
                    >
                      Half
                    </button>
                    <input
                      value={tokensAmount.tokenB}
                      onChange={async (event) => {
                        setTokensAmount((e) => ({
                          ...e,
                          tokenB: parseFloat(event.target.value),
                        }));
                        await calculateAmounts(
                          parseFloat(event.target.value),
                          false
                        );
                      }}
                      className={
                        "bg-[#0b1938] text-white text-right outline-0 border-0 w-8/12 h-5"
                      }
                      type={"number"}
                    />
                  </div>
                </div>
                <div
                  className={"flex flex-row justify-end text-xs text-[#abc4ff]"}
                >
                  <p>
                    $
                    {formatedNumber(
                      tokensAmount.tokenB *
                        (tokenPrices[selectedPool.mintB.address ?? ""] ?? 0)
                    )}
                  </p>
                </div>
              </div>
              <div
                className={
                  "p-3 border rounded-sm text-[#abc4ff] border-[#757788]"
                }
              >
                <div className={"flex flex-row justify-between"}>
                  <div className={"flex flex-row text-base items-center gap-1"}>
                    <p className={"text-white"}>{tokenAName}</p>
                    <div className={"flex flex-row"}>
                      <div
                        className={
                          "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                        }
                      >
                        <img
                          alt={"icon"}
                          className={"w-4 h-4 rounded-full"}
                          src={
                            selectedPool.mintA.logoURI ?? "/images/unknown.png"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <p>{tokensAmount.tokenA}</p>
                </div>
                <div className={"flex flex-row justify-between "}>
                  <div className={"flex flex-row text-base items-center gap-1"}>
                    <p className={"text-white"}>{tokenBName}</p>
                    <div className={"flex flex-row"}>
                      <div
                        className={
                          "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                        }
                      >
                        <img
                          alt={"icon"}
                          className={"w-4 h-4 rounded-full"}
                          src={
                            selectedPool.mintB.logoURI ?? "/images/unknown.png"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <p>{tokensAmount.tokenB}</p>
                </div>
                <div className={"flex flex-row justify-between mt-3 text-sm"}>
                  <p>Total Deposit</p>
                  <p>
                    $
                    {tokensAmount.tokenA *
                      (tokenPrices[selectedPool.mintA.address ?? ""] ?? 0) +
                      tokensAmount.tokenB *
                        (tokenPrices[selectedPool.mintB.address ?? ""] ?? 0)}
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleCreatePosition}
              className={"bg-[#0d111b] rounded-sm mt-10"}
            >
              Create Position
            </Button>
            {/*<div*/}
            {/*  className={*/}
            {/*    "flex flex-row items-center justify-center text-sm mt-3 text-amber-500"*/}
            {/*  }*/}
            {/*>*/}
            {/*  <p>SOL balance:</p>*/}
            {/*  <p>0</p>*/}
            {/*  <HelpOutlineIcon sx={{ fontSize: 16, ml: 0.5 }} />*/}
            {/*</div>*/}
          </div>
          {/*Right COl*/}
          <div
            className={
              "flex flex-col w-full h-full bg-[#0b1938] rounded-sm gap-3 p-3"
            }
          >
            <div className={"flex flex-row justify-between"}>
              <p className={"text-[#abc4ff]"}>Price Range</p>
              <div className={"flex flex-row gap-1"}>
                <button
                  className={
                    "flex flex-row rounded-full w-7 h-7 justify-center items-center bg-[#0d111b]"
                  }
                >
                  <svg
                    fill="rgba(171,196,255,.5)"
                    width="16px"
                    height="16px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                  >
                    <path d="M180 176h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zm724 0h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zM785.3 504.3L657.7 403.6a7.23 7.23 0 0 0-11.7 5.7V476H378v-62.8c0-6-7-9.4-11.7-5.7L238.7 508.3a7.14 7.14 0 0 0 0 11.3l127.5 100.8c4.7 3.7 11.7.4 11.7-5.7V548h268v62.8c0 6 7 9.4 11.7 5.7l127.5-100.8c3.8-2.9 3.8-8.5.2-11.4z" />
                  </svg>
                </button>
                <button
                  className={
                    "flex flex-row bg-[#0d111b] rounded-full w-7 h-7 justify-center items-center text-[rgba(171,196,255,.5)]"
                  }
                >
                  <ZoomOutIcon sx={{ fontSize: 16 }} />
                </button>
                <button
                  className={
                    "flex flex-row bg-[#0d111b] rounded-full w-7 h-7 justify-center items-center text-[rgba(171,196,255,.5)]"
                  }
                >
                  <ZoomInIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            </div>
            <div>
              <div className={"flex flex-row text-xs items-center"}>
                <div className={"w-1.5 h-0.5 bg-amber-400 mr-1"} />
                <p className={"text-[rgba(171,196,255,.5)]"}>Current Price</p>
                <div className={"flex flex-row gap-0.5 text-[#abc4ff] ml-2"}>
                  <p>{formatedNumber(selectedPool.price)}</p>
                  <p>{tokenBName}</p>
                  <p>per</p>
                  <p>{tokenAName}</p>
                </div>
              </div>
              <div className={"flex flex-row text-xs items-center"}>
                <div className={"w-1.5 h-0.5 bg-amber-400 mr-1"} />
                <p className={"text-[rgba(171,196,255,.5)]"}>24H Price Range</p>
                <div className={"flex flex-row gap-0.5 text-[#abc4ff] ml-2"}>
                  <p>{`[ ${formatedNumber(
                    selectedPool.day.priceMin
                  )} - ${formatedNumber(selectedPool.day.priceMax)} ]`}</p>
                </div>
              </div>
            </div>
            {/*Chart */}
            <ClmmChart
              lowerPrice={range.min}
              upperPrice={range.max}
              currentPrice={selectedPool.price}
              points={chartData}
            />
            <div
              className={
                "flex flex-row justify-between text-xs gap-1 text-[rgba(171,196,255,.5)]"
              }
            >
              <button
                onClick={() => handleSetRangeByPercent(1)}
                className={"border px-3 rounded-sm w-full border-[#757788]"}
              >
                <div className={"flex flex-row gap-0.5 justify-center py-0.5"}>
                  <p>±</p>
                  <p>1%</p>
                </div>
              </button>
              <button
                onClick={() => handleSetRangeByPercent(5)}
                className={"border px-3 rounded-sm w-full border-[#757788]"}
              >
                <div className={"flex flex-row gap-0.5 justify-center py-0.5"}>
                  <p>±</p>
                  <p>5%</p>
                </div>
              </button>
              <button
                onClick={() => handleSetRangeByPercent(10)}
                className={"border px-3 rounded-sm w-full border-[#757788]"}
              >
                <div className={"flex flex-row gap-0.5 justify-center py-0.5"}>
                  <p>±</p>
                  <p>10%</p>
                </div>
              </button>
              <button
                onClick={() => handleSetRangeByPercent(20)}
                className={"border px-3 rounded-sm w-full border-[#757788]"}
              >
                <div className={"flex flex-row gap-0.5 justify-center"}>
                  <p>±</p>
                  <p>20%</p>
                </div>
              </button>
              <button
                onClick={() => handleSetRangeByPercent(50)}
                className={
                  "border px-3 rounded-sm w-full py-0.5 border-[#757788]"
                }
              >
                <div className={"flex flex-row gap-0.5 justify-center"}>
                  <p>±</p>
                  <p>50%</p>
                </div>
              </button>
            </div>
            {/*  Columns Section */}
            <div className={"flex flex-row justify-between gap-2"}>
              <div
                className={
                  "w-full border rounded-sm p-1 pb-3 text-[rgba(171,196,255,.5)] border-[#757788]"
                }
              >
                <p className={"text-xs"}>Min Price</p>
                <div className={"flex flex-row justify-between mt-1"}>
                  <button
                    onClick={() => setRange((e) => ({ ...e, min: e.min - 1 }))}
                    className={"text-[rgba(171,196,255,.5)]"}
                  >
                    <RemoveIcon sx={{ fontSize: 12 }} />
                  </button>
                  <input
                    value={range.min}
                    onChange={(e) =>
                      setRange({ ...range, min: parseFloat(e.target.value) })
                    }
                    className={
                      "w-full mx-1 px-0 text-white border-0 outline-0 bg-[#0b1938]"
                    }
                  />
                  <button
                    onClick={() => setRange((e) => ({ ...e, min: e.min + 1 }))}
                    className={"text-[rgba(171,196,255,.5)]"}
                  >
                    <AddIcon sx={{ fontSize: 12 }} />
                  </button>
                </div>
              </div>
              <div
                className={"w-full border rounded-sm p-1 pb-3 border-[#757788]"}
              >
                <p className={"text-xs text-[rgba(171,196,255,.5)]"}>
                  Max Price
                </p>
                <div className={"flex flex-row justify-between mt-1"}>
                  <button
                    onClick={() => setRange((e) => ({ ...e, max: e.max - 1 }))}
                    className={"text-[rgba(171,196,255,.5)]"}
                  >
                    <RemoveIcon sx={{ fontSize: 12 }} />
                  </button>
                  <input
                    value={range.max}
                    onChange={(e) =>
                      setRange({ ...range, max: parseFloat(e.target.value) })
                    }
                    className={
                      "w-full mx-1 px-0 text-white border-0 outline-0 bg-[#0b1938]"
                    }
                  />
                  <button
                    onClick={() => setRange((e) => ({ ...e, max: e.max + 1 }))}
                    className={"text-[rgba(171,196,255,.5)]"}
                  >
                    <AddIcon sx={{ fontSize: 12 }} />
                  </button>
                </div>
              </div>
            </div>
            <div className={"flex flex-col gap-2"}>
              <div className={"flex flex-row justify-between items-center"}>
                <div
                  className={
                    "flex flex-row text-sm gap-1 items-center text-[#abc4ff]"
                  }
                >
                  <p>Estimated APR</p>
                  <div
                    onClick={handleSwitch}
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                    className={
                      "flex flex-row items-center border rounded-sm h-4 w-4 justify-center text-[#abc4ff] cursor-pointer"
                    }
                  >
                    {/*{switchMethod ? (*/}
                    <p className={"text-[8px] text-[#abc4ff]"}>D</p>
                    {/*// ) : (*/}
                    {/*//   <p className={"text-[8px] text-[#abc4ff]"}>D</p>*/}
                    {/*// )}*/}
                  </div>
                  <p>{estimateAPR?.apr ?? 0}%</p>
                </div>
                {/* Tooltip */}
                {tooltipVisible && (
                  <div
                    className="absolute bg-[#0d111b] border p-3 z-10 mb-36 rounded-sm text-xs w-72 text-[#abc4ff] border-[#757788]"
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                  >
                    <div className={"flex flex-row justify-between"}>
                      <div className={"flex flex-row gap-1"}>
                        {/*{!switchMethod ?*/}
                        <p>Data</p>
                        {/* : <p>Multiplier</p>}*/}
                        <p>Method</p>
                      </div>
                      {/*<div*/}
                      {/*  className={"flex flex-row gap-1 cursor-pointer"}*/}
                      {/*  onClick={handleSwitch}*/}
                      {/*>*/}
                      {/*  <SyncIcon sx={{ fontSize: 16 }} />*/}
                      {/*  <p>Switch</p>*/}
                      {/*</div>*/}
                    </div>
                    <div className={"mt-2"}>
                      <p>
                        Estimated APR is calculated by the Delta Method. Click
                        the ‘D’ icon to switch to the Multiplier Method
                      </p>
                      <p className={"mt-2 text-[rgba(171,196,255,.5)]"}>
                        <a>Learn More</a>
                      </p>
                    </div>
                  </div>
                )}

                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    onClick={() => setAprPeriod("day")}
                    type="button"
                    className="px-2 py-1 text-xs text-[#abc4ff] border border-[#0d111b] bg-[#0d111b] rounded-s-lg focus:z-10 focus:ring-2"
                  >
                    24H
                  </button>
                  <button
                    onClick={() => setAprPeriod("week")}
                    type="button"
                    className="px-2 py-1 text-xs text-[#abc4ff] border border-[#0d111b] bg-[#0d111b] border-t border-b focus:z-10 focus:ring-2"
                  >
                    7D
                  </button>
                  <button
                    onClick={() => setAprPeriod("month")}
                    type="button"
                    className="px-2 py-1 text-xs text-[#abc4ff] border border-[#0d111b] bg-[#0d111b] rounded-e-lg focus:z-10 focus:ring-2"
                  >
                    30D
                  </button>
                </div>
              </div>
              <div className={"rounded-sm border p-2 border-[#757788]"}>
                <div className={"flex flex-row gap-2 items-center"}>
                  <PieChart width={60} height={60}>
                    <Pie
                      data={[
                        {
                          name: "Trade Fee",
                          value: selectedPool.config?.tradeFeeRate,
                        },
                      ]}
                      innerRadius={20}
                      outerRadius={30}
                      fill="#8884d8"
                      paddingAngle={0}
                      dataKey="value"
                    ></Pie>
                  </PieChart>
                  <div
                    className={
                      "flex flex-row justify-between items-center gap-1 text-[#abc4ff] text-xs"
                    }
                  >
                    <div className={"bg-amber-400 w-2 h-2 rounded-full"} />
                    <p className={"text-xs"}>Trade Fee</p>
                    <p className={"text-xs"}>
                      {selectedPool.config?.tradeFeeRate}
                    </p>
                    {/*<div className={"bg-amber-400 w-2 h-2 rounded-full"} />*/}
                    {/*<p className={"text-xs"}>RAY</p>*/}
                    {/*<p className={"text-xs"}>0%</p>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePositionModal;
