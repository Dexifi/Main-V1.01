import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import formatedString from "@/lib/string";
import formatedNumber from "@/lib/numbers";

type OrderBookProps = {
  isEXTRASMALL: boolean;
  data: any;
  bids: { price: number; size: number; side: "buy" | "sell" }[];
  asks: any;
};
const OrderBook = ({ data, isEXTRASMALL, bids, asks }: OrderBookProps) => {
  const tabsDATA = ["All", "Buy", "Sell"];
  const [tab, setTab] = useState("all");
  return (
    <div
      className="h-max w-full rounded-xl p-5 gap-4 flex flex-col"
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full">
          <div className="flex gap-5 sm:gap-5 justify-between w-full items-center flex-wrap">
            <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
              Order Book
            </h3>
            <div
              className={`flex gap-2 ${
                isEXTRASMALL ? "flex-1 justify-between" : ""
              }`}
            >
              {tabsDATA.map((tab_item, id) => (
                <TabsTrigger
                  value={tab_item.toLocaleLowerCase()}
                  key={`${tab_item}_${id}`}
                  className="bg-[#d9f8ff10] data-[state='active']:bg-[#d9f8ff10] data-[state='active']:border-[#d9f8ff] rounded-full"
                  style={{
                    border:
                      tab_item.toLocaleLowerCase() === tab
                        ? "1px solid #d9f8ff10"
                        : "transparent",
                    boxShadow:
                      tab_item.toLocaleLowerCase() === tab
                        ? "0 0 5px #d9f8ff"
                        : "none",
                  }}
                  onClick={() => setTab(tab_item.toLocaleLowerCase())}
                >
                  {tab_item}
                </TabsTrigger>
              ))}
            </div>
          </div>
        </TabsList>
        {tabsDATA.map((tab_item, id) => (
          <TabsContent
            value={tab_item.toLocaleLowerCase()}
            key={`${tab_item}_${id}--content`}
          >
            <div className="flex flex-col w-full gap-6 mt-6">
              <div className="px-5 py-3 bg-[#7c7c8d10] rounded-2xl">
                <Table className="w-full flex-1">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead
                        className="text-sm md:text-md truncate max-w-[110px]"
                        align="left"
                      >
                        Size
                      </TableHead>
                      <TableHead
                        className="text-sm md:text-md truncate max-w-[110px]"
                        align="left"
                      >
                        Price
                      </TableHead>
                      <TableHead
                        className="text-sm md:text-md truncate max-w-[110px]"
                        align="left"
                      >
                        Side
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bids.length <= 0 ? (
                      <>
                        <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                          <TableCell className="font-medium text-left text-[#7c7c8d]">
                            <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                          </TableCell>
                          <TableCell className="font-medium text-left text-[#7c7c8d]">
                            <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                          </TableCell>
                          <TableCell className="font-medium text-left text-[#7c7c8d]">
                            <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <>
                        {bids.map((row, index) => (
                          <TableRow
                            className="hover:bg-transparent border-[#7c7c8d]"
                            key={`${formatedString(
                              row.side.toLocaleLowerCase()
                            )}_${index}`}
                          >
                            <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] py-3">
                              {formatedNumber(row.size, 2, isEXTRASMALL)}
                            </TableCell>

                            <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] py-3">
                              {formatedNumber(row.price, 2, isEXTRASMALL)}
                            </TableCell>

                            <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] py-3">
                              {row.side}
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
              {asks.length > 0 ? (
                <div className="border-b border-[#7c7c8d]" />
              ) : null}
              {asks.length > 0 ? (
                <div className="px-5 py-3 bg-[#7c7c8d10] rounded-2xl">
                  <Table className="w-4/5 sm:w-full flex-1">
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead
                          className="text-sm md:text-md truncate max-w-[110px]"
                          align="left"
                        >
                          Size
                        </TableHead>
                        <TableHead
                          className="text-sm md:text-md truncate max-w-[110px]"
                          align="left"
                        >
                          Price
                        </TableHead>
                        <TableHead
                          className="text-sm md:text-md truncate max-w-[110px]"
                          align="left"
                        >
                          Side
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {asks.length <= 0 ? (
                        <>
                          <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                            <TableCell className="font-medium text-left text-[#7c7c8d]">
                              <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                            </TableCell>
                            <TableCell className="font-medium text-left text-[#7c7c8d]">
                              <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                            </TableCell>
                            <TableCell className="font-medium text-left text-[#7c7c8d]">
                              <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <>
                          {asks.map((row: any, index: number) => (
                            <TableRow
                              className="hover:bg-transparent border-[#7c7c8d]"
                              key={`${formatedString(
                                row.side.toLocaleLowerCase()
                              )}_${index}`}
                            >
                              <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] py-3">
                                {formatedNumber(row.size, 2, isEXTRASMALL)}
                              </TableCell>

                              <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] py-3">
                                {formatedNumber(row.price, 2, isEXTRASMALL)}
                              </TableCell>

                              <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] py-3">
                                {row.side}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : null}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default OrderBook;
