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
import { cn } from "@/lib/utils";
import { Cell, Pie, PieChart } from "recharts";
import useConnection from "@/hooks/useConnection";
import useWalletBalance from "@/hooks/useWalletBalance";
import useLend from "@/hooks/useLend";
import { PublicKey } from "@solana/web3.js";
import { useEffect } from "react";

type Props = {
  isEXTRASMALL: boolean;
};
const Networth = ({ isEXTRASMALL }: Props) => {
  const { connection } = useConnection();
  // const { publicKey, connect } = useWallet();
  const publicKey = new PublicKey(
    "BXUTgx4HZ2aqXALvvSXr5NeNhVABw6VmhjXhQWuGmK6d"
  );
  const { tokens, walletBalance } = useWalletBalance(connection, publicKey);
  // const { stakes } = useStaking(connection, publicKey);
  const { getLends } = useLend(connection, publicKey);

  useEffect(() => {
    getLends();
  }, []);

  const data = {
    title: "Net Worth",
    price: 100000,
    table: {
      header: ["Value", "Pending Value", "Value/NetWorth %"],
      rows: [
        {
          title: "Wallet Balance",
          color: "text-[#fa01d2]",
          background: "bg-[#fa01d2]",
          value: walletBalance,
          pending: 0,
          worth: walletBalance,
        },
        {
          title: "Staking",
          color: "text-[#00b127]",
          background: "bg-[#00b127]",
          value: 12500,
          pending: 150,
          worth: 12.5,
        },
        {
          title: "Lending",
          color: "text-[#00ffec]",
          background: "bg-[#00ffec]",
          value: 12500,
          pending: 0,
          worth: 12.5,
        },
        {
          title: "Trading",
          color: "text-[#c95901]",
          background: "bg-[#c95901]",
          value: 12500,
          pending: 0,
          worth: 12.5,
        },
        {
          title: "Liquidity",
          color: "text-[#efd301]",
          background: "bg-[#efd301]",
          value: 12500,
          pending: 0,
          worth: 12.5,
        },
        {
          title: "Farm",
          color: "text-[#ba0000]",
          background: "bg-[#ba0000]",
          value: 0,
          pending: 0,
          worth: 2,
        },
        {
          title: "NFT",
          color: "text-[#7000ff]",
          background: "bg-[#7000ff]",
          value: 25000,
          pending: 0,
          worth: 10.5,
        },
      ],
    },
  };

  const COLORS = [
    "#fa01d2",
    "#00b127",
    "#00ffec",
    "#c95901",
    "#efd301",
    "#ba0000",
    "#7000ff",
  ];

  return (
    <div className="w-full flex flex-wrap justify-between gap-5">
      <div
        className="flex flex-col justify-start items-start gap-y-5 flex-1 bg-[#0d111b] rounded-3xl px-5 lg:px-10 py-5 overflow-auto"
        style={{ boxShadow: "0 0 4px #88d6ff" }}
      >
        <div className="flex gap-x-5 text-[#D9F8FF] text-lg md:text-2xl">
          <h3>{data.title}</h3>
          <span>${formatedNumber(data.price)}</span>
        </div>
        {/*  */}
        <Table className="w-full">
          <TableHeader className="flex-1">
            <TableRow className="hover:bg-transparent">
              <TableHead />
              {data.table.header.map((header, index) => (
                <TableHead
                  key={`${formatedString(header.toLocaleLowerCase())}_${index}`}
                  className="text-sm md:text-md truncate max-w-[110px]"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="flex-1">
            {/*  */}
            {data.table.rows.map((row, index) => (
              <TableRow
                className="hover:bg-transparent border-[#7c7c8d] "
                key={`${formatedString(
                  row.title.toLocaleLowerCase()
                )}_${index}`}
              >
                <TableCell className="font-medium text-left py-2 text-sm md:text-md truncate max-w-[110px]">
                  {row.title}
                  <span className={cn("ml-1", row.color)}>*</span>
                </TableCell>
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                  ${formatedNumber(row.value)}
                </TableCell>
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                  ${formatedNumber(row.pending)}
                </TableCell>
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                  {formatedNumber(row.worth)}%
                </TableCell>
              </TableRow>
            ))}
            {/*  */}
            <TableRow className="hover:bg-transparent">
              <TableCell />
              <TableCell />
              <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                $
                {formatedNumber(
                  data.table.rows
                    .map((row) => row.pending)
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                )}
              </TableCell>
              <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                {formatedNumber(
                  data.table.rows
                    .map((row) => row.worth)
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                )}
                %
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div
        className={`min-w-max md:min-w-80 w-full md:w-max overflow-hidden flex ${
          isEXTRASMALL ? "flex-col" : "flex-row"
        } md:flex-col ${
          isEXTRASMALL ? "justify-center" : "justify-between"
        } md:justify-normal gap-y-5 p-5 bg-[#0d111b] rounded-3xl`}
        id="pie-chart"
        style={{ boxShadow: "0 0 4px #88d6ff" }}
      >
        <PieChart
          width={isEXTRASMALL ? 160 : 200}
          height={isEXTRASMALL ? 160 : 200}
          style={{
            margin: "0 auto",
          }}
        >
          <Pie
            data={data.table.rows}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="worth"
          >
            {data.table.rows.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                className="outline-none"
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="flex flex-col gap-y-1">
          {data.table.rows.map((entry, index) => (
            <div
              key={`cell-${index}`}
              className="text-left flex items-center gap-x-2 w-full text-[0.69rem] text-[#7c7c8d] font-medium truncate"
            >
              <div
                className={`w-3 h-3 object-contain aspect-square ${entry.background} rounded-[3px]`}
              />
              {entry.title}
              <div className="flex-1 text-right text-white">
                {formatedNumber(entry.worth)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Networth;
