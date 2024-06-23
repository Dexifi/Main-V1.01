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
import { useMemo } from "react";
import { Order } from "@openbook-dex/openbook/lib/market";
import { useDashboard } from "@/applications/Dashboard/store";
import { ownerOpenOrders } from "@/applications/Dashboard/types";

type Props = {
  isEXTRASMALL: boolean;
};

const Trading = ({ isEXTRASMALL }: Props) => {
  const { trades: tradingData, jupTrade } = useDashboard();

  // TODO Settled orders design and logic

  const gdata = useMemo(() => {
    const d: Array<Order & ownerOpenOrders> = [];
    tradingData?.map((openOrder) => {
      openOrder.orders.map((order) => {
        d.push({ ...order, ...openOrder });
      });
    });
    return d;
  }, [tradingData]);
  const data = {
    title: "Trading",
    color: "text-[#C95901]",
    table: {
      header: ["Platform", "Market", "Size", "Place", "Live Value"],
      name: "Drift",
      icon: "/assets/images/raydiumraycoin-1@2x.png",
      balance: 111.24,
      currency: "USDC",
    },
  };
  console.log("jupTrade", jupTrade);

  const total = useMemo(() => {
    let n = 0;
    gdata.map((e) => (n = n + e.size * e.price));
    return n;
  }, [gdata]);

  const totalJupiter = useMemo(() => {
    let n = 0;
    jupTrade?.map((e) => (n = n + e.outAmountUi * e.price));
    return n;
  }, [jupTrade]);

  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-4 lg:px-10 py-5 gap-5 flex flex-col"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <div className="text-lg md:text-2xl truncate flex items-center gap-5 text-[#D9F8FF]">
        <div className="flex">
          <h3 className={"mr-2"}>{data.title}</h3>
          <span className={data.color}>*</span>
        </div>
        <span>${formatedNumber(total + totalJupiter)}</span>
      </div>

      <div className="flex justify-between gap-12 relative flex-col md:flex-row bg-[#30425630] p-4 rounded-2xl">
        <div className={"w-full mt-2"}>
          <Table className="w-4/5 sm:w-full flex-1">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {data.table.header.map((header, index) => (
                  <TableHead
                    key={`${formatedString(
                      header.toLocaleLowerCase()
                    )}_${index}`}
                    className="text-base md:text-md truncate max-w-[110px] text-[#D9F8FF]"
                    align="left"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className={"text-base"}>
              {
                <>
                  {jupTrade?.map((row, index) => (
                    <TableRow
                      className="hover:bg-transparent border-[#7c7c8d]"
                      key={`${formatedString(
                        row.tokenA?.symbol + "-" + row.tokenB?.symbol
                      )}_${index + row.price}`}
                    >
                      <TableCell
                        className="font-medium bold text-left text-[#7c7c8d] py-3 align-top"
                        width={180}
                      >
                        <div className="flex-row flex gap-2">
                          <img
                            src="/assets/icons/logos/jupiter_logo.svg"
                            className={"w-6 h-6"}
                          />
                          <p>jupiter</p>
                        </div>
                      </TableCell>
                      <TableCell
                        className="font-medium text-left text-sm md:text-md truncate align-top"
                        align="left"
                        width={200}
                      >
                        <div className="flex justify-between w-full">
                          <div className="flex flex-row-reverse items-center gap-3">
                            <h6 className="font-medium text-left text-[#7c7c8d] uppercase text-base">
                              {row.marketName}
                            </h6>
                            {!isEXTRASMALL ? (
                              <div className="flex justify-between items-center gap-1 ">
                                <Image
                                  src={row.tokenA?.logoURI ?? ""}
                                  alt={`${row.tokenA?.symbol}_logo-icon`}
                                  className="aspect-square object-contain"
                                  width={24}
                                  height={24}
                                />
                                <Image
                                  src={row.tokenB?.logoURI ?? ""}
                                  alt={`${row.tokenB?.symbol}_logo-icon`}
                                  className="aspect-square object-contain"
                                  width={24}
                                  height={24}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        className="font-medium text-left text-base md:text-md truncate text-[#7c7c8d] align-top"
                        align="left"
                      >
                        <div className="flex flex-col gap-3 justify-between w-full">
                          <h6>{formatedNumber(row.outAmountUi, 2)}</h6>
                        </div>
                      </TableCell>
                      <TableCell
                        className="font-medium text-left text-base md:text-md truncate text-[#7c7c8d] align-top"
                        align="left"
                      >
                        <div className="flex flex-row gap-3  w-full">
                          <h6>${formatedNumber(row.price, 2, isEXTRASMALL)}</h6>
                        </div>
                      </TableCell>
                      <TableCell
                        className="font-medium text-left text-base md:text-md truncate text-[#7c7c8d] align-top"
                        align="left"
                      >
                        <div className="flex flex-col gap-3 justify-between w-full">
                          <h6>
                            <span>
                              ${formatedNumber(row.tokenA?.price ?? 0, 2)}
                            </span>
                          </h6>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {gdata.map((row, index) => (
                    <TableRow
                      className="hover:bg-transparent border-[#7c7c8d]"
                      key={`${formatedString(
                        row.baseToken?.symbol + "-" + row.quoteToken?.symbol
                      )}_${index + row.price}`}
                    >
                      <TableCell
                        className="font-medium bold text-left text-[#7c7c8d] py-3 align-top"
                        width={180}
                      >
                        <div className="flex-row flex gap-2">
                          <img
                            src="/assets/icons/logos/openbook.svg"
                            className={"w-6 h-6"}
                          />
                          <p>Openbook</p>
                        </div>
                      </TableCell>
                      <TableCell
                        className="font-medium text-left text-sm md:text-md truncate align-top"
                        align="left"
                        width={200}
                      >
                        <div className="flex justify-between w-full">
                          <div className="flex flex-row-reverse items-center gap-3">
                            <h6 className="font-medium text-left text-[#7c7c8d] uppercase text-base">
                              {row.baseToken?.symbol +
                                "-" +
                                row.quoteToken?.symbol}
                            </h6>
                            {!isEXTRASMALL ? (
                              <div className="flex justify-between items-center gap-1 ">
                                <Image
                                  src={row.baseToken?.logoURI ?? ""}
                                  alt={`${row.baseToken?.symbol}_logo-icon`}
                                  className="aspect-square object-contain"
                                  width={24}
                                  height={24}
                                />
                                <Image
                                  src={row.quoteToken?.logoURI ?? ""}
                                  alt={`${row.quoteToken?.symbol}_logo-icon`}
                                  className="aspect-square object-contain"
                                  width={24}
                                  height={24}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        className="font-medium text-left text-base md:text-md truncate text-[#7c7c8d] align-top"
                        align="left"
                      >
                        <div className="flex flex-col gap-3 justify-between w-full">
                          <h6>{formatedNumber(row.size, 2)}</h6>
                        </div>
                      </TableCell>
                      <TableCell
                        className="font-medium text-left text-base md:text-md truncate text-[#7c7c8d] align-top"
                        align="left"
                      >
                        <div className="flex flex-row gap-3  w-full">
                          <h6>${formatedNumber(row.price, 2, isEXTRASMALL)}</h6>
                        </div>
                      </TableCell>
                      <TableCell
                        className="font-medium text-left text-base md:text-md truncate text-[#7c7c8d] align-top"
                        align="left"
                      >
                        <div className="flex flex-col gap-3 justify-between w-full">
                          <h6>
                            <span>
                              ${formatedNumber(row.price * row.size, 2)}
                            </span>
                          </h6>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Trading;
