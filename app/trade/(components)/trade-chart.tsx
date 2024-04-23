import { TradeMarketModal } from "@/components/modals";
import Header from "./Header";
import Sidebar from "./Sidebar";
import OrderBook from "./OrderBook";
import Chart from "./Chart";
import Orders from "./Order";
import { useTrade } from "@/applications/Trade";
import { MARKETS } from "@openbook-dex/openbook";
import TradeProvider from "@/applications/Trade/Provider";
import Balance from "./Balance";
import { CircularProgress } from "@mui/material";
import { memo } from "react";

type Props = {
  isEXTRASMALL: boolean;
};

export interface AccountFlags {
  initialized: boolean;
  market: boolean;
  openOrders: boolean;
  requestQueue: boolean;
  eventQueue: boolean;
  bids: boolean;
  asks: boolean;
}

const TradeChart = memo(({ isEXTRASMALL }: Props) => {
  const {
    marketDetails,
    newOrder,
    orders,
    fills,
    bids,
    asks,
    marketList,
    market,
    tokens,
    availableSide,
    fetchLoading,
    placeOrder,
  } = useTrade();
  return (
    <TradeProvider>
      {fetchLoading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            color: "#fff",
          }}
        />
      ) : (
        <div className="z-50 static py-5 flex flex-col gap-5 items-center w-full">
          <div className="flex w-full gap-4 flex-wrap xl:flex-nowrap xl:grid-cols-12 xl:grid">
            <div className="flex flex-col gap-2 md:gap-4 w-full xl:col-span-9">
              <Header
                currentMarket={marketDetails}
                lastOrder={fills[0]}
                isEXTRASMALL={isEXTRASMALL}
              />

              <Chart
                tokenA={marketDetails?.tokenA?.address ?? ""}
                tokenB={marketDetails?.tokenB?.address ?? ""}
                isEXTRASMALL={isEXTRASMALL}
              />
              <div className="flex flex-col md:flex-row w-full gap-4 xl:col-span-4">
                <Orders
                  selectedMarket={marketDetails}
                  data={orders}
                  isEXTRASMALL={isEXTRASMALL}
                />
                <Balance order={orders} isEXTRASMALL={isEXTRASMALL} />
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 xl:col-span-3">
              <Sidebar
                setForm={useTrade.getState().setNewOrder}
                isEXTRASMALL={isEXTRASMALL}
                selectedMarket={marketDetails}
                form={newOrder}
                userBalance={tokens}
                availableSide={availableSide}
                market={market}
              />
              <OrderBook
                data={marketDetails}
                isEXTRASMALL={isEXTRASMALL}
                bids={bids}
                asks={asks}
              />
            </div>
          </div>

          <TradeMarketModal markets={marketList} />
        </div>
      )}
    </TradeProvider>
  );
});

TradeChart.displayName = "TradeChart";

export default TradeChart;
