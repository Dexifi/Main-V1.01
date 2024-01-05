import { connection } from "@/lib/get-connections";
import { findToken, getTokenBalanceFromWallet } from "@/lib/get-wallet";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Market, MARKETS } from "@openbook-dex/openbook";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useTradeModal } from "@/lib/stores/trade.store";
import Image from "next/image";
import formatedNumber from "@/lib/numbers";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import formatedString, { removeMiddleString } from "@/lib/string";
import { Input } from "@/components/ui/input";
import { TradeMarketModal } from "@/components/modals";

type Props = {
  isEXTRASMALL: boolean;
};
type HeaderProps = {
  isEXTRASMALL: boolean;
  data: any;
};

type OrderBookProps = {
  isEXTRASMALL: boolean;
  data: any;
  bids: { price: number; size: number; side: "buy" | "sell" }[];
  asks: any;
};

type SidebarProps = {
  isEXTRASMALL: boolean;
  data: any;
  form: {
    amount: number;
    limit_price: number;
    tab: string;
  };
  setForm: (form: { amount: number; limit_price: number; tab: string }) => void;
  tokenBalance: number;
};

const Header = ({ data, isEXTRASMALL }: HeaderProps) => {
  const { onMarketOpen, onImportMarketOpen } = useTradeModal();
  const { totalV, last_order } = {
    totalV: 100000000,
    last_order: {
      value: 1000,
      status: "positive",
    },
  };
  return (
    <div
      className={`grid ${
        isEXTRASMALL ? "grid-cols-1" : "grid-cols-2"
      } sm:grid-cols-2 md:grid-cols-4 px-4 py-5 rounded-xl gap-4 w-full`}
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
          Market
        </h3>
        {/* Actions */}
        <div className="flex gap-4 items-center w-full flex-wrap">
          <Button className="flex gap-4 cursor-pointer" onClick={onMarketOpen}>
            <span>{data.name}</span>
            <ChevronDown className="w-6 h-6 aspect-square object-contain" />
          </Button>
          <Button
            size="icon"
            className="flex gap-4 cursor-pointer min-w-[40px]"
            onClick={onImportMarketOpen}
          >
            <Plus className="w-6 h-6 aspect-square object-contain" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h6 className="text-[#d9f8ff] text-sm md:text-lg">{data.name}</h6>
        {/* ICONS */}
        <div className="flex gap-4 items-center">
          {data.tokenA ? (
            <Image
              src={data.tokenA.logoURI}
              alt={`${data.tokenA.symbol}-logo / main`}
              width={36}
              height={36}
              className="w-9 h-9 aspect-square object-contain"
            />
          ) : (
            <Skeleton className="w-9 h-9 aspect-square bg-[#d9f8ff44]" />
          )}

          {data.tokenB ? (
            <Image
              src={data.tokenB.logoURI}
              alt={`${data.tokenB.symbol}-logo / main`}
              width={36}
              height={36}
              className="w-9 h-9 aspect-square object-contain"
            />
          ) : (
            <Skeleton className="w-9 h-9 aspect-square bg-[#d9f8ff44]" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h6 className="text-[#d9f8ff] text-sm md:text-lg">Total Value</h6>
        {/*  */}
        <span className="text-[#757788] text-sm md:text-lg">
          ${formatedNumber(totalV, 2, isEXTRASMALL)}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <h6 className="text-[#d9f8ff] text-sm md:text-lg">Last Order</h6>
        {/*  */}
        <div className="flex gap-4">
          <span
            className={`text-sm md:text-lg ${
              last_order.status === "positive"
                ? "text-[#88e8ad]"
                : "text-[#c95901]"
            }`}
          >
            ${formatedNumber(last_order.value, 2, isEXTRASMALL)}
          </span>
          <ChevronUp
            className={`w-6 h-6 aspect-square object-contain ${
              last_order.status === "positive"
                ? "text-[#88e8ad]"
                : "text-[#c95901]"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

const ChartDATA = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Chart = ({ data, isEXTRASMALL }: HeaderProps) => {
  const actions = [1, 6, 12, 24];
  return (
    <div
      className="w-full rounded-xl p-5 gap-4 md:flex flex-col"
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">Chart</h3>

        {/* ACTIONS */}
        <div className="flex gap-2 md:gap-4 flex-1 justify-end">
          {actions.map((item, index) => (
            <Button
              className="min-w-[40px]"
              size="icon"
              key={`${item}-button ${index}`}
            >
              {item}H
            </Button>
          ))}
        </div>
      </div>
      <div className="h-full max-h-96 md:max-h-[720px] min-h-0 md:min-h-[720px] mt-5 md:mt-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={isEXTRASMALL ? 320 : 500}
            height={isEXTRASMALL ? 300 : 420}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: isEXTRASMALL ? 10 : 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Orders = ({ data, isEXTRASMALL }: HeaderProps) => {
  const [gdata, setData] = useState({
    tabs: ["All", "Buy", "Sell"],
    header: ["Market", "Side", "Size", "Price"],
    body: [],
  });

  useEffect(() => {
    gdata.body.length === 0 &&
      setTimeout(() => {
        setData({
          ...gdata,
          body:
            data.length > 0
              ? data
              : [
                  {
                    id: "1",
                    market: "DXE/USDC",
                    side: "buy",
                    size: 1000,
                    price: 495145,
                  },
                  {
                    id: "2",
                    market: "DXE/USDC",
                    side: "buy",
                    size: 1000,
                    price: 495145,
                  },
                  {
                    id: "3",
                    market: "DXE/USDC",
                    side: "buy",
                    size: 1000,
                    price: 495145,
                  },
                ],
        });
      }, 5000);
  }, [gdata, data]);

  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-3 sm:px-5 lg:px-10 py-3 sm:py-5 flex-1"
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
                {gdata.body.map((row: any, index) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d]"
                    key={`${formatedString(
                      row.id.toLocaleLowerCase()
                    )}_${index}`}
                  >
                    <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                      {row.market}
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
                      <Button>Cancel</Button>
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

const Balance = ({ data, isEXTRASMALL }: HeaderProps) => {
  const [gdata, setData] = useState({
    header: ["DXE", "USDC"],
    body: [],
  });

  useEffect(() => {
    gdata.body.length === 0 &&
      setTimeout(() => {
        setData({
          ...gdata,
          body:
            data.length > 0
              ? data
              : [
                  {
                    id: "1",
                    title: "Wallet",
                    dxe_value: 100000,
                    ustc_value: 100000,
                  },
                  {
                    id: "2",
                    title: "DEX",
                    dxe_value: 100000,
                    ustc_value: 100000,
                  },
                ],
        });
      }, 5000);
  }, [gdata, data]);

  return (
    <div
      className="h-max w-full rounded-xl p-5 gap-4 flex flex-col sm:flex-1"
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <div className="flex gap-3 sm:gap-5 justify-between items-center w-full">
        <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
          Blance
        </h3>
        <Button onClick={() => {}}>Settle All</Button>
      </div>
      <Table className="w-full flex-1 mt-2 overflow-x-scroll">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead
              className="text-sm md:text-md truncate max-w-[110px]"
              align="left"
            />
            {gdata.header.map((header, index) => (
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
          {gdata.body.length <= 0 ? (
            <>
              <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                  <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                </TableCell>
                {gdata.header.map((header, index) => (
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
              {gdata.body.map((row: any, index) => (
                <TableRow
                  className="hover:bg-transparent border-[#7c7c8d]"
                  key={`${formatedString(row.id.toLocaleLowerCase())}_${index}`}
                >
                  <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                    {row.title}
                  </TableCell>

                  <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                    {formatedNumber(
                      row.dxe_value ? row.dxe_value : 0,
                      2,
                      isEXTRASMALL
                    )}
                  </TableCell>

                  <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                    {formatedNumber(
                      row.ustc_value ? row.ustc_value : 0,
                      2,
                      isEXTRASMALL
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const Sidebar = ({
  data,
  isEXTRASMALL,
  tokenBalance,
  form,
  setForm,
}: SidebarProps) => {
  const tabsDATA = ["Buy", "Sell"];
  const parts = [0.25, 0.5, 0.75, 1];

  const handlePlaceOrder = async () => {};
  return (
    <div
      className="h-max w-full rounded-xl p-5 gap-4 flex flex-col"
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full">
          <div className="flex gap-3 sm:gap-5 justify-between w-full items-center">
            <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
              Limit Order
            </h3>
            <div className="flex gap-2">
              {tabsDATA.map((tab_item, id) => (
                <TabsTrigger
                  value={tab_item.toLocaleLowerCase()}
                  key={`${tab_item}_${id}`}
                  className="bg-[#d9f8ff10] data-[state='active']:bg-[#d9f8ff10] data-[state='active']:border-[#d9f8ff] rounded-full"
                  style={{
                    border:
                      tab_item.toLocaleLowerCase() === form.tab
                        ? "1px solid #d9f8ff10"
                        : "transparent",
                    boxShadow:
                      tab_item.toLocaleLowerCase() === form.tab
                        ? "0 0 5px #d9f8ff"
                        : "none",
                  }}
                  onClick={() =>
                    setForm({ ...form, tab: tab_item.toLocaleLowerCase() })
                  }
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
              <div className="flex flex-col w-full gap-4">
                <div
                  className="flex gap-3 sm:gap-6 items-center justify-between bg-[#111b2a] p-4 rounded-xl"
                  style={{ boxShadow: "0 0 5px rgba(217, 248, 255, 0.5)" }}
                >
                  <label className="text-white text-xs sm:text-sm">
                    Limit Price
                  </label>
                  <Input
                    aria-label="Limit Price"
                    value={form.limit_price}
                    className={`bg-transparent text-white rounded-2xl border-[#d9f8ff50] ${
                      isEXTRASMALL ? "max-w-[120px]" : "max-w-[170px]"
                    }`}
                    onChange={(e) => {
                      const value = +e.target.value;
                      if (value > 100000) {
                        setForm({ ...form, limit_price: 100000 });
                      } else if (value < 0) {
                        setForm({ ...form, limit_price: 0 });
                      } else if (Number.isNaN(value)) {
                        setForm({ ...form, limit_price: 0 });
                      } else {
                        setForm({ ...form, limit_price: value });
                      }
                    }}
                    max={100000}
                    min={0}
                  />
                </div>
                <div
                  className="flex gap-6 justify-between items-center bg-[#111b2a] p-4 rounded-xl"
                  style={{ boxShadow: "0 0 5px rgba(217, 248, 255, 0.5)" }}
                >
                  <label className="text-white text-xs sm:text-sm">
                    Amount
                  </label>
                  <Input
                    aria-label="Amount"
                    value={form.amount}
                    className={`bg-transparent text-white rounded-2xl border-[#d9f8ff50] ${
                      isEXTRASMALL ? "max-w-[120px]" : "max-w-[170px]"
                    }`}
                    onChange={(e) => {
                      const value = +e.target.value;
                      if (value > 100000) {
                        setForm({ ...form, amount: 100000 });
                      } else if (value < 0) {
                        setForm({ ...form, amount: 0 });
                      } else if (Number.isNaN(value)) {
                        setForm({ ...form, amount: 0 });
                      } else {
                        setForm({ ...form, amount: value });
                      }
                    }}
                    max={100000}
                    min={0}
                  />
                </div>
                <div
                  className="flex gap-6 justify-between items-center bg-[#111b2a] p-4 rounded-xl"
                  style={{ boxShadow: "0 0 5px rgba(217, 248, 255, 0.5)" }}
                >
                  <label className="text-white text-xs sm:text-sm">Total</label>
                  <Input
                    aria-label="Total"
                    value={
                      !!form.amount && !!form.limit_price
                        ? form.limit_price * form.amount
                        : 0
                    }
                    className={`bg-transparent text-white rounded-2xl border-[#d9f8ff50] ${
                      isEXTRASMALL ? "max-w-[120px]" : "max-w-[170px]"
                    }`}
                    max={100000}
                    min={0}
                  />
                </div>
              </div>
              <div
                className={`flex w-full gap-4 ${
                  isEXTRASMALL ? "flex-wrap" : "flex-nowrap"
                }`}
              >
                {parts.map((part, id) => (
                  <Button
                    onClick={() => {
                      !!tokenBalance ? tokenBalance * part : 0;
                    }}
                    key={id}
                    className="w-full"
                  >
                    {part * 100}%
                  </Button>
                ))}
              </div>
              <div className="flex w-full gap-4 flex-nowrap">
                <span className="text-[#D9F8FF] text-sm">
                  {tab_item.toLocaleLowerCase() === "buy"
                    ? data?.tokenB?.symbol
                    : data?.tokenA?.symbol}
                </span>
                <span className="text-[#D9F8FF] text-sm">
                  Balance: {formatedNumber(tokenBalance, 4, isEXTRASMALL)}
                </span>
              </div>

              <Button onClick={handlePlaceOrder}>Place order</Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

const OrderBook = ({ data, isEXTRASMALL, bids, asks }: OrderBookProps) => {
  const tabsDATA = ["All", "Buy", "Sell"];
  const [tab, setTab] = useState("all");

  return (
    <div
      className="h-max w-full rounded-xl p-5 gap-4 flex flex-col flex-1"
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full">
          <div className="flex gap-3 sm:gap-5 justify-between w-full items-center flex-wrap">
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

const TradeChart = ({ isEXTRASMALL }: Props) => {
  const [orders, setOrders] = useState([]);
  const [market, setMarket] = useState({} as any);
  const [asks, setAsks] = useState([] as any);
  const [bids, setBids] = useState([] as any);
  const [selectedMarket, setSelectedMarket] = useState(MARKETS[0] as any);
  const [tokenBalance, setTokenBalance] = useState(0);
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(true);
  const [sidebarForm, setSidebarForm] = useState({
    amount: 0,
    limit_price: 0,
    tab: "buy",
  });

  useEffect(() => {
    MARKETS.forEach(async (item: any) => {
      item.tokenA = await findToken(item.name.split("/")[0]);
      item.tokenB = await findToken(item.name.split("/")[1]);
      setSelectedMarket(MARKETS[0]);
    });
  }, []);

  const fetchOrders = async () => {
    if (market === undefined) {
      return;
    }
    if (!("loadOrdersForOwner" in market)) {
      return;
    }
    const orders = await market.loadOrdersForOwner(connection, publicKey);
    setOrders(orders);
  };

  useEffect(() => {
    (async () => {
      let market = await Market.load(
        connection,
        new PublicKey(selectedMarket.address),
        {},
        new PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX")
      );
      // Fetching orderbooks
      let bids: any = await market.loadBids(connection);
      let asks: any = await market.loadAsks(connection);
      let returnAsks = [],
        returnBids = [];

      for (let i = 0; i < asks.length; i++) {
        const order = asks[i];
        if (returnAsks.length !== 12) {
          returnAsks.push({
            price: order.price,
            size: order.size,
            side: order.side,
          });
        } else {
          break;
        }
      }
      for (let order of bids) {
        if (returnBids.length !== 12)
          returnBids.push({
            price: order.price,
            size: order.size,
            side: order.side,
          });
      }
      const fills = await market.loadFills(connection);
      console.log(fills);
      setAsks(returnAsks);
      setBids(returnBids);
      setMarket(market);
      setLoading(false);
    })();
  }, [selectedMarket]);

  const fetchTokenBalance = async () => {
    let balance = 0;
    if (publicKey === null) {
      return;
    }
    const walletBalance = await getTokenBalanceFromWallet(publicKey);
    if (selectedMarket.tokenB.symbol !== "SOL") {
      const tokenB = walletBalance.find((item: any) => {
        if ("parsed" in item.account.data) {
          item.account.data.parsed.info.mint === selectedMarket.tokenB.address;
        }
      });
      if (
        tokenB?.account?.data !== undefined &&
        "parsed" in tokenB?.account?.data
      ) {
        selectedMarket.tokenB.balance =
          tokenB?.account?.data.parsed.info?.tokenAmount?.uiAmount;
      } else {
        selectedMarket.tokenB.balance = 0;
      }
    } else {
      selectedMarket.tokenB.balance =
        (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL;
    }
    if (selectedMarket.tokenA.symbol !== "SOL") {
      const tokenA = walletBalance.find((item: any) => {
        if ("parsed" in item.account.data) {
          item.account.data.parsed.info.mint === selectedMarket.tokenA.address;
        }
      });
      if (
        tokenA?.account?.data !== undefined &&
        "parsed" in tokenA?.account?.data
      ) {
        selectedMarket.tokenA.balance =
          tokenA?.account?.data.parsed.info?.tokenAmount?.uiAmount;
      } else {
        selectedMarket.tokenB.balance = 0;
      }
    } else {
      selectedMarket.tokenA.balance =
        (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL;
    }
    if (sidebarForm.tab === "buy") balance = selectedMarket.tokenB.balance;
    else balance = selectedMarket.tokenA.balance;
    setTokenBalance(balance);
  };
  useEffect(() => {
    if (publicKey && !loading) {
      fetchTokenBalance();
      fetchOrders();
    }
  }, [publicKey]);

  return (
    <div className="z-50 static py-5 flex flex-col gap-5 items-center w-full">
      <div className="flex w-full gap-4 flex-wrap xl:flex-nowrap">
        <div className="flex flex-col gap-2 md:gap-4 w-full">
          <Header data={selectedMarket} isEXTRASMALL={isEXTRASMALL} />
          <Chart data={ChartDATA} isEXTRASMALL={isEXTRASMALL} />
          <div className="flex flex-wrap gap-4">
            <Orders data={orders} isEXTRASMALL={isEXTRASMALL} />
            <Balance data={orders} isEXTRASMALL={isEXTRASMALL} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col w-full lg:w-1/5 max-w-none lg:max-w-md gap-4 lg:min-w-max">
          <Sidebar
            data={selectedMarket}
            isEXTRASMALL={isEXTRASMALL}
            tokenBalance={tokenBalance}
            setForm={setSidebarForm}
            form={sidebarForm}
          />
          <OrderBook
            data={selectedMarket}
            isEXTRASMALL={isEXTRASMALL}
            bids={bids}
            asks={asks}
          />
        </div>
      </div>

      <TradeMarketModal
        markets={MARKETS}
        setSelectedMarket={setSelectedMarket}
      />
    </div>
  );
};

export default TradeChart;
