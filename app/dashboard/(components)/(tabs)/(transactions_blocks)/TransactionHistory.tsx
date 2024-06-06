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
import { useCallback, useEffect, useMemo, useState } from "react";
import { connection } from "@/lib/get-connections";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import { difference } from "lodash";
import { findToken } from "@/lib/get-wallet";
import { TokenInfo } from "@solana/spl-token-registry";

type Props = {
  isEXTRASMALL: boolean;
};

type DataProps = {
  date: string;
  txid: string;
  platform?: string;
  platform_icon?: string;
  type?: string;
  outgoing?: number;
  outgoing_icon?: string;
  outgoing_currency?: string;
  incoming?: number;
  incoming_icon?: string;
  incoming_currency?: string;
};

type TokenProps = {
  tokenData?: TokenInfo;
  isIncoming: boolean;
  changedAmount: number;
};

const TransactionHistory = ({ isEXTRASMALL }: Props) => {
  const [data, setData] = useState<DataProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsMax, setRowsMax] = useState<number>(50);
  const { publicKey } = useWallet();

  const availablePages = useMemo(
    () => Math.ceil(data.length / rowsMax),
    [data.length, rowsMax]
  );
  const getHistory = useCallback(async () => {
    if (!publicKey) return;
    const signatures: any[] = await connection.getSignaturesForAddress(
      publicKey
    );

    const sig: string[] = signatures.map((sig) => sig.signature);
    const localData: DataProps[] = [];
    const transactions: ParsedTransactionWithMeta[] =
      await connection.getParsedTransactions(sig, {
        maxSupportedTransactionVersion: 0,
      });
    for (const transaction of transactions) {
      const date = moment(transaction.blockTime! * 1000).format("YYYY-MM-DD");
      const description = transaction.meta?.logMessages
        ?.find((log) => log.includes("Program log:"))
        ?.split(" ")
        .slice(-1)[0];
      if (
        transaction.meta?.preTokenBalances &&
        transaction.meta?.postTokenBalances &&
        difference(
          transaction.meta?.preTokenBalances,
          transaction.meta?.postTokenBalances
        ).length > 0
      ) {
        const incomeTokens: TokenProps[] = [];
        const outGoingTokens: TokenProps[] = [];
        for (const token in transaction.meta?.preTokenBalances) {
          const preToken = transaction.meta?.preTokenBalances[token];
          const postToken = transaction.meta?.postTokenBalances[token];
          if (preToken && postToken) {
            if (
              transaction.meta?.preTokenBalances[token].uiTokenAmount.amount !==
              transaction.meta?.postTokenBalances[token].uiTokenAmount.amount
            ) {
              const tokenData = await findToken(
                transaction.meta?.preTokenBalances[token].mint
              );
              const isIncoming =
                transaction.meta?.preTokenBalances[token].uiTokenAmount.amount <
                transaction.meta?.postTokenBalances[token].uiTokenAmount.amount;
              const changedAmount = Math.abs(
                (preToken.uiTokenAmount?.uiAmount ?? 0) -
                  (postToken?.uiTokenAmount?.uiAmount ?? 0)
              );
              if (isIncoming) {
                incomeTokens.push({ tokenData, isIncoming, changedAmount });
              } else {
                outGoingTokens.push({
                  tokenData,
                  isIncoming,
                  changedAmount,
                });
              }
            }
          }
        }
        localData.push({
          date,
          txid: transaction.transaction.signatures[0] ?? "",
          platform: "Solana",
          platform_icon: "https://solana.com/favicon.ico",
          type: description ?? "",
          outgoing: outGoingTokens.reduce(
            (acc, token) => acc + token.changedAmount,
            0
          ),
          outgoing_icon: outGoingTokens[0]?.tokenData?.logoURI,
          outgoing_currency: outGoingTokens[0]?.tokenData?.symbol,
          incoming: incomeTokens.reduce(
            (acc, token) => acc + token.changedAmount,
            0
          ),
          incoming_icon: incomeTokens[0]?.tokenData?.logoURI,
          incoming_currency: incomeTokens[0]?.tokenData?.symbol,
        });
      } else {
        localData.push({
          date,
          txid: transaction.transaction.signatures[0] ?? "",
          platform: "Solana",
          platform_icon: "https://solana.com/favicon.ico",
          type: description ?? "",
        });
      }
      setData(localData);
    }
  }, [publicKey]);

  useEffect(() => {
    if (data.length === 0) {
      getHistory();
    }
  }, [data.length, getHistory]);
  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-3 sm:px-5 lg:px-10 py-3 sm:py-5"
      style={{
        boxShadow: "0 0 4px #88d6ff",
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(119, 186, 234, 0.2), transparent ), radial-gradient( 50% 50% at 50% 50%, rgba(251, 0, 196, 0) 3.49%, rgba(119, 186, 234, 0) 7.6%, rgba(253, 0, 197, 0) 10.46%, rgba(119, 186, 234, 0) 14.46%, rgba(255, 0, 199, 0) 18.56%, rgba(3, 0, 3, 0) 19.53%, transparent 79.82%, rgba(246, 0, 192, 0) 81.08%, rgba(119, 186, 234, 0) 84.04%, rgba(247, 0, 193, 0) 86.61%, rgba(119, 186, 234, 0) 91.01%, rgba(249, 0, 194, 0) 95.16%, rgba(119, 186, 234, 0) 98.6% )",
      }}
    >
      <Tabs className="w-full" defaultValue="all">
        <TabsList className="w-full h-max">
          <div className="flex justify-between py-5 w-full">
            <div className="flex flex-col gap-4 sm:gap-5 w-full">
              <div className="flex justify-between flex-wrap gap-3">
                <h3 className="text-lg md:text-2xl text-[#D9F8FF]">
                  {hdata.title}
                </h3>
                <div className="flex gap-2 sm:gap-5 justify-end">
                  <div className="flex justify-between">
                    <div className="text-lg md:text-2xl truncate flex items-center gap-2 text-[#D9F8FF] overflow-auto bg-[#0D111B] rounded-3xl">
                      {hdata.actions.rows.map((rows, index) => (
                        <Button
                          onClick={() => setRowsMax(rows)}
                          key={index}
                          className={`rounded-full ${
                            rows === rowsMax ? "bg-[#D9F8FF10]" : "bg-[#0D111B]"
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
                    {hdata.actions.arrows.map((arrows, index) => (
                      <Button
                        onClick={() => {
                          if (index === 0) {
                            setCurrentPage((e) =>
                              e === 0 ? 0 : availablePages - 1
                            );
                          } else {
                            setCurrentPage((e) =>
                              availablePages === e ? availablePages : e + 1
                            );
                          }
                        }}
                        key={index}
                        className={`rounded-full hover:bg-[#D9F8FF10] transition-all w-10 h-10 aspect-square border shadow-[0px_0px_5px_#d9f8ff]`}
                        size="icon"
                      >
                        {arrows}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-5 justify-center sm:justify-end flex-wrap">
                <div className={"bg-[#0D111B] rounded-3xl text-[#D9F8FF]"}>
                  {hdata.actions.tabs.map((tab, index) => (
                    <TabsTrigger
                      value={formatedString(tab).toLocaleLowerCase()}
                      key={`${formatedString(tab)}_${index}`}
                      className="data-[state=active]:bg-[#D9F8FF10] data-[state=active]:rounded-full text-xs sm:text-sm data-[state=active]:border shadow"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsList>
        {hdata.actions.tabs.map((tab, index) => (
          <TabsContent
            value={formatedString(tab).toLocaleLowerCase()}
            key={`${formatedString(tab)}_${index}`}
          >
            <div className="flex justify-between gap-6 relative flex-col md:flex-row">
              <Table className="w-4/5 sm:w-full flex-1">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    {hdata.table.header.map((header, index) => (
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
                  {data.length <= 0 ? (
                    <>
                      <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                        {hdata.table.header.map((header, index) => (
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
                      {data
                        ?.sort(
                          (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime()
                        )

                        .map((row, index) => (
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
                                <p className={"underline"}>
                                  {removeMiddleString(row.txid)}
                                </p>
                              </div>
                            </TableCell>

                            <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                              <div className="flex justify-between items-center max-w-36">
                                {row.platform}
                                {!isEXTRASMALL ? (
                                  <Image
                                    src={row.platform_icon ?? ""}
                                    alt={`${row.platform}_logo-icon`}
                                    className={"rounded-full"}
                                    width={24}
                                    height={24}
                                  />
                                ) : null}
                              </div>
                            </TableCell>

                            <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                              {row.type}
                            </TableCell>
                            {row?.outgoing ? (
                              <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                                <div className="flex justify-start items-center gap-2">
                                  <div className="flex justify-start gap-2">
                                    <span>
                                      -
                                      {formatedNumber(
                                        row?.outgoing ?? 0,
                                        3,
                                        isEXTRASMALL
                                      )}
                                    </span>
                                    <span>{row.outgoing_currency}</span>
                                  </div>
                                  {!isEXTRASMALL ? (
                                    <Image
                                      src={row.outgoing_icon ?? ""}
                                      alt={`outgoing_logo-icon`}
                                      width={24}
                                      height={24}
                                    />
                                  ) : null}
                                </div>
                              </TableCell>
                            ) : (
                              <TableCell />
                            )}
                            {row.incoming ? (
                              <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                                <div className="flex justify-start items-center gap-2">
                                  <div className="flex justify-start gap-2">
                                    <span>
                                      +
                                      {formatedNumber(
                                        row.incoming ?? 0,
                                        3,
                                        isEXTRASMALL
                                      )}
                                    </span>
                                    <span>{row.incoming_currency}</span>
                                  </div>
                                  {!isEXTRASMALL ? (
                                    <Image
                                      src={row.incoming_icon ?? ""}
                                      alt={`incoming_icon-icon`}
                                      width={24}
                                      height={24}
                                    />
                                  ) : null}
                                </div>
                              </TableCell>
                            ) : (
                              <TableCell />
                            )}
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

const hdata = {
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
    tabs: ["All", "Recive", "Swap", "Deposit", "Withdraw", "Repay", "Send"],
  },
};
