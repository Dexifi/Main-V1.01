"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  useAddLiquidityModal,
  useManageLiquidityModal,
  useRemoveLiquidityModal,
} from "@/lib/stores/liquidity.store";
import { useCallback, useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Cell, Pie, PieChart } from "recharts";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAtom } from "jotai";
import {
  selectedPoolAtom,
  selectedPositionAtom,
  selectedPositionRowAtom,
} from "@/components/modals/store";
import { Clmm } from "@raydium-io/raydium-sdk";
import formatedNumber from "@/lib/numbers";
import { getPrice } from "@/data/price";
import { toast } from "@/components/ui/use-toast";
import { exploreAtom } from "@/stores/config";
import { RaydiumPools } from "@/applications/Liquidity/pool";
import ClmmChart from "@/components/ui/ClmmChart";
import { raydiumActions } from "@/applications/Liquidity/actions";
import { useWallet } from "@solana/wallet-adapter-react";
import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
type Props = {};

const ManageModal = (props: Props) => {
  const { isOpen, onClose } = useManageLiquidityModal();
  const [open, setOpen] = useState(false);
  const { onAddLiquidityOpen } = useAddLiquidityModal();
  const { onRemoveLiquidityOpen } = useRemoveLiquidityModal();
  const [selectedPool] = useAtom(selectedPoolAtom);
  const [position] = useAtom(selectedPositionAtom);
  const [row] = useAtom(selectedPositionRowAtom);
  const { wallet } = useWallet();
  const [aprPeriod, setAprPeriod] = useState<"day" | "week" | "month">("day");
  const [exploreAddress] = useAtom(exploreAtom);
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);
  const [tokensPrice, setTokensPrice] = useState({
    tokenA: 0,
    tokenB: 0,
  });
  const [tokensPercentage, setTokensPercentage] = useState({
    tokenA: 0,
    tokenB: 0,
  });
  useEffect(() => {
    (async () => {
      if (selectedPool?.id && selectedPool.type === "Concentrated") {
        const chartData = await RaydiumPools.getChartPoints(selectedPool?.id);
        const d = chartData.map((p) => ({ x: p.x, y: p.y })).reverse();
        setChartData(d);
      }
    })();
  }, [selectedPool]);
  useEffect(() => {
    const fetchTokensPrice = async () => {
      if (!selectedPool || !position) return;
      const tokenA = await getPrice(selectedPool?.mintA.address);
      const tokenB = await getPrice(selectedPool?.mintB.address);
      const tokenAAmount =
        ((position?.amountA.toNumber() ?? 0) /
          10 ** (selectedPool?.mintA.decimals ?? 0)) *
        tokenA;

      const tokenBAmount =
        ((position?.amountB.toNumber() ?? 0) /
          10 ** (selectedPool?.mintB.decimals ?? 0)) *
        tokenB;

      setTokensPercentage({
        tokenA: (tokenAAmount * 100) / (tokenAAmount + tokenBAmount),
        tokenB: (tokenBAmount * 100) / (tokenAAmount + tokenBAmount),
      });
      setTokensPrice({
        tokenA: tokenA,
        tokenB: tokenB,
      });
    };
    fetchTokensPrice();
  }, [position?.amountA, position?.amountB, selectedPool]);

  const toggleOpenClose = () => {
    setOpen(!open); // toggle between true and false
  };

  const handleHarvest = useCallback(async () => {
    if (!wallet || !row || !position) return;
    await raydiumActions.harvestClmmPosition({
      fetchPoolInfos: { [row.state.ammConfig.id.toBase58()]: row },
      wallet: wallet.adapter as BaseSignerWalletAdapter,
      position: position,
    });
  }, [position, row, wallet]);

  if (!selectedPool || !row || !position) return <></>;

  const planCApr = Clmm?.estimateAprsForPriceRangeMultiplier({
    aprType: aprPeriod,
    // @ts-ignore TODO
    poolInfo: selectedPool,
    positionTickLowerIndex: position?.tickLower ?? 0,
    positionTickUpperIndex: position?.tickUpper ?? 0,
  });

  const isInRange =
    position.tickLower < row.state.tickCurrent &&
    position.tickUpper > row.state.tickCurrent;

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
                  "bg-white h-8 w-8 flex flex-row justify-center items-center rounded-full"
                }
              >
                <img
                  className={"w-6 h-6 rounded-full"}
                  src={selectedPool?.mintA.logoURI}
                />
              </div>
              <div className={"flex flex-row]"}>
                <div
                  className={
                    "bg-white h-8 w-8 flex flex-row justify-center items-center rounded-full -ml-3"
                  }
                >
                  <img
                    className={"w-6 h-6 rounded-full"}
                    src={selectedPool?.mintB.logoURI}
                  />
                </div>
              </div>
            </div>
            <div className={"flex flex-row"}>
              <p>
                {selectedPool?.mintA.symbol
                  ? selectedPool?.mintA.symbol
                  : selectedPool?.mintA.address.slice(0, 4)}
              </p>
              <p>-</p>
              <p>
                {selectedPool?.mintB.symbol
                  ? selectedPool?.mintB.symbol
                  : selectedPool?.mintB.address.slice(0, 4)}
              </p>
            </div>
            <div className="flex flex-row text-sm items-center bg-red-700 bg-opacity-50 rounded-sm px-2 py-0.5">
              <CheckCircleOutlineIcon style={{ width: 22 }} />
              <p className={"text-[12px] ml-1"}>
                {isInRange ? "In Range" : "Out Of Range"}
              </p>
            </div>
          </div>
          <div className={"flex flex-row items-center justify-between gap-2"}>
            <Button onClick={onAddLiquidityOpen}>Add Liquidity</Button>
            <Button onClick={onRemoveLiquidityOpen}>Remove Liquidity</Button>
            <CloseIcon color={"inherit"} style={{ color: "white" }} />
          </div>
        </div>
        {/*  First Box */}
        <div
          className={
            "bg-[#0b1938] rounded-sm p-3 flex flex-row justify-between"
          }
        >
          {/*COL 1*/}
          <div className={"flex flex-col gap-4"}>
            <p className={"text-[#abc4ff]"}>Liquidity</p>
            <p className={"text-white"}>{`$${formatedNumber(
              (position.amountA.toNumber() /
                10 ** (selectedPool?.mintA.decimals ?? 0)) *
                tokensPrice.tokenA +
                (position.amountB.toNumber() /
                  10 ** (selectedPool?.mintB.decimals ?? 0)) *
                  tokensPrice.tokenB,
              5
            )}`}</p>
          </div>
          {/*COL 2*/}
          <div className={"flex flex-col gap-4"}>
            <p className={"text-[#abc4ff]"}>Leverage</p>
            <p className={"text-white"}>{`${formatedNumber(
              position.leverage,
              2
            )}x`}</p>
          </div>
          {/*COL 3*/}
          <div className={"flex flex-col gap-2 text-[rgba(171,196,255,.5)] "}>
            <p className={"text-[#abc4ff]"}>Deposit Ratio</p>
            <div className={"flex flex-row gap-4"}>
              <div className={"flex flex-col gap-1 font-medium"}>
                <div
                  className={"flex flex-row items-center justify-center gap-2"}
                >
                  <div className={"flex flex-row]"}>
                    <div
                      className={
                        "bg-white h-5 w-5 flex flex-row justify-center items-center rounded-full"
                      }
                    >
                      <img
                        className={"w-4 h-4 rounded-full"}
                        src={selectedPool.mintA.logoURI}
                      />
                    </div>
                  </div>
                  <p>
                    {selectedPool.mintA.symbol
                      ? selectedPool.mintA.symbol
                      : selectedPool.mintA.address.slice(0, 4)}
                  </p>
                </div>
                <div
                  className={"flex flex-row items-center justify-center gap-2"}
                >
                  <div className={"flex flex-row]"}>
                    <div
                      className={
                        "bg-white h-5 w-5 flex flex-row justify-center items-center rounded-full"
                      }
                    >
                      <img
                        className={"w-4 h-4 rounded-full"}
                        src={selectedPool.mintB.logoURI}
                      />
                    </div>
                  </div>
                  <p>RAY</p>
                </div>
              </div>
              <div className={"flex flex-col gap-1"}>
                <div className={"flex flex-row text-white"}>
                  <p>$</p>
                  <p>
                    {formatedNumber(
                      (position.amountA.toNumber() /
                        10 ** (selectedPool?.mintA.decimals ?? 0)) *
                        tokensPrice.tokenA,
                      2
                    )}
                  </p>
                </div>
                <div className={"flex flex-row text-white"}>
                  <p>$</p>
                  <p>
                    {formatedNumber(
                      (position.amountB.toNumber() /
                        10 ** (selectedPool?.mintB.decimals ?? 0)) *
                        tokensPrice.tokenB,
                      2
                    )}
                  </p>
                </div>
              </div>
              <div className={"flex flex-col gap-1"}>
                <div className={"flex flex-row"}>
                  <p>
                    <p>{formatedNumber(tokensPercentage.tokenA)}</p>
                  </p>
                  <p>%</p>
                </div>
                <div>
                  <div className={"flex flex-row"}>
                    <p>{formatedNumber(tokensPercentage.tokenB)}</p>
                    <p>%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"flex flex-col gap-4"}>
            <p className={"text-[#abc4ff]"}>NFT</p>
            <div className="flex flex-row justify-between gap-14">
              <p
                className={
                  "text-[rgba(171,196,255,.5)] text-ellipsis w-40 overflow-hidden"
                }
              >
                {position.nftMint.toBase58()}
              </p>
              <div className={"flex flex-row justify-center gap-1"}>
                <button
                  onClick={() => {
                    toast({
                      description: "Copied to clipboard",
                      variant: "default",
                    });
                    window.navigator.clipboard.writeText(
                      position.nftMint.toBase58()
                    );
                  }}
                  className={"text-[rgba(171,196,255,.5)]"}
                >
                  <ContentCopyIcon fontSize={"inherit"} />
                </button>
                <a
                  href={`${exploreAddress}/token/${position.nftMint.toBase58()}`}
                  target={"_blank"}
                  className={"text-[rgba(171,196,255,.5)]"}
                >
                  <IosShareIcon fontSize={"inherit"} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={"rounded-sm flex flex-row justify-between gap-2"}>
          {/*Left COl */}
          <div
            className={
              "flex flex-col w-full h-full bg-[#0b1938] rounded-sm gap-3 p-3"
            }
          >
            <div className={"flex-1 flex"}>
              <div className={"flex flex-col gap-3 flex-1"}>
                <div className={"flex flex-row items-center"}>
                  <p className={"text-[#abc4ff]"}>My Position</p>
                  <div
                    className={`flex flex-row text-sm items-center bg-red-700 bg-opacity-50 rounded-sm px-1 ml-2 h-5 ${
                      isInRange ? "text-green-300" : "text-red-300"
                    }`}
                  >
                    <CheckCircleOutlineIcon style={{ width: 16 }} />
                    <p className={"text-[8px] ml-0.5"}>
                      {isInRange ? "In Range" : "Out Of Range"}
                    </p>
                  </div>
                </div>
                <div className={"flex text-white text-sm flex-row gap-1"}>
                  <p>{formatedNumber(position.priceLower.toNumber())}</p>
                  <p>-</p>
                  <p>{formatedNumber(position.priceUpper.toNumber())}</p>
                </div>
                <div className="flex text-[#abc4ff] text-sm">
                  <p>{selectedPool.mintA.symbol}</p>
                  <p className="mx-1">per</p>
                  <p>{selectedPool.mintB.symbol}</p>
                </div>
                <div className="text-xs">
                  <div className="flex flex-row gap-1 items-center">
                    <div className={"w-1.5 h-0.5 bg-amber-400 mr-1"} />
                    <p className={"text-[rgba(171,196,255,.5)]"}>
                      Current Price
                    </p>
                    <p className={"text-[#abc4ff]"}>
                      {formatedNumber(row.state.currentPrice.toNumber())}
                    </p>
                    <p className={"text-[#abc4ff]"}>per</p>
                    <p className={"text-[#abc4ff]"}>
                      {selectedPool.mintB.symbol
                        ? selectedPool.mintB.symbol
                        : selectedPool.mintB.address.slice(0, 4)}
                    </p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <div className={"w-1.5 h-0.5 bg-amber-400 mr-1"} />
                    <p className={"text-[rgba(171,196,255,.5)]"}>
                      24H Price Range
                    </p>
                    <p className={"text-[#abc4ff]"}>{`[ ${formatedNumber(
                      selectedPool.day.priceMin
                    )} , ${formatedNumber(selectedPool.day.priceMax)} ]`}</p>
                  </div>
                </div>
                <div className={"w-full flex-1"}>
                  <ClmmChart
                    points={chartData}
                    currentPrice={row.state.currentPrice.toNumber()}
                    lowerPrice={position.priceLower.toNumber()}
                    upperPrice={position.priceUpper.toNumber()}
                  />
                </div>
              </div>
            </div>
            <div className={"flex flex-row gap-1"}>
              <div className="flex flex-row border px-2 rounded-sm justify-center items-center gap-1 border-[rgba(171,196,255,.5)]">
                <div className={"bg-[#9DB3EC] w-2 h-2 rounded-full"} />
                <p className="text-xs text-[#abc4ff]">Pool liquidity</p>
              </div>
              <div className="flex flex-row border px-2 rounded-sm justify-center items-center gap-1 border-[rgba(171,196,255,.5)]">
                <div className={"bg-red-700 w-2 h-2 rounded-full"} />
                <p className="text-xs text-[#abc4ff]">My Range</p>
              </div>
              <div className="flex flex-row border px-2 rounded-sm justify-center items-center gap-1 border-[rgba(171,196,255,.5)]">
                <div className={"bg-amber-400 w-2 h-2 rounded-full"} />
                <p className="text-xs text-[#abc4ff]">Current Price</p>
              </div>
            </div>
          </div>
          {/*Right COl*/}
          <div className={"flex flex-col w-full rounded-sm gap-2 "}>
            <div className={"flex flex-col bg-[#0b1938] p-3 rounded-sm gap-3 "}>
              <p className={"text-[#abc4ff]"}>Pending Yield</p>
              <div
                className={"flex flex-row items-center justify-between gap-4"}
              >
                <div className={"flex flex-row text-white"}>
                  <p>=$</p>
                  <p>
                    {formatedNumber(
                      (position.tokenFeeAmountA.toNumber() /
                        10 ** (selectedPool?.mintA.decimals ?? 0)) *
                        tokensPrice.tokenA +
                        (position.tokenFeeAmountB.toNumber() /
                          10 ** (selectedPool?.mintB.decimals ?? 0)) *
                          tokensPrice.tokenB
                    )}
                  </p>
                </div>
                <Button onClick={handleHarvest} size={"sm"}>
                  Harvest
                </Button>
              </div>
              <div
                className={
                  "flex flex-row border rounded-sm p-2 justify-between border-[#757788]"
                }
              >
                <div className={"flex flex-col w-full gap-3"}>
                  <p className={"text-[#abc4ff]"}>Fees</p>
                  {/*TOKEN A*/}
                  <div className={"flex flex-row text-xs gap-1 items-center"}>
                    <div className={"flex flex-row"}>
                      <div
                        className={
                          "bg-white h-5 w-5 flex flex-row justify-center items-center rounded-full"
                        }
                      >
                        <img
                          alt={"icon"}
                          className={"w-4 h-4 rounded-full"}
                          src={selectedPool?.mintA.logoURI}
                        />
                      </div>
                    </div>
                    <p className={"text-[rgba(171,196,255,.5)] font-medium"}>
                      {selectedPool?.mintA.symbol
                        ? selectedPool?.mintA.symbol
                        : selectedPool?.mintA.address.slice(0, 4)}
                    </p>
                    <p className={"text-white"}>
                      {formatedNumber(
                        position.tokenFeeAmountA.toNumber() /
                          10 ** (selectedPool?.mintA.decimals ?? 0),
                        5
                      )}
                    </p>
                  </div>
                  {/* TOKEN B*/}
                  <div className={"flex flex-row text-xs gap-1 items-center"}>
                    <div className={"flex flex-row"}>
                      <div
                        className={
                          "bg-white h-5 w-5 flex flex-row justify-center items-center rounded-full"
                        }
                      >
                        <img
                          alt={"icon"}
                          className={"w-4 h-4 rounded-full"}
                          src={selectedPool?.mintB.logoURI}
                        />
                      </div>
                    </div>
                    <p className={"text-[rgba(171,196,255,.5)] font-medium"}>
                      {selectedPool?.mintB.symbol
                        ? selectedPool?.mintB.symbol
                        : selectedPool?.mintB.address.slice(0, 4)}
                    </p>
                    <p className={"text-white"}>
                      {formatedNumber(
                        position.tokenFeeAmountB.toNumber() /
                          10 ** (selectedPool?.mintB.decimals ?? 0),
                        5
                      )}
                    </p>
                  </div>
                </div>
                <div className={"flex flex-col w-full gap-2.5"}>
                  <p className={"text-[#abc4ff]"}>Rewards</p>
                  <p className={"text-xs text-[rgba(171,196,255,.5)]"}>
                    {/*TODO ADD Reward Later*/}
                    (No Rewards)
                  </p>
                </div>
              </div>
            </div>

            <div className={"w-full rounded-sm"}>
              <div
                className={"flex flex-col bg-[#0b1938] p-3 rounded-sm gap-3 "}
              >
                <div className={"flex flex-row justify-between items-center"}>
                  <p className={"text-[#abc4ff]"}>Estimated APR</p>

                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                    onClick={(e) => {
                      // @ts-ignore
                      setAprPeriod(e.target.value);
                    }}
                  >
                    <button
                      type="button"
                      value={"day"}
                      className={`px-2 py-1 text-xs text-[#abc4ff] border border-[#0d111b] ${
                        aprPeriod === "day" ? "bg-[#405385]" : "bg-[#0d111b]"
                      } rounded-s-lg `}
                    >
                      24H
                    </button>
                    <button
                      type="button"
                      value={"week"}
                      className={`px-2 py-1 text-xs text-[#abc4ff] border border-[#0d111b] ${
                        aprPeriod === "week" ? "bg-[#405385]" : "bg-[#0d111b]"
                      }`}
                    >
                      7D
                    </button>
                    <button
                      type="button"
                      value={"month"}
                      className={`px-2 py-1 text-xs text-[#abc4ff] border border-[#0d111b] ${
                        aprPeriod === "month" ? "bg-[#405385]" : "bg-[#0d111b]"
                      } rounded-e-lg `}
                    >
                      30D
                    </button>
                  </div>
                </div>
                <div className={"flex flex-row text-white"}>
                  <p>{planCApr?.apr}</p>
                  <p>%</p>
                </div>
                <div className={"rounded-sm border p-2 border-[#757788]"}>
                  <div className={"flex flex-row gap-2 items-center"}>
                    <PieChart width={64} height={64}>
                      <Pie
                        data={data}
                        innerRadius={20}
                        outerRadius={30}
                        fill="#8884d8"
                        paddingAngle={0}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                    <div className={"bg-amber-400 w-2 h-2 rounded-full"} />
                    <div className={"flex flex-row text-sm gap-1"}>
                      <p className={"text-[#abc4ff]"}>Trade Fee</p>
                      <p className={"text-white"}>{}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {open && (
          <div className={"rounded-sm p-3 bg-[#0b1938] text-sm font-medium"}>
            <p className={"text-[#abc4ff]"}>Pool Overview</p>
            <div className={"flex flex-row mt-4 justify-between"}>
              <div className={"w-full"}>
                <p className={"text-[rgba(171,196,255,.5)]"}>Fee Rate</p>
                <div className={"flex flex-row mt-2 text-white"}>
                  <p>{selectedPool.feeRate}</p>
                  <p>%</p>
                </div>
              </div>
              <div className={"w-full"}>
                <p className={"text-[rgba(171,196,255,.5)]"}>Liquidity</p>
                <div className={"flex flex-row mt-2 text-white"}>
                  <p>$</p>
                  <p>{formatedNumber(selectedPool.tvl)}</p>
                </div>
              </div>
              <div className={"w-full"}>
                <p className={"text-[rgba(171,196,255,.5)]"}>24h Volume</p>
                <div className={"flex flex-row mt-2 text-white"}>
                  <p>$</p>
                  <p>{formatedNumber(selectedPool.day.volume)}</p>
                </div>
              </div>
              <div className={"w-full"}>
                <p className={"text-[rgba(171,196,255,.5)]"}>24h Fee</p>
                <div className={"flex flex-row mt-2 text-white"}>
                  <p>$</p>
                  <p>{formatedNumber(selectedPool.day.volumeFee)}</p>
                </div>
              </div>
              <div className={"w-full"}>
                <p className={"text-[rgba(171,196,255,.5)] font-medium"}>
                  Tick Spacing
                </p>
                <div className={"flex flex-row mt-2 text-white"}>
                  <p>{row.state.tickSpacing}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={"w-full h-0.5 bg-[rgba(171,196,255,.5)] opacity-50"} />
        <div className={"flex flex-row justify-center "}>
          <Button
            className={"bg-transparent text-[#abc4ff] font-bold"}
            onClick={toggleOpenClose}
          >
            Pool Overview {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageModal;
