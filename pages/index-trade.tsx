import type { NextPage } from "next";
import { useState, useRef, useCallback, useEffect } from "react";
import TradeTokenListWindow from "../components/trade-token-list-window";
import PortalPopup from "../components/portal-popup";
import MarketAdd from "../components/market-add";
import styles from "./index-trade.module.css";
import Header from "../components/header";
import { Market, MARKETS } from "@openbook-dex/openbook";
import { useWallet } from "@solana/wallet-adapter-react";
import { connection } from "../utils/get-connection";
import {
  findToken,
  getTokenBalanceFromWallet,
} from "../components/dashboard/walletBalance";
import { PublicKey } from "@metaplex-foundation/js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const IndexTrade: NextPage = () => {
  const [isTradeTokenListWindowPopupOpen, setTradeTokenListWindowPopupOpen] =
    useState(false);
  const [isMarketAddPopupOpen, setMarketAddPopupOpen] = useState(false);

  const openTradeTokenListWindowPopup = useCallback(() => {
    setTradeTokenListWindowPopupOpen(true);
  }, []);

  const closeTradeTokenListWindowPopup = useCallback(() => {
    setTradeTokenListWindowPopupOpen(false);
  }, []);

  const openMarketAddPopup = useCallback(() => {
    setMarketAddPopupOpen(true);
  }, []);

  const closeMarketAddPopup = useCallback(() => {
    setMarketAddPopupOpen(false);
  }, []);
  const [orders, setOrders] = useState([]);
  const [amount, setAmount] = useState();
  const [limitPrice, setLimitPrice] = useState();
  const [market, setMarket] = useState();
  const [asks, setAsks] = useState([]);
  const [bids, setBids] = useState([]);
  const [side, setSide] = useState("buy");
  const [selectedMarket, setSelectedMarket] = useState(MARKETS[0]);
  const [tokenBalance, setTokenBalance] = useState();
  const { publicKey, wallet } = useWallet();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    MARKETS.forEach(async (item) => {
      item.tokenA = await findToken(item.name.split("/")[0]);
      item.tokenB = await findToken(item.name.split("/")[1]);
      setSelectedMarket(MARKETS[0]);
    });
  }, []);

  const fetchOrders = async () => {
    const orders = await market.loadOrdersForOwner(connection, publicKey);
    console.log(orders);
    setOrders(orders);
  };

  useEffect(() => {
    (async () => {
      let market = await Market.load(
        connection,
        new PublicKey(selectedMarket.address),
        {},
        new PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX")
      );
      // Fetching orderbooks
      let bids = await market.loadBids(connection);
      let asks = await market.loadAsks(connection);
      let returnAsks = [],
        returnBids = [];
      for (let order of asks) {
        if (returnAsks.length !== 12)
          returnAsks.push({
            price: order.price,
            size: order.size,
            side: order.side,
          });
      }
      for (let order of bids) {
        if (returnBids.length !== 12)
          returnBids.push({
            price: order.price,
            size: order.size,
            side: order.side,
          });
      }
      const fills = await market.loadFills(connection);
      console.log(fills);
      setAsks(returnAsks);
      setBids(returnBids);
      setMarket(market);
      setLoading(false);
    })();
  }, [selectedMarket]);
  const fetchTokenBalance = async () => {
    let balance = 0;
    const walletBalance = await getTokenBalanceFromWallet(publicKey);
    if (selectedMarket.tokenB.symbol !== "SOL") {
      const tokenB = walletBalance.find(
        (item) =>
          item.account.data.parsed.info.mint === selectedMarket.tokenB.address
      );
      selectedMarket.tokenB.balance =
        tokenB?.account?.data?.parsed?.info?.tokenAmount?.uiAmount || 0;
    } else {
      selectedMarket.tokenB.balance =
        (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL;
    }
    if (selectedMarket.tokenA.symbol !== "SOL") {
      const tokenA = walletBalance.find(
        (item) =>
          item.account.data.parsed.info.mint === selectedMarket.tokenA.address
      );
      selectedMarket.tokenA.balance =
        tokenA?.account?.data?.parsed?.info?.tokenAmount?.uiAmount || 0;
    } else {
      selectedMarket.tokenA.balance =
        (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL;
    }
    if (side === "buy") balance = selectedMarket.tokenB.balance;
    else balance = selectedMarket.tokenA.balance;
    setTokenBalance(balance);
  };
  useEffect(() => {
    if (publicKey && !loading) {
      fetchTokenBalance();
      fetchOrders();
    }
  }, [publicKey]);
  const handlePlaceOrder = async () => {};
  return (
    <>
      <div className={styles.indextrade}>
        <div className={styles.lamp} />
        <div className={styles.tradePanel}>
          <div className={styles.listPanel}>
            <div className={styles.lamp1} />
            <button
              className={styles.createPositionButton}
              onClick={handlePlaceOrder}
            >
              <div className={styles.placeOrder}>Place Order</div>
            </button>
            <div className={styles.limitPriceParent}>
              <div className={styles.limitPrice}>Limit Price</div>
              <input
                className={styles.frameChild}
                type="number"
                required
                value={limitPrice}
              />
            </div>
            <div className={styles.amountParent}>
              <div className={styles.limitPrice}>Amount</div>
              <input
                className={styles.frameItem}
                type="number"
                required
                value={amount}
              />
            </div>
            <div className={styles.totalParent}>
              <div className={styles.limitPrice}>Total</div>
              <input
                className={styles.frameItem}
                type="number"
                disabled
                readOnly
                value={limitPrice * amount}
              />
            </div>
            <div className={styles.usdcBalance0}>
              {side === "buy"
                ? selectedMarket?.tokenB?.symbol
                : selectedMarket?.tokenA?.symbol}{" "}
              Balance: {tokenBalance?.toFixed(4) || 0}
            </div>
            <button
              className={styles.transferDomainButton}
              onClick={() => {
                setAmount(tokenBalance * 0.25);
              }}
            >
              <div className={styles.transfer}>%25</div>
            </button>
            <button
              className={styles.transferDomainButton1}
              onClick={() => {
                setAmount(tokenBalance * 0.5);
              }}
            >
              <div className={styles.transfer}>%50</div>
            </button>
            <button
              className={styles.transferDomainButton2}
              onClick={() => {
                setAmount(tokenBalance * 0.75);
              }}
            >
              <div className={styles.transfer}>%75</div>
            </button>
            <button
              className={styles.transferDomainButton3}
              onClick={() => {
                setAmount(tokenBalance);
              }}
            >
              <div className={styles.transfer}>%100</div>
            </button>
            <div className={styles.limitOrder}>Limit Order</div>
            <div className={styles.rectangleParent}>
              <div className={styles.instanceChild} />
              <div
                className={`${styles.buy} ${
                  side === "buy" ? styles.activeSide : ""
                }`}
                onClick={() => setSide("buy")}
              >
                Buy
              </div>
              <div
                onClick={() => setSide("sell")}
                className={`${styles.sell} ${
                  side === "sell" ? styles.activeSide : ""
                }`}
              >
                Sell
              </div>
              <div className={styles.instanceItem} />
            </div>
          </div>
          <div className={styles.chart}>
            <div className={styles.lamp2} />
            <div className={styles.chart1}>Chart</div>
            <div className={styles.rectangleGroup}>
              <div className={styles.instanceInner} />
              <div className={styles.hParent}>
                <div className={styles.h}>1H</div>
                <div className={styles.d}>{`12H `}</div>
                <div className={styles.d}>1D</div>
                <div className={styles.d}>7D</div>
                <div className={styles.d}>1M</div>
              </div>
              <div className={styles.rectangleDiv} />
            </div>
            <div className={styles.grid}>
              <div className={styles.y}>
                <div className={styles.yAxis}>
                  <div className={styles.div}>0</div>
                  <img className={styles.lineIcon} alt="" src="/line.svg" />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.div}>0</div>
                  <img className={styles.lineIcon} alt="" src="/line1.svg" />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.div}>0</div>
                  <img className={styles.lineIcon} alt="" src="/line2.svg" />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.div}>0</div>
                  <img className={styles.lineIcon} alt="" src="/line.svg" />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.div}>0</div>
                  <img className={styles.lineIcon} alt="" src="/line1.svg" />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.div}>0</div>
                  <img className={styles.lineIcon} alt="" src="/line2.svg" />
                </div>
                <div className={styles.yAxis0}>
                  <div className={styles.div}>0</div>
                  <div className={styles.line}>
                    <div className={styles.lineChild} />
                  </div>
                </div>
              </div>
              <div className={styles.x}>
                <div className={styles.xAxis0}>
                  <div className={styles.text}>April</div>
                  <div className={styles.line1}>
                    <div className={styles.lineItem} />
                  </div>
                  <div className={styles.xAxis0Child} />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text1}>May</div>
                  <div className={styles.line2}>
                    <div className={styles.lineInner} />
                  </div>
                  <div className={styles.xAxisChild} />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text2}>Jun</div>
                  <div className={styles.line2}>
                    <div className={styles.lineInner} />
                  </div>
                  <div className={styles.xAxisChild} />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text3}>Jul</div>
                  <div className={styles.line2}>
                    <div className={styles.lineInner} />
                  </div>
                  <div className={styles.xAxisChild} />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text4}>Agu</div>
                  <div className={styles.line2}>
                    <div className={styles.lineInner} />
                  </div>
                  <div className={styles.xAxisChild} />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text4}>Sep</div>
                  <div className={styles.line2}>
                    <div className={styles.lineInner} />
                  </div>
                  <div className={styles.xAxisChild} />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text2}>Oct</div>
                  <div className={styles.line2}>
                    <div className={styles.lineInner} />
                  </div>
                  <div className={styles.xAxisChild} />
                </div>
              </div>
              <div className={styles.x1}>
                <div className={styles.xAxis0}>
                  <div className={styles.text7}>TEXT</div>
                  <div className={styles.line1}>
                    <div className={styles.lineItem} />
                  </div>
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text8}>TEXT</div>
                  <img className={styles.lineIcon6} alt="" src="/line3.svg" />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text8}>TEXT</div>
                  <img className={styles.lineIcon6} alt="" src="/line4.svg" />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text8}>TEXT</div>
                  <img className={styles.lineIcon6} alt="" src="/line3.svg" />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text8}>TEXT</div>
                  <img className={styles.lineIcon6} alt="" src="/line4.svg" />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text8}>TEXT</div>
                  <img className={styles.lineIcon6} alt="" src="/line3.svg" />
                </div>
                <div className={styles.yAxis}>
                  <div className={styles.text8}>TEXT</div>
                  <img className={styles.lineIcon6} alt="" src="/line4.svg" />
                </div>
              </div>
              <img className={styles.chart9Icon} alt="" src="/chart-9.svg" />
              <div className={styles.hover}>
                <img
                  className={styles.hoverLineIcon}
                  alt=""
                  src="/hover-line.svg"
                />
                <div className={styles.hoverTips}>
                  <div className={styles.text14}>KO5</div>
                  <div className={styles.div7}>
                    <div className={styles.legendinfo}>
                      <div className={styles.wrapper}>
                        <div className={styles.div8} />
                      </div>
                      <div className={styles.legend1}>SOL/USDC</div>
                    </div>
                    <div className={styles.div9}>30</div>
                  </div>
                  <div className={styles.div7}>
                    <div className={styles.legendinfo}>
                      <div className={styles.wrapper}>
                        <div className={styles.div11} />
                      </div>
                      <div className={styles.legend1}>SOL/USD</div>
                    </div>
                    <div className={styles.div9}>$13</div>
                  </div>
                  <div className={styles.div7}>
                    <div className={styles.legendinfo}>
                      <div className={styles.wrapper}>
                        <div className={styles.div14} />
                      </div>
                      <div className={styles.legend1}>USDC/USD</div>
                    </div>
                    <div className={styles.div9}>$15</div>
                  </div>
                  <div className={styles.div16}>
                    <div className={styles.legendinfo}>
                      <div className={styles.wrapper}>
                        <div className={styles.div17} />
                      </div>
                      <div className={styles.legend1}>legend4</div>
                    </div>
                    <div className={styles.div9}>15</div>
                  </div>
                </div>
              </div>
            </div>
            <button className={styles.transferDomainButton4}>
              <div className={styles.transfer4}>SOL/USDC</div>
            </button>
            <button className={styles.transferDomainButton5}>
              <div className={styles.transfer4}>SOL/USDC</div>
            </button>
            <button className={styles.transferDomainButton6}>
              <div className={styles.transfer4}>SOL/USDC</div>
            </button>
          </div>
          <div className={styles.blance}>
            <div className={styles.lamp3} />
            <div className={styles.frameParent}>
              <div className={styles.dxeParent}>
                <div className={styles.dxe}>
                  {selectedMarket.tokenA?.symbol}
                </div>
                <div className={styles.usdc}>
                  {selectedMarket.tokenB?.symbol}
                </div>
                <div className={styles.lineDiv} />
              </div>
              <div className={styles.walletParent}>
                <div className={styles.wallet}>Wallet</div>
                <div className={styles.dxe}>
                  {selectedMarket.tokenA?.balance}
                </div>
              </div>
              <div className={styles.dexParent}>
                <div className={styles.wallet}>DEX</div>
                <div className={styles.dxe}>100,000.00</div>
              </div>
              <div className={styles.div21}>
                {selectedMarket.tokenB?.balance}
              </div>
              <div className={styles.div22}>100,000.00</div>
              <button className={styles.createPositionButton1}>
                <div className={styles.settle}>{`Settle `}</div>
              </button>
              <button className={styles.createPositionButton2}>
                <div className={styles.settle}>{`Settle `}</div>
              </button>
            </div>
            <div className={styles.blance1}>Blance</div>
            <button className={styles.createPositionButton3}>
              <div className={styles.settle}>Settle All</div>
            </button>
          </div>
          <div className={styles.orders}>
            <div className={styles.lamp4} />
            <div className={styles.frameGroup}>
              <div className={styles.marketParent}>
                <div className={styles.wallet}>Market</div>
                <div className={styles.side}>side</div>
                <div className={styles.size}>size</div>
                <div className={styles.price}>Price</div>
                <div className={styles.frameChild1} />
              </div>
              {orders.map((item, index) => {
                return (
                  <div className={styles.dxeusdcParent}>
                    <div className={styles.wallet}>DXE/USDC</div>
                    <div className={styles.side}>Buy</div>
                    <div className={styles.size}>100,000.00</div>
                    <div className={styles.price}>100,000.00</div>
                    <button className={styles.createPositionButton4}>
                      <div className={styles.settle}>Cancel</div>
                    </button>
                  </div>
                );
              })}
            </div>
            <div className={styles.orders1}>Orders</div>
            <div className={styles.component4}>
              <div className={styles.component4Child} />
              <div className={styles.allParent}>
                <div className={styles.all}>ALL</div>
                <div className={styles.d}>{`Buy `}</div>
                <div className={styles.d}>Sell</div>
              </div>
              <div className={styles.component4Item} />
            </div>
            <button className={styles.createPositionButton9}>
              <div className={styles.settle}>Cancel All</div>
            </button>
          </div>
          <div className={styles.orderBook}>
            <div className={styles.lamp1} />
            <div className={styles.frameContainer}>
              <div className={styles.sizeParent}>
                <div className={styles.size1}>Size</div>
                <div className={styles.price1}>Price</div>
              </div>
              {bids.map((item, index) => {
                if (index < 6)
                  return (
                    <div
                      className={styles.parent4}
                      onClick={() => {
                        setAmount(item.size);
                        setLimitPrice(item.price);
                      }}
                    >
                      <div className={styles.div33}>{item.size}</div>
                      <div className={styles.div34}>{item.price}</div>
                    </div>
                  );
              })}
              <img className={styles.frameChild2} alt="" src="/line-5.svg" />
              <div className={styles.asksWraper}></div>
              {asks.map((item, index) => {
                if (index < 6)
                  return (
                    <div
                      className={styles.parent5}
                      onClick={() => {
                        setAmount(item.size);
                        setLimitPrice(item.price);
                      }}
                    >
                      <div className={styles.div33}>{item.size}</div>
                      <div className={styles.div34}>{item.price}</div>
                    </div>
                  );
              })}
            </div>
            <div className={styles.orderBook1}>Order Book</div>
            <div className={styles.component41}>
              <div className={styles.component4Child} />
              <div className={styles.allParent}>
                <div className={styles.all}>ALL</div>
                <div className={styles.d}>{`Buy `}</div>
                <div className={styles.d}>Sell</div>
              </div>
              <div className={styles.component4Item} />
            </div>
          </div>
          <div className={styles.market1}>
            <div className={styles.lamp6} />
            <button
              className={styles.vectorParent}
              onClick={openTradeTokenListWindowPopup}
            >
              <img className={styles.vectorIcon} alt="" src="/vector1.svg" />
              <div className={styles.selectMarket}>{selectedMarket.name}</div>
            </button>
            <div className={styles.dxeusdc5}>{selectedMarket?.name}</div>
            <div className={styles.totalVolume}>Total Volume</div>
            <div className={styles.lastOrder}>Last Order</div>
            <div className={styles.lastOrder1}>Last Order</div>
            <div className={styles.div57}>$ 100,000,000.00</div>
            <div className={styles.div58}>{`$ 1.000  `}</div>
            <img
              className={styles.usdCoinUsdcLogo2Icon}
              alt=""
              src={selectedMarket.tokenA?.logoURI}
            />
            <button
              className={styles.circlePlusSolid1}
              onClick={openMarketAddPopup}
            >
              <img className={styles.vectorIcon1} alt="" src="/vector10.svg" />
            </button>
            <img
              className={styles.arrowUpSolid1Icon}
              alt=""
              src="/arrowupsolid-1.svg"
            />
            <img
              className={styles.sitelogoCopy1}
              alt=""
              src={selectedMarket.tokenB?.logoURI}
            />
            <div className={styles.market2}>Market</div>
          </div>
        </div>
        <Header page={"trade"} />
        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.utc}>V1.0.1</p>
          <p className={styles.utc}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isTradeTokenListWindowPopupOpen && (
        <PortalPopup
          overlayColor="rgba(13, 17, 27, 0.7)"
          placement="Centered"
          onOutsideClick={closeTradeTokenListWindowPopup}
        >
          <TradeTokenListWindow
            onClose={closeTradeTokenListWindowPopup}
            markets={MARKETS}
            setSelectedMarket={setSelectedMarket}
          />
        </PortalPopup>
      )}
      {isMarketAddPopupOpen && (
        <PortalPopup
          overlayColor="rgba(20, 32, 48, 0.7)"
          placement="Centered"
          onOutsideClick={closeMarketAddPopup}
        >
          <MarketAdd onClose={closeMarketAddPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default IndexTrade;
