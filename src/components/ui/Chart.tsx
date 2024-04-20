import {
  Area,
  AreaChart,
  Rectangle,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={730} height={250} data={rangeData}>
        <Area dataKey="testA" stroke="#8884d8" fill="#8884d8" />
        <ReferenceLine
          isFront={true}
          x={3000}
          stroke="#39D0D8"
          strokeDasharray="43"
          strokeWidth={2}
        />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;

const rangeData = [
  {
    testA: [0, 10],
  },
  {
    testA: [0, 15],
  },
  {
    testA: [0, 12],
  },
  {
    testA: [0, 12],
  },
];
