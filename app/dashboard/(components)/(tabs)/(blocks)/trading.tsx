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
import { useMemo, useState } from "react";
import useTrade, { ownerOpenOrders } from "@/hooks/useTrade";
import { connection } from "@/lib/get-connections";
import { Order } from "@openbook-dex/openbook/lib/market";

type Props = {
  isEXTRASMALL: boolean;
};

const Trading = ({ isEXTRASMALL }: Props) => {
  const { publicKey } = useWallet();
  const { ownerOpenOrders: tradingData } = useTrade(connection, publicKey);

  // TODO Settled orders design and logic

  const gdata = useMemo(() => {
    const d: Array<Order & ownerOpenOrders> = [];
    tradingData.map((openOrder) => {
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
      header: ["Side", "Market", "Size", "Entry / Index"],
      name: "Drift",
      icon: "/assets/images/raydiumraycoin-1@2x.png",
      balance: 111.24,
      currency: "USDC",
    },
  };

  const total = useMemo(() => {
    let n = 0;
    gdata.map((e) => (n = n + e.size * e.price));
    return n;
  }, [gdata]);

  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-5 lg:px-10 py-5 gap-5 flex flex-col"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <div className="text-lg md:text-2xl truncate flex items-center gap-5 text-[#D9F8FF]">
        <div className="flex">
          <h3>{data.title}</h3>
          <span className={data.color}>*</span>
        </div>
        <span>${formatedNumber(total)}</span>
      </div>

      <div className="flex justify-between gap-6 relative flex-col md:flex-row bg-[#30425630] p-5 rounded-2xl">
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="flex items-center gap-5 border-b border-solid border-muted h-12">
            openbook
            {!isEXTRASMALL ? (
              <Image
                src={"/assets/icons/openBook.svg"}
                alt="openBook"
                className="w-6 aspect-square object-contain"
                width={24}
                height={24}
              />
            ) : null}
          </div>
          <div className="flex flex-row md:flex-col gap-2">
            <div className="flex text-sm w-max text-left truncate">
              Balance:
            </div>
            <div className="flex text-sm w-max text-left truncate">
              $ {formatedNumber(total, 2, isEXTRASMALL)}
            </div>
          </div>
        </div>
        <Table className="w-4/5 sm:w-full flex-1">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {data.table.header.map((header, index) => (
                <TableHead
                  key={`${formatedString(header.toLocaleLowerCase())}_${index}`}
                  className="text-sm md:text-md truncate max-w-[110px]"
                  align="left"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tradingData.length <= 0 ? (
              <>
                <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                  {data.table.header.map((header, index) => (
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
                {gdata.map((row, index) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d]"
                    key={`${formatedString(
                      row.baseToken?.symbol + "-" + row.quoteToken?.symbol
                    )}_${index + row.price}`}
                  >
                    <TableCell
                      className="font-medium bold   text-left text-[#7c7c8d] py-3 align-top"
                      width={180}
                    >
                      {row.side.toUpperCase()}
                    </TableCell>
                    <TableCell
                      className="font-medium text-left text-sm md:text-md truncate align-top"
                      align="left"
                      width={200}
                    >
                      <div className="flex justify-between w-full">
                        <div className="flex flex-row-reverse items-center gap-3">
                          <h6 className="font-medium text-left text-[#7c7c8d] uppercase">
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
                      className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] align-top"
                      align="left"
                    >
                      <div className="flex flex-col gap-3 justify-between w-full">
                        <h6>{formatedNumber(row.size, 2)}</h6>
                      </div>
                    </TableCell>
                    <TableCell
                      className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] align-top"
                      align="left"
                    >
                      <div className="flex flex-row gap-3  w-full">
                        <h6>${formatedNumber(row.price, 2, isEXTRASMALL)}</h6>
                      </div>
                    </TableCell>
                    <TableCell
                      className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] align-top"
                      align="left"
                    >
                      <div className="flex flex-col gap-3 justify-between w-full">
                        <h6>
                          value{" "}
                          <span>
                            ${formatedNumber(row.price * row.size, 2)}
                            {/*{row.p_and_l_state === "negative" ? "-" : "+"}*/}
                            {/*{row.p_and_l_procent})*/}
                          </span>
                        </h6>
                        {/*<h6>*/}
                        {/*  Liq Price:*/}
                        {/*  <span className="text-sm ml-3">*/}
                        {/*    /!*%{formatedNumber(row.liq_price, 2)}*!/*/}
                        {/*  </span>*/}
                        {/*</h6>*/}
                      </div>
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

export default Trading;
