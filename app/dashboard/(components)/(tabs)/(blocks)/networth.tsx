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
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import useTrade from "@/hooks/useTrade";
import useLiquidity from "@/hooks/useLiquidity";
import useStaking from "@/hooks/useStaking";
import useNFT from "@/hooks/useNFT";
import useFarm from "@/hooks/useFarm";

type Props = {
  isEXTRASMALL: boolean;
};
const Networth = ({ isEXTRASMALL }: Props) => {
  const { connection } = useConnection();

  const { publicKey } = useWallet();

  const { tokens, walletBalance } = useWalletBalance(connection, publicKey);

  const { userObligationState } = useLend(connection, publicKey);

  const { ownerOpenOrders, totalPrices: totalTrade } = useTrade(
    connection,
    publicKey
  );

  const { clmmTotal, ammTotal } = useLiquidity(connection, publicKey);

  const { totalDeposit: stakeDeposit, totalPendingReward: stakePending } =
    useStaking(connection, publicKey);

  const { pendingReward: farmPending, deposit: farmDeposit } = useFarm(
    connection,
    publicKey
  );
  const netWorth = useMemo(
    () =>
      walletBalance +
      (userObligationState?.userTotalDeposit ?? 0) +
      totalTrade +
      clmmTotal +
      ammTotal +
      stakeDeposit +
      farmDeposit +
      stakePending +
      farmPending,
    [
      walletBalance,
      userObligationState?.userTotalDeposit,
      totalTrade,
      clmmTotal,
      ammTotal,
      stakeDeposit,
      farmDeposit,
    ]
  );

  const data = {
    title: "Net Worth",
    price: netWorth,
    table: {
      header: ["Value", "Pending Value", "Value/NetWorth %"],
      rows: [
        {
          title: "Wallet Balance",
          color: "text-[#fa01d2]",
          background: "bg-[#fa01d2]",
          value: walletBalance,
          pending: 0,
          worth: (walletBalance / netWorth) * 100,
        },
        {
          title: "Staking",
          color: "text-[#00b127]",
          background: "bg-[#00b127]",
          value: stakeDeposit,
          pending: stakePending,
          worth: ((stakeDeposit + stakePending) / netWorth) * 100,
        },
        {
          title: "Lending",
          color: "text-[#00ffec]",
          background: "bg-[#00ffec]",
          value: userObligationState?.userTotalDeposit.toFixed(2),
          pending: 0,
          worth:
            ((userObligationState?.userTotalDeposit ?? 0) / netWorth) * 100,
        },
        {
          title: "Trading",
          color: "text-[#c95901]",
          background: "bg-[#c95901]",
          value: totalTrade,
          pending: 0,
          worth: (totalTrade / netWorth) * 100,
        },
        {
          title: "Liquidity",
          color: "text-[#efd301]",
          background: "bg-[#efd301]",
          value: ammTotal + clmmTotal,
          pending: 0,
          worth: ((ammTotal + clmmTotal) / netWorth) * 100,
        },
        {
          title: "Farm",
          color: "text-[#ba0000]",
          background: "bg-[#ba0000]",
          value: farmDeposit,
          pending: farmPending,
          worth: ((farmDeposit + farmPending) / netWorth) * 100,
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
