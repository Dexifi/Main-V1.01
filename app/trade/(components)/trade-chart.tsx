import { TradeMarketModal } from "@/components/modals";
import Header from "./Header";
import Sidebar from "./Sidebar";
import OrderBook from "./OrderBook";
import Chart from "./Chart";
import Orders from "./Order";
import { useTrade } from "@/applications/Trade";
import TradeProvider from "@/applications/Trade/Provider";
import Balance from "./Balance";
import { memo } from "react";
import JupiterSidebar from "./Jupiter/JupiterSidebar";
import JupiterHeader from "./Jupiter/JupiterHeader";
import {
  TradingProviders,
  useJupiterTrade,
  useSelectedProvider,
} from "@/applications/Trade/store";
import JupiterOrders from "./Jupiter/JupiterOrders";
import { CircularProgress, Stack } from "@mui/material";

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
    loading: openBookLoading,
  } = useTrade();
  const jupiterLoading = useJupiterTrade((state) => state.loading);
  const { tokenA } = useJupiterTrade();
  const { selectedProvider, setSelectedProvider } = useSelectedProvider();
  return (
    <TradeProvider>
      {(selectedProvider === TradingProviders.JUP && jupiterLoading) ||
      (selectedProvider === TradingProviders.OPENBOOK && openBookLoading) ? (
        <Stack sx={{ minHeight: "80vh" }}>
          <CircularProgress sx={{ m: "auto", color: "#fff" }} />;
        </Stack>
      ) : (
        <div className="z-50 relative  py-5 flex flex-col gap-5 items-center w-full">
          <div className="flex w-full gap-4 flex-wrap xl:flex-nowrap xl:grid-cols-12 xl:grid">
            <div className="flex flex-col gap-2 md:gap-4 w-full xl:col-span-9">
              {selectedProvider === TradingProviders.OPENBOOK ? (
                <Header
                  currentMarket={marketDetails}
                  lastOrder={fills[0]}
                  isEXTRASMALL={isEXTRASMALL}
                />
              ) : (
                <JupiterHeader isEXTRASMALL={isEXTRASMALL} />
              )}

              <Chart
                tokenA={
                  selectedProvider === TradingProviders.JUP
                    ? tokenA?.address
                    : marketDetails?.tokenA?.address ?? ""
                }
                isEXTRASMALL={isEXTRASMALL}
              />
              <div className="flex flex-col md:flex-row w-full gap-4 xl:col-span-4">
                {selectedProvider === TradingProviders.JUP ? (
                  <JupiterOrders isEXTRASMALL={isEXTRASMALL} />
                ) : (
                  <>
                    <Orders
                      selectedMarket={marketDetails}
                      data={orders}
                      isEXTRASMALL={isEXTRASMALL}
                    />
                    <Balance order={orders} isEXTRASMALL={isEXTRASMALL} />
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full gap-4 xl:col-span-3">
              <div
                className="h-max  w-full rounded-xl p-5 gap-4 flex flex-col"
                style={{
                  boxShadow: "0 0 4px #88d6ff",
                }}
              >
                <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
                  Providers
                </h3>
                <div
                  className={
                    "text-white flex flex-row justify-between items-center gap-6"
                  }
                >
                  <button
                    onClick={() => setSelectedProvider(TradingProviders.JUP)}
                    className={
                      "flex justify-center items-center flex-1 flex-row gap-2 text-lg bg-[#111b2a] p-4 rounded-xl "
                    }
                    style={{
                      boxShadow:
                        selectedProvider === TradingProviders.JUP
                          ? "0 0 8px rgba(217, 248, 255, 0.8)"
                          : "0 0 5px rgba(217, 248, 255, 0.5)",
                    }}
                  >
                    <img
                      src={"/assets/icons/logos/jupiter_logo.svg"}
                      className={"w-5 h-5"}
                    />
                    Jupiter
                  </button>
                  <button
                    onClick={() =>
                      setSelectedProvider(TradingProviders.OPENBOOK)
                    }
                    className={
                      "flex justify-center items-center flex-1 flex-row gap-2 text-lg bg-[#111b2a] p-4 rounded-xl "
                    }
                    style={{
                      boxShadow:
                        selectedProvider === TradingProviders.OPENBOOK
                          ? "0 0 8px rgba(217, 248, 255, 0.8)"
                          : "0 0 5px rgba(217, 248, 255, 0.5)",
                    }}
                  >
                    <img
                      src={"/assets/icons/logos/openbook.svg"}
                      className={"w-5 h-5"}
                    />
                    OpenBook
                  </button>
                </div>
              </div>

              {selectedProvider === TradingProviders.JUP ? (
                <>
                  <JupiterSidebar
                    setForm={useTrade.getState().setNewOrder}
                    isEXTRASMALL={isEXTRASMALL}
                    form={newOrder}
                    userBalance={tokens}
                    availableSide={availableSide}
                    market={market}
                  />
                </>
              ) : (
                <>
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
                  />{" "}
                </>
              )}
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
