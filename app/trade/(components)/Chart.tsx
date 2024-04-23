import { memo } from "react";

type ChartProps = {
  isEXTRASMALL: boolean;
  tokenA: string;
  tokenB: string;
};

const Chart = memo(({ tokenB, tokenA, isEXTRASMALL }: ChartProps) => {
  const actions = [1, 6, 12, 24];
  return (
    <div
      className="w-full rounded-xl overflow-hidden gap-4 md:flex flex-col"
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <div className="h-full max-h-96 md:max-h-[720px] min-h-0 md:min-h-[720px]">
        <iframe
          width="100%"
          height="100%"
          src={`https://birdeye.so/tv-widget/${tokenA}/${tokenB}?chain=solana&chartType=candle&chartInterval=3&chartLeftToolbar=show`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
});

Chart.displayName = "Chart";

export default Chart;
