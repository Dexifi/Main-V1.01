import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import formatedString from "@/lib/string";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import formatedNumber from "@/lib/numbers";
import { Order } from "@openbook-dex/openbook/lib/market";
import { TradeState } from "@/applications/Trade/store";

type OrderProps = {
  isEXTRASMALL: boolean;
  data: Order[];
  selectedMarket?: TradeState["marketDetails"];
  onCancelOrder: (order: Order) => void;
};

type DataType = {
  tabs: string[];
  header: string[];
  body: Order[];
};
const Orders = ({
  data,
  selectedMarket,
  onCancelOrder,
  isEXTRASMALL,
}: OrderProps) => {
  const [gdata, setData] = useState<DataType>({
    tabs: ["All", "Buy", "Sell"],
    header: ["Market", "Side", "Size", "Price"],
    body: [],
  });

  useEffect(() => {
    gdata.body.length === 0 &&
      setTimeout(() => {
        setData({
          ...gdata,
          body: data,
        });
      }, 5000);
  }, [gdata, data]);

  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full md:w-1/2 rounded-3xl px-3 sm:px-5 lg:px-10 py-3 sm:py-5"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <Tabs className="w-full" defaultValue="all">
        <TabsList className="w-full h-max">
          <div className="flex gap-3 sm:gap-5 justify-between w-full items-center flex-wrap">
            <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
              Orders
            </h3>
            <div
              className={`flex gap-2 flex-1 ${
                isEXTRASMALL ? "justify-between" : "justify-end"
              } items-center w-max`}
            >
              <div className="w-max flex">
                {gdata.tabs.map((tab, index) => (
                  <TabsTrigger
                    value={formatedString(tab).toLocaleLowerCase()}
                    key={`${formatedString(tab)}_${index}`}
                    className="data-[state=active]:bg-[#D9F8FF10] data-[state=active]:rounded-full text-xs sm:text-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </div>
              <Button>Cancel All</Button>
            </div>
          </div>
        </TabsList>

        <Table className="w-4/5 sm:w-full flex-1 mt-2">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {gdata.header.map((header, index) => (
                <TableHead
                  key={`${formatedString(header.toLocaleLowerCase())}_${index}`}
                  className="text-sm md:text-md truncate max-w-[110px]"
                  align="left"
                >
                  {header}
                </TableHead>
              ))}
              <TableHead
                className="text-sm md:text-md truncate max-w-[110px]"
                align="left"
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            {gdata.body.length <= 0 ? (
              <>
                <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                  {gdata.header.map((header, index) => (
                    <TableCell
                      className="font-medium text-left text-[#7c7c8d] py-2"
                      key={`${header}_skeleton_${index}`}
                    >
                      <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                    </TableCell>
                  ))}
                  <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                    <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                {gdata.body.map((row, index) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d]"
                    key={index}
                  >
                    <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] max-w-1">
                      {selectedMarket?.name}
                    </TableCell>

                    <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                      {row.side}
                    </TableCell>

                    <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                      {formatedNumber(row.size, 2, isEXTRASMALL)}
                    </TableCell>

                    <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                      {formatedNumber(row.price, 2, isEXTRASMALL)}
                    </TableCell>

                    <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                      <Button onClick={() => onCancelOrder(row)}>Cancel</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </Tabs>
    </div>
  );
};

export default Orders;
