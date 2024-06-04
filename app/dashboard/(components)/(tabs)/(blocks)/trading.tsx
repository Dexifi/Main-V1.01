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
  const { publicKey } = useWallet();
  const { trades: tradingData } = useDashboard();

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
      header: ["Platform", "Market", "Side", "Size", "Place", "Live Value", ""],
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
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-4 lg:px-10 py-5 gap-5 flex flex-col"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <div className="text-lg md:text-2xl truncate flex items-center gap-5 text-[#D9F8FF]">
        <div className="flex">
          <h3 className={"mr-2"}>Spot {data.title}</h3>
          <span className={data.color}>*</span>
        </div>
        <span>${formatedNumber(total)}</span>
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
                    className="text-base md:text-md truncate max-w-[110px] text-[#D9F8FF] pl-0"
                    align="left"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className={"text-base"}>
              {/*{(tradingData?.length ?? 0) <= 0 ? (*/}
              {/*  <>*/}
              {/*    <TableRow className="hover:bg-transparent border-[#7c7c8d]">*/}
              {/*      {data.table.header.map((header, index) => (*/}
              {/*        <TableCell*/}
              {/*          className="font-medium text-left text-[#7c7c8d] py-2"*/}
              {/*          key={`${header}_skeleton_${index}`}*/}
              {/*        >*/}
              {/*          <Skeleton className="w-full h-6 bg-[#7c7c8d]" />*/}
              {/*        </TableCell>*/}
              {/*      ))}*/}
              {/*    </TableRow>*/}
              {/*  </>*/}
              {/*) : (*/}
              {/*  <>*/}
              {/*    {gdata.map((row, index) => (*/}
              <TableRow
                className="hover:bg-transparent border-[#7c7c8d]"
                // key={`${formatedString(
                //   row.baseToken?.symbol + "-" + row.quoteToken?.symbol
                // )}_${index + row.price}`}
              >
                <TableCell
                  className="font-medium bold text-left text-[#7c7c8d] align-top px-0"
                  width={180}
                >
                  <div className={"flex flex-row gap-1"}>
                    {!isEXTRASMALL ? (
                      <Image
                        src={"/assets/icons/openBook.svg"}
                        alt="openBook"
                        className="w-6 aspect-square object-contain"
                        width={24}
                        height={24}
                      />
                    ) : null}
                    <p className={"test-base"}>OpeenBook</p>
                  </div>
                </TableCell>
                <TableCell className="px-0" align="left" width={200}>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-row-reverse items-center gap-3">
                      <h6 className="font-medium text-left text-[#7c7c8d] uppercase text-base">
                        {/*{row.baseToken?.symbol + "-" + row.quoteToken?.symbol}*/}
                      </h6>
                      <p className={"text-[#727383] text-base"}>SOL-USDC</p>
                      {!isEXTRASMALL ? (
                        <div className="flex justify-between items-center">
                          <Image
                            src={
                              "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                            }
                            // src={row.baseToken?.logoURI ?? ""}
                            // alt={`${row.baseToken?.symbol}_logo-icon`}
                            className="aspect-square object-contain rounded-full"
                            width={24}
                            height={24}
                          />
                          <Image
                            src={
                              "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                            }
                            // src={row.quoteToken?.logoURI ?? ""}
                            // alt={`${row.quoteToken?.symbol}_logo-icon`}
                            className="aspect-square object-contain rounded-full"
                            width={24}
                            height={24}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-0" align="left">
                  <div className="flex flex-col gap-3 justify-between w-full">
                    <div
                      className={
                        "bg-[#0D111B] w-[50px] flex flex-row items-center justify-center py-0.5 rounded"
                      }
                    >
                      <p className={"text-base text-[#00B127] font-medium"}>
                        Buy
                      </p>
                    </div>
                  </div>
                  {/*<div className="flex flex-col gap-3 justify-between w-full">*/}
                  {/*  <div*/}
                  {/*    className={*/}
                  {/*      "bg-[#0D111B] w-[50px] flex flex-row items-center justify-center py-0.5 rounded"*/}
                  {/*    }*/}
                  {/*  >*/}
                  {/*    <p className={"text-base text-[#00B127] font-medium"}>*/}
                  {/*      Sell*/}
                  {/*    </p>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </TableCell>
                <TableCell
                  className="font-medium text-left text-base md:text-md truncate text-[#7c7c8d] align-top px-0"
                  align="left"
                >
                  <p>200 SOL</p>
                </TableCell>
                <TableCell
                  className="font-medium text-left text-base md:text-md truncate text-[#7c7c8d] align-top px-0"
                  align="left"
                >
                  <div className={"flex flex-row"}>
                    $ <p>220.493</p>
                  </div>
                </TableCell>
                <TableCell
                  className="font-medium text-left text-base md:text-md truncate text-[#7c7c8d] align-top px-0"
                  align="left"
                >
                  <div className={"flex flex-row"}>
                    $ <p>44,130.5</p>
                  </div>
                </TableCell>
                <TableCell
                  className="font-medium text-left text-base md:text-md truncate text-[#7c7c8d] align-top px-0"
                  align="left"
                >
                  <button
                    className={
                      "bg-[#0D111B] shadow-[0px_0px_5px_#d9f8ff] border border-sky-100/opacity-50 rounded-3xl px-5 text-sky-100"
                    }
                  >
                    Cancel
                  </button>
                </TableCell>
              </TableRow>
              {/*))}*/}
              {/*</>*/}
              {/*)}*/}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Trading;
