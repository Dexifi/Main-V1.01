import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import formatedNumber from "@/lib/numbers";
import formatedString, { removeMiddleString } from "@/lib/string";
import { useWallet } from "@solana/wallet-adapter-react";
import { ChevronFirst, ChevronLast } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  isEXTRASMALL: boolean;
};

type DataProps = {
  date: string;
  txid: string;
  platform: string;
  platform_icon: string;
  type: string;
  outgoing: number;
  outgoing_icon: string;
  outgoing_currency: string;
  incoming: number;
  incoming_icon: string;
  incoming_currency: string;
};

const TransactionHistory = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<DataProps[]>([]);
  const [rowsMax, setRowsMax] = useState<number>(50);

  useEffect(() => {
    gdata.length === 0 &&
      setTimeout(() => {
        setData([
          {
            date: moment().format("MMM DD, h:mm a"),
            txid: "0xcDbb88F82b687FC2246ae5A731Cbba198E050a58",
            platform: "Solana",
            platform_icon: "/assets/images/raydiumraycoin-1@2x.png",
            type: "Unknown",
            outgoing: 3.006,
            outgoing_currency: "USDC",
            outgoing_icon: "/assets/images/raydiumraycoin-1@2x.png",
            incoming: 1.156,
            incoming_currency: "SOL",
            incoming_icon: "/assets/images/raydiumraycoin-1@2x.png",
          },
          {
            date: moment().format("MMM DD, h:mm a"),
            txid: "0xcDbb88F82b687FC2246ae5A731Cbba198E050a58",
            platform: "Solana",
            platform_icon: "/assets/images/raydiumraycoin-1@2x.png",
            type: "Unknown",
            outgoing: 3.006,
            outgoing_currency: "USDC",
            outgoing_icon: "/assets/images/raydiumraycoin-1@2x.png",
            incoming: 1.156,
            incoming_currency: "SOL",
            incoming_icon: "/assets/images/raydiumraycoin-1@2x.png",
          },
          {
            date: moment().format("MMM DD, h:mm a"),
            txid: "0xcDbb88F82b687FC2246ae5A731Cbba198E050a58",
            platform: "Solana",
            platform_icon: "/assets/images/raydiumraycoin-1@2x.png",
            type: "Unknown",
            outgoing: 3.006,
            outgoing_currency: "USDC",
            outgoing_icon: "/assets/images/raydiumraycoin-1@2x.png",
            incoming: 1.156,
            incoming_currency: "SOL",
            incoming_icon: "/assets/images/raydiumraycoin-1@2x.png",
          },
        ]);
      }, 5000);
  }, [gdata.length]);

  const data = {
    title: "Transaction History",
    table: {
      header: ["N", "Date", "TXID", "Platform", "Type", "Outgoing", "Incoming"],
    },
    actions: {
      rows: [50, 100],
      arrows: [
        <ChevronFirst
          className="w-4 h-4 sm:w-6 sm:h-6 aspect-square object-contain"
          key="chevron-first"
        />,
        <ChevronLast
          className="w-4 h-4 sm:w-6 sm:h-6 aspect-square object-contain"
          key="chevron-last"
        />,
      ],
      tabs: ["Recive", "All", "Swap", "Deposit", "Withdraw", "Repay", "Send"],
    },
  };

  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-3 sm:px-5 lg:px-10 py-3 sm:py-5"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <Tabs className="w-full" defaultValue="all">
        <TabsList className="w-full h-max">
          <div className="flex justify-between py-5 w-full">
            <div className="flex flex-col gap-4 sm:gap-5 w-full">
              <div className="flex justify-between flex-wrap gap-3">
                <h3 className="text-lg md:text-2xl text-[#D9F8FF]">
                  {data.title}
                </h3>
                <div className="flex gap-2 sm:gap-5 justify-end">
                  <div className="flex justify-between">
                    <div className="text-lg md:text-2xl truncate flex items-center  gap-2 sm:gap-5 text-[#D9F8FF] overflow-auto">
                      {data.actions.rows.map((rows, index) => (
                        <Button
                          onClick={() => setRowsMax(rows)}
                          size="sm"
                          key={index}
                          className={`rounded-full ${
                            rows === rowsMax ? "bg-[#D9F8FF10]" : ""
                          } text-xs`}
                          style={{
                            boxShadow:
                              rows === rowsMax
                                ? "0px 0px 5px 0px #D9F8FF"
                                : "none",
                            border:
                              rows === rowsMax ? "1px solid #D9F8FF" : "none",
                          }}
                        >
                          {rows} Row
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="text-lg md:text-2xl truncate flex items-center gap-2 sm:gap-5  text-[#D9F8FF] overflow-auto">
                    {data.actions.arrows.map((arrows, index) => (
                      <Button
                        onClick={() => {}}
                        key={index}
                        className={`rounded-full hover:bg-[#D9F8FF10] transition-all w-10 h-10 aspect-square`}
                        size="icon"
                      >
                        {arrows}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-5 justify-center sm:justify-end flex-wrap">
                {data.actions.tabs.map((tab, index) => (
                  <TabsTrigger
                    value={formatedString(tab).toLocaleLowerCase()}
                    key={`${formatedString(tab)}_${index}`}
                    className="data-[state=active]:bg-[#D9F8FF10] data-[state=active]:rounded-full text-xs sm:text-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </div>
            </div>
          </div>
        </TabsList>
        {data.actions.tabs.map((tab, index) => (
          <TabsContent
            value={formatedString(tab).toLocaleLowerCase()}
            key={`${formatedString(tab)}_${index}`}
          >
            <div className="flex justify-between gap-6 relative flex-col md:flex-row">
              <Table className="w-4/5 sm:w-full flex-1">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    {data.table.header.map((header, index) => (
                      <TableHead
                        key={`${formatedString(
                          header.toLocaleLowerCase()
                        )}_${index}`}
                        className="text-sm md:text-md truncate max-w-[110px]"
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
                      {gdata.slice(0, rowsMax).map((row, index) => (
                        <TableRow
                          className="hover:bg-transparent border-[#7c7c8d]"
                          key={`${formatedString(
                            row.txid.toLocaleLowerCase()
                          )}_${index}`}
                        >
                          <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-[#7c7c8d]">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                            {row.date}
                          </TableCell>

                          <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-white">
                            <div
                              className="flex gap-5 items-center justify-between w-full cursor-pointer truncate max-w-36"
                              onClick={() => {
                                navigator.clipboard.writeText(row.txid);
                                toast({
                                  title: "Added to clipboard",
                                });
                              }}
                            >
                              {removeMiddleString(row.txid)}
                            </div>
                          </TableCell>

                          <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                            <div className="flex justify-between items-center max-w-36 gap-5">
                              {row.platform}
                              {!isEXTRASMALL ? (
                                <Image
                                  src={row.platform_icon}
                                  alt={`${row.platform}_logo-icon`}
                                  width={24}
                                  height={24}
                                />
                              ) : null}
                            </div>
                          </TableCell>

                          <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                            {row.type}
                          </TableCell>
                          <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                            <div className="flex justify-start items-center gap-5">
                              <div className="flex justify-start gap-2">
                                <span>
                                  -
                                  {formatedNumber(
                                    row.outgoing,
                                    3,
                                    isEXTRASMALL
                                  )}
                                </span>
                                <span>{row.outgoing_currency}</span>
                              </div>
                              {!isEXTRASMALL ? (
                                <Image
                                  src={row.outgoing_icon}
                                  alt={`outgoing_logo-icon`}
                                  width={24}
                                  height={24}
                                />
                              ) : null}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                            <div className="flex justify-start items-center gap-5">
                              <div className="flex justify-start gap-2">
                                <span>
                                  +
                                  {formatedNumber(
                                    row.incoming,
                                    3,
                                    isEXTRASMALL
                                  )}
                                </span>
                                <span>{row.incoming_currency}</span>
                              </div>
                              {!isEXTRASMALL ? (
                                <Image
                                  src={row.incoming_icon}
                                  alt={`incoming_icon-icon`}
                                  width={24}
                                  height={24}
                                />
                              ) : null}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TransactionHistory;
