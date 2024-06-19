import { useCallback, useState } from "react";
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
import formatedNumber from "@/lib/numbers";
import { Order } from "@openbook-dex/openbook/lib/market";
import { TradeState } from "@/applications/Trade/store";
import { getWalletOrders } from "@/applications/Trade/initial";
import { useWallet } from "@solana/wallet-adapter-react";
import { ownerOpenOrders } from "@/applications/Trade/types";
import { Market, OpenOrders } from "@mehranml/openbook";
import { cancelOrder } from "@/applications/Trade/send";
import { connection } from "@/lib/get-connections";
import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";
import { toast } from "@/components/ui/use-toast";

type OrderProps = {
  isEXTRASMALL: boolean;
  data: ownerOpenOrders[];
  selectedMarket?: TradeState["marketDetails"];
};
type OrderType = {
  marketName: string;
  protocol: string;
  isDone: boolean;
  openOrder: OpenOrders;
  order: Order;
  market: Market;
};

type DataType = {
  tabs: string[];
  header: string[];
};
const Orders = ({ data, isEXTRASMALL }: OrderProps) => {
  const { publicKey, wallet } = useWallet();
  const [currentTab, setCurrentTab] = useState("all");
  const [gdata] = useState<DataType>({
    tabs: ["All", "Buy", "Sell"],
    header: ["Market", "Side", "Size", "Price"],
  });
  const ordersData = data
    .filter((e) => e.orders.length > 0)
    .map((e) => {
      const list: OrderType[] = [];
      e.orders.forEach((order) => {
        list.push({
          marketName: e.marketName,
          protocol: e.protocol,
          isDone: e.isDone,
          openOrder: e.openOrder,
          market: e.market,
          order,
        });
      });
      return list;
    })
    .flat();

  const handleOnCancel = useCallback(
    async (order: OrderType) => {
      if (!publicKey) return;

      try {
        const res = await cancelOrder({
          order: order.order,
          market: order.market,
          wallet: wallet?.adapter as BaseSignerWalletAdapter<string>,
          connection,
        });
        toast({
          title: "Success",
          description: res,
        });
      } catch (e: any) {
        console.log(e);
        toast({
          title: "Error",
          description: e.message,
        });
      }
      await getWalletOrders(publicKey);
    },
    [publicKey, wallet?.adapter]
  );
  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full md:w-1/2 rounded-3xl px-3 sm:px-5 lg:px-10 py-3 sm:py-5 flex overflow"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <div className="w-full flex-1" defaultValue="all">
        <div className="w-full  h-max">
          <div className="flex gap-3 sm:gap-5 justify-between w-full items-center flex-wrap">
            <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
              Orders
            </h3>
            <div
              className={`flex gap-2 flex-1 ${
                isEXTRASMALL ? "justify-between" : "justify-end"
              } items-center w-max`}
            >
              <div className="w-max flex  gap-2">
                {gdata.tabs.map((tab, index) => (
                  <button
                    onClick={() => setCurrentTab(tab.toLocaleLowerCase())}
                    key={`${formatedString(tab)}_${index}`}
                    className={`text-xs font-medium sm:text-sm px-4 py-1 rounded-full hover:bg-[#D9F8FF20] text-[#D9F8FF] hover:text-[#D9F8FF] transition-all  ${
                      currentTab === tab.toLocaleLowerCase()
                        ? "bg-[#b9b5b5] text-[#0d111b]"
                        : "bg-[#D9F8FF10]"
                    } `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {/*<Button>Cancel All</Button>*/}
            </div>
          </div>
        </div>
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
          <TableBody className="pb-3">
            {ordersData.length <= 0 ? (
              <TableRow className="hover:bg-transparent border-[#7c7c8d] relative h-1 flex-1 w-1">
                <div className="font-medium text-left text-[#7c7c8d] py-2 absolute left-0 right-0 mx-auto top-0  ">
                  <p className={"text-center py-2"}>No Orders</p>
                </div>
              </TableRow>
            ) : (
              <>
                {ordersData
                  .filter((e) =>
                    currentTab.toLocaleLowerCase() === "all"
                      ? true
                      : e.order.side.toLocaleLowerCase() ===
                        currentTab.toLocaleLowerCase()
                  )
                  .map((row, index) => (
                    <TableRow
                      className="hover:bg-transparent border-[#7c7c8d]"
                      key={index}
                    >
                      <TableCell className="font-medium w-max  text-left text-sm md:text-md truncate text-[#7c7c8d]">
                        {row?.marketName}
                      </TableCell>

                      <TableCell
                        className={`font-bold text-left text-sm md:text-md truncate ${
                          row.order.side === "buy"
                            ? "text-[#88e8ad]"
                            : "text-[#c95901]"
                        } `}
                      >
                        {row.order.side}
                      </TableCell>

                      <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                        {formatedNumber(row.order.size, 5, isEXTRASMALL)}
                      </TableCell>

                      <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                        {formatedNumber(row.order.price, 2, isEXTRASMALL)}
                      </TableCell>

                      <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                        <Button onClick={() => handleOnCancel(row)}>
                          Cancel
                        </Button>
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

export default Orders;
