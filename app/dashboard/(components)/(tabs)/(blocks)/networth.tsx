import React, { useMemo } from "react";
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
import { useWallet } from "@solana/wallet-adapter-react";
import { useDashboard } from "@/applications/Dashboard/store";

type Props = {
  isEXTRASMALL: boolean;
};
const Networth = ({ isEXTRASMALL }: Props) => {
  const { connection } = useConnection();

  const { publicKey } = useWallet();

  const { netWorth } = useDashboard();

  const total = useMemo(() => {
    return (
      netWorth.totalAmm +
      netWorth.totalClmm +
      netWorth.totalFarm +
      netWorth.totalLend +
      netWorth.totalStake +
      netWorth.totalTrade +
      netWorth.totalWallet +
      netWorth.totalStakesReward
    );
  }, [
    netWorth.totalAmm,
    netWorth.totalClmm,
    netWorth.totalFarm,
    netWorth.totalLend,
    netWorth.totalStake,
    netWorth.totalStakesReward,
    netWorth.totalTrade,
    netWorth.totalWallet,
  ]);
  const data = {
    title: "Net Worth",
    price: total,
    table: {
      header: ["Value", "Pending Value", "Value/NetWorth %"],
      rows: [
        {
          title: "Wallet Balance",
          color: "text-[#fa01d2]",
          background: "bg-[#fa01d2]",
          value: netWorth.totalWallet,
          pending: 0,
          worth: (netWorth.totalWallet / total) * 100,
        },
        {
          title: "Staking",
          color: "text-[#00b127]",
          background: "bg-[#00b127]",
          value: netWorth.totalStake,
          pending: netWorth.totalStakesReward,
          worth:
            ((netWorth.totalStake + netWorth.totalStakesReward) / total) * 100,
        },
        {
          title: "Lending",
          color: "text-[#00ffec]",
          background: "bg-[#00ffec]",
          value: netWorth.totalLend,
          pending: 0,
          worth: (netWorth.totalLend / total) * 100,
        },
        {
          title: "Trading",
          color: "text-[#c95901]",
          background: "bg-[#c95901]",
          value: netWorth.totalTrade,
          pending: 0,
          worth: (netWorth.totalTrade / total) * 100,
        },
        {
          title: "Liquidity",
          color: "text-[#efd301]",
          background: "bg-[#efd301]",
          value: netWorth.totalAmm + netWorth.totalClmm,
          pending: 0,
          worth: ((netWorth.totalAmm + netWorth.totalClmm) / total) * 100,
        },
        {
          title: "Farm",
          color: "text-[#ba0000]",
          background: "bg-[#ba0000]",
          value: netWorth.totalFarm,
          pending: 0,
          worth: (netWorth.totalFarm / total) * 100,
        },
        {
          title: "NFT",
          color: "text-[#7000ff]",
          background: "bg-[#7000ff]",
          value: 0,
          pending: 0,
          worth: 0,
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
    <div className="w-full flex flex-wrap justify-between gap-4">
      <div
        className="flex-1 bg-[#0d111b] rounded-3xl px-4 lg:px-10 py-4 overflow-auto"
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
                  className="text-sm md:text-md truncate max-w-[110px] text-[#D9F8FF] p-0"
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
                <TableCell className="font-medium text-left py-2 text-sm md:text-md truncate max-w-[110px] pl-0">
                  {row.title}
                  <span className={cn("ml-1", row.color)}>*</span>
                </TableCell>
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2 pl-0">
                  ${formatedNumber(Number(row.value))}
                </TableCell>
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2 pl-0">
                  ${formatedNumber(row.pending)}
                </TableCell>
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2 pl-0">
                  {formatedNumber(Number(row.worth))}%
                </TableCell>
              </TableRow>
            ))}
            {/*  */}
            <TableRow className="hover:bg-transparent">
              <TableCell />
              <TableCell />
              <TableCell className="font-medium text-left text-[#7c7c8d] py-2 pl-0">
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
              <TableCell className="font-medium text-left text-[#7c7c8d] py-2 pl-0">
                {formatedNumber(
                  Number(
                    data.table.rows
                      .map((row) => row.worth)
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                  )
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div
        className={`min-w-[320px] overflow-hidden items-center flex ${
          isEXTRASMALL ? "flex-col" : "flex-row"
        } md:flex-col ${
          isEXTRASMALL ? "justify-center" : "justify-start"
        } md:justify-normal gap-5 p-5 bg-[#0d111b] rounded-3xl`}
        id="pie-chart"
        style={{ boxShadow: "0 0 4px #88d6ff" }}
      >
        <PieChart
          width={isEXTRASMALL ? 160 : 200}
          height={isEXTRASMALL ? 160 : 200}
          style={{
            margin: "0 auto",
            zIndex: 10,
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
        <div className="flex flex-col w-full px-10 -m-4">
          {data.table.rows.map((entry, index) => (
            <div
              key={`cell-${index}`}
              className="text-left flex items-center gap-x-2 w-full text-sm text-[#7c7c8d] font-medium truncate"
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
