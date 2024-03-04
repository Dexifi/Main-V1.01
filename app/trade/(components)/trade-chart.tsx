import { connection } from "@/lib/get-connections";
import { findToken } from "@/lib/get-wallet";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Market } from "@mehranml/openbook";
import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { TradeMarketModal } from "@/components/modals";
import { FillType, SelectedMarketType } from "@/types/market";
import Header from "./Header";
import Sidebar from "./Sidebar";
import OrderBook from "./OrderBook";
import { useTradeModal } from "@/lib/stores/trade.store";
import Chart from "./Chart";
import useWalletBalance from "@/hooks/useWalletBalance";
import Orders from "./Order";
import { Order } from "@openbook-dex/openbook/lib/market";
import { getTokenAccounts, placeOrder, useTrade } from "@/applications/Trade";

import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";
import { MARKETS } from "@openbook-dex/openbook";
import TradeProvider from "@/applications/Trade/Provider";
import { noop } from "lodash";
import Balance from "./Balance";

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

const TradeChart = ({ isEXTRASMALL }: Props) => {
  const {
    marketDetails,
    newOrder,
    orders,
    fills,
    bids,
    asks,
    market,
    tokens,
    availableSide,
  } = useTrade();
  return (
    <TradeProvider>
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
                onCancelOrder={noop}
                isEXTRASMALL={isEXTRASMALL}
              />
              <Balance data={orders} isEXTRASMALL={isEXTRASMALL} />
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 xl:col-span-3">
            <Sidebar
              setForm={useTrade.getState().setNewOrder}
              handlePlaceOrder={noop}
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

        <TradeMarketModal markets={MARKETS} />
      </div>
    </TradeProvider>
  );
};

export default TradeChart;
