import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useMemo, useState } from "react";

type Props = {
  points: { x: number; y: number }[];
  currentPrice: number;
  upperPrice: number;
  lowerPrice: number;
};

const ClmmChart = ({ points, lowerPrice, upperPrice, currentPrice }: Props) => {
  const [xAxisDomain, setXAxisDomain] = useState([60, 120]);
  const [userRange, setUserRange] = useState([0, 0]);
  const data = useMemo(() => {
    return points;
  }, [points]);

  const yAxisMax = useMemo(() => {
    const max = points.reduce((acc, point) => {
      return Math.max(acc, point.y);
    }, 0);
    return max * 1.1;
  }, [points]);

  const zoomIn = () => {
    setXAxisDomain((e) => [e[0] + 7, e[1] - 7]);
  };

  const zoomOut = () => {
    setXAxisDomain((e) => [e[0] - 7, e[1] + 7]);
  };

  useEffect(() => {
    lowerPrice && upperPrice && setUserRange([lowerPrice, upperPrice]);
  }, [lowerPrice, upperPrice]);

  useEffect(() => {
    currentPrice && setXAxisDomain([lowerPrice - 20, upperPrice + 20]);
  }, [currentPrice]);
  return (
    <div className="w-ful h-full mb-3">
      <div className="flex row gap-2 mb-3">
        <button
          onClick={zoomIn}
          className="py-0.5 px-2  bg-transparent text-[#9DB3EC]  border-[#9DB3EC] !rounded-xl border text-sm"
        >
          zoom in
        </button>
        <button
          className="py-0.5 px-2  bg-transparent text-[#9DB3EC]  border-[#9DB3EC] !rounded-xl border text-sm"
          onClick={zoomOut}
        >
          zoom out
        </button>
      </div>
      <ResponsiveContainer height={200}>
        <AreaChart margin={{}} defaultShowTooltip={false} data={data}>
          <XAxis
            style={{ userSelect: "none", fontSize: "10px", fill: "#9DB3EC" }}
            type="number"
            domain={xAxisDomain}
            interval="equidistantPreserveStart"
            allowDataOverflow
            tickLine={false}
            dataKey="x"
          />
          <YAxis
            allowDataOverflow
            type="number"
            domain={[0, yAxisMax]}
            hide
            dataKey={"y"}
          />
          <Area
            type="step"
            dataKey="y"
            stroke="#9DB3EC"
            fill="#9DB3EC"
            isAnimationActive={false}
          />
          <Area
            type="step"
            dataKey="y"
            stroke="#9DB3EC"
            fill="#9DB3EC"
            isAnimationActive={false}
          />
          <ReferenceLine
            x={currentPrice.toString()}
            strokeWidth={2}
            strokeDasharray={"10"}
            isFront
            stroke="#fff"
          />
          <ReferenceLine strokeWidth={4} x={userRange[0]} stroke="#21648F" />
          <ReferenceLine strokeWidth={4} x={userRange[1]} stroke="#21648F" />
          <ReferenceArea
            style={{ cursor: "pointer" }}
            x1={userRange[0]}
            x2={userRange[1]}
            y1={0}
            y2={yAxisMax}
            fill="#21648F"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClmmChart;
