import { SolendMarket } from "@solendprotocol/solend-sdk/index";
import { Cell, Pie, PieChart } from "recharts";
import { MarketDetails } from "@/applications/Lend/types";

type Props = {
  market: SolendMarket | null;
  details: MarketDetails | null;
};
const cx = 105;
const cy = 105;
const iR = 85;
const oR = 100;

const Chart = ({ details }: Props) => {
  const data = [
    {
      name: "borrow",
      value: details?.totalBorrowBN.toNumber(),
      color: "#76FFFF",
    },
    {
      name: "supply",
      value: details?.totalSupplyBN.toNumber(),
      color: "#282E38",
    },
  ];

  return (
    <div>
      <PieChart width={220} height={220}>
        <Pie
          dataKey="value"
          startAngle={220}
          endAngle={-40}
          data={data}
          cx={cx}
          x="50%"
          y="50%"
          cy={cy}
          alignmentBaseline={"central"}
          innerRadius={iR}
          outerRadius={oR}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <text
          x={"50%"}
          y={"55%"}
          stroke="#61C7CB"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {details?.totalBorrowBN
            .multipliedBy(100)
            .div(details?.totalSupplyBN)
            .toFixed(2)}
          %
        </text>
      </PieChart>
    </div>
  );
};
export default Chart;
