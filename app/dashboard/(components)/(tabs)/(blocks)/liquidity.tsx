import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatedNumber from "@/lib/numbers";
import formatedString from "@/lib/string";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import useLiquidity from "@/hooks/useLiquidity";
import { connection } from "@/lib/get-connections";
import {
  ClmmPoolInfo,
  ClmmPoolPersonalPosition,
} from "@raydium-io/raydium-sdk";
import { TokenInfo } from "@solana/spl-token-registry";

type Props = {
  isEXTRASMALL: boolean;
};

type DataProps = {
  apr: string;
  apr_icons: string[];
  tvl: number;
  protocol: string;
  protocol_icon: string;
  index_tp: number;
  value: "Normal";
  range: {
    min: number;
    max: number;
    currency: string;
    per: string;
  };
  pending: number;
  deposit_ratio: number;
  type: number;
  status: "In Range";
  pool: {
    currency: string;
    value: number;
  }[];
  leverage: number;
};

type dataType = {
  position: ClmmPoolPersonalPosition;
  state: ClmmPoolInfo;
  tokenA?: TokenInfo;
  tokenB?: TokenInfo;
  tokenAAmount: number;
  tokenBAmount: number;
  tokenAPrice: number;
  tokenBPrice: number;
  protocol: string;
  protocol_icon: string;
}[];

const Liquidity = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<DataProps[]>([]);
  const { publicKey } = useWallet();
  const [LiquidityValue, setLiquidityValue] = useState(12500);
  const { clmmTotal, ammTotal, userClmmDetails } = useLiquidity(
    connection,
    publicKey
  );

  // TODO: should add real data on tvl and indexTP

  const data: dataType = useMemo(() => {
    let d: dataType = [];

    // flat the data by position
    userClmmDetails.forEach(async (item) => {
      item.value.positionAccount?.forEach((position) => {
        d.push({
          tokenAAmount:
            (position.amountA.toNumber() /
              10 ** item.value.state.mintA.decimals) *
            (item.tokenAPrice ?? 0),
          tokenBAmount:
            (position.amountB.toNumber() /
              10 ** item.value.state.mintB.decimals) *
            (item.tokenBPrice ?? 0),
          position,
          state: item.value.state,
          tokenA: item.tokenA,
          tokenB: item.tokenB,
          tokenAPrice: item.tokenAPrice ?? 0,
          tokenBPrice: item.tokenBPrice ?? 0,
          protocol: "Raydium",
          protocol_icon: "/assets/images/raydiumraycoin-1@2x.png",
        });
      });
    }, []);
    return d;
  }, [userClmmDetails]);
  useEffect(() => {
    gdata.length === 0 &&
      setTimeout(() => {
        setData([
          {
            apr: "SOL-USDC",
            apr_icons: [
              "/assets/images/raydiumraycoin-1@2x.png",
              "/assets/images/raydiumraycoin-1@2x.png",
            ],
            tvl: 12000000,
            protocol: "Raydium",
            protocol_icon: "/assets/images/raydiumraycoin-1@2x.png",
            index_tp: 22.654,
            value: "Normal",
            range: {
              min: 18.9231,
              max: 23.6432,
              currency: "USDC",
              per: "SOL",
            },
            pending: 6.15,
            deposit_ratio: 4812.99,
            type: 222.21,
            status: "In Range",
            pool: [
              {
                currency: "SOL",
                value: 45.56,
              },
              {
                currency: "USDC",
                value: 54.44,
              },
            ],
            leverage: 18.18,
          },
        ]);
      }, 5000);
  }, [gdata.length]);

  const hData = {
    title: "Liquidity",
    color: "text-[#efd301]",
    table: {
      header: [
        "Pool",
        "Protocol",
        "Type",
        "APR",
        "Value",
        "Pending",
        "Deposit Ratio",
        "Leverage",
      ],
    },
  };

  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-5 lg:px-10 py-5"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <div className="text-xl md:text-2xl truncate flex items-center gap-5 text-[#D9F8FF]">
        <div className="flex">
          <h3 className={"mr-2"}>{hData.title}</h3>
          <span className={hData.color}>*</span>
        </div>
        <span>$ {formatedNumber(clmmTotal + ammTotal)}</span>
      </div>
      {/*  */}

      <div className="flex justify-between gap-6 relative flex-col md:flex-row">
        <Table className="w-4/5 sm:w-full flex-1">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {hData.table.header.map((header, index) => (
                <TableHead
                  key={`${formatedString(header.toLocaleLowerCase())}_${index}`}
                  className="text-sm md:text-md truncate max-w-[110px] text-[#D9F8FF] pl-0"
                  align="left"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {gdata.length <= 0 ? (
              <>
                <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                  {hData.table.header.map((header, index) => (
                    <TableCell
                      className="font-medium text-left text-[#7c7c8d] py-2"
                      key={`${header}_skeleton_${index}`}
                    >
                      <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                    </TableCell>
                  ))}
                </TableRow>
              </>
            ) : (
              <>
                {data.map((row, index) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d]"
                    key={index}
                  >
                    <TableCell className="font-medium text-left text-base md:text-md truncate uppercase text-[#7c7c8d] p-2 pl-0 pt-0">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center justify-between w-full max-w-36">
                          {row.tokenA?.symbol + "-" + row.tokenB?.symbol}
                          {!isEXTRASMALL ? (
                            <div className="max-w-9 flex justify-between  items-center">
                              <Image
                                className={"mr-1"}
                                src={row.tokenA?.logoURI ?? ""}
                                alt={`${row.tokenA?.symbol}_logo-icon`}
                                width={24}
                                height={24}
                              />
                              <Image
                                src={row.tokenB?.logoURI ?? ""}
                                alt={`${row.tokenB?.symbol}_logo-icon`}
                                width={24}
                                height={24}
                              />
                            </div>
                          ) : null}
                          <div />
                        </div>
                        <div className="flex gap-5 items-center justify-between w-full text-base">
                          TVL: ${formatedNumber(row.state.tvl, 0, true)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-base md:text-md truncate uppercase text-[#7c7c8d] align-top p-2 pl-0">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-5 items-center justify-between w-full">
                          {row.protocol}
                          {!isEXTRASMALL ? (
                            <Image
                              src={row.protocol_icon}
                              alt={`${row.protocol}_logo-icon`}
                              width={24}
                              height={24}
                            />
                          ) : null}
                          <div />
                        </div>
                        <div className="flex gap-5 items-center justify-between w-full text-base">
                          Index TP: ${formatedNumber(0, 3)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 align-top p-2 pl-0">
                      <div className="flex flex-col gap-1">
                        <div
                          className={
                            "uppercase justify-center align-middle text-base"
                          }
                        >
                          clmm
                        </div>
                        <div className="flex max-w-36 text-base">
                          Range:{" "}
                          {formatedNumber(
                            row.position.priceLower.toNumber(),
                            2,
                            true
                          )}
                          -
                          {formatedNumber(
                            row.position.priceUpper.toNumber(),
                            2,
                            true
                          )}{" "}
                          {row.tokenB?.symbol} per {row.tokenA?.symbol}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] align-top p-2 pl-0 text-base">
                      {formatedNumber(row.state.day.apr)}%
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] align-top p-2 pl-0 text-base">
                      $
                      {formatedNumber(
                        (row.position.amountA.toNumber() /
                          10 ** row.state.mintA.decimals) *
                          (row.tokenAPrice ?? 0) +
                          (row.position.amountB.toNumber() /
                            10 ** row.state.mintB.decimals) *
                            (row.tokenBPrice ?? 0),
                        2
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] p-2 pl-0 align-top text-base">
                      <div className="flex  flex-col gap-0.5">
                        {/*<div>${formatedNumber(row.type, 2, isEXTRASMALL)}</div>*/}
                        <div>
                          {row.position.tokenFeeAmountA.toNumber() /
                            10 ** row.state.mintA.decimals}{" "}
                          {row.tokenA?.symbol}
                        </div>
                        <div>
                          {row.position.tokenFeeAmountB.toNumber() /
                            10 ** row.state.mintB.decimals}{" "}
                          {row.tokenB?.symbol}
                        </div>

                        <div className={`flex max-w-36 text-xs`}>
                          Status:{" "}
                          <span
                            className={
                              row.state.currentPrice.toNumber() >
                                row.position.priceLower.toNumber() &&
                              row.state.currentPrice.toNumber() <
                                row.position.priceUpper.toNumber()
                                ? "text-green-500 ml-1"
                                : "text-red-500  ml-1"
                            }
                          >
                            {row.state.currentPrice.toNumber() >
                              row.position.priceLower.toNumber() &&
                            row.state.currentPrice.toNumber() <
                              row.position.priceUpper.toNumber()
                              ? "In Range"
                              : "Out of Range"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] p-2 pl-0 align-top text-base">
                      <div>
                        <div>
                          {row.tokenA?.symbol}:{" "}
                          {formatedNumber(
                            (row.tokenAAmount * 100) /
                              (row.tokenAAmount + row.tokenBAmount),
                            2
                          )}
                          %
                        </div>
                        <div>
                          {row.tokenB?.symbol}:{" "}
                          {formatedNumber(
                            (row.tokenBAmount * 100) /
                              (row.tokenAAmount + row.tokenBAmount),
                            2
                          )}
                          %
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        {/*{row.pool.map((pool_item, index) => (*/}
                        {/*  <div*/}
                        {/*    className="flex items-center"*/}
                        {/*    key={`${pool_item.currency}_${index}`}*/}
                        {/*  >*/}
                        {/*    {pool_item.currency}{" "}*/}
                        {/*    {formatedNumber(pool_item.value, 2, isEXTRASMALL)}*/}
                        {/*  </div>*/}
                        {/*))}*/}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] p-2 pl-0 align-top text-base">
                      x{formatedNumber(row.position.leverage, 2, isEXTRASMALL)}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Liquidity;
