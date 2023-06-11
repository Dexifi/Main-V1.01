import type { NextPage } from "next";
import { useState, useRef, useCallback } from "react";
import TradeTokenListWindow from "../components/trade-token-list-window";
import PortalPopup from "../components/portal-popup";
import MarketAdd from "../components/market-add";
import WalletSetting from "../components/wallet-setting";
import DisconnectSetting from "../components/disconnect-setting";
import { useRouter } from "next/router";
import styles from "./index-trade.module.css";
const IndexTrade: NextPage = () => {
  const [isTradeTokenListWindowPopupOpen, setTradeTokenListWindowPopupOpen] =
    useState(false);
  const [isMarketAddPopupOpen, setMarketAddPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton2Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);
  const router = useRouter();

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

  const openWalletSettingPopup = useCallback(() => {
    setWalletSettingPopupOpen(true);
  }, []);

  const closeWalletSettingPopup = useCallback(() => {
    setWalletSettingPopupOpen(false);
  }, []);

  const openDisconnectSettingPopup = useCallback(() => {
    setDisconnectSettingPopupOpen(true);
  }, []);

  const closeDisconnectSettingPopup = useCallback(() => {
    setDisconnectSettingPopupOpen(false);
  }, []);

  const onSwapClick = useCallback(() => {
    router.push("/index-swap");
  }, [router]);

  const onLendClick = useCallback(() => {
    router.push("/index-lend");
  }, [router]);

  const onTradeClick = useCallback(() => {
    router.push("/index-trade");
  }, [router]);

  const onYieldClick = useCallback(() => {
    router.push("/index-liquidity");
  }, [router]);

  const onFarmClick = useCallback(() => {
    router.push("/index-farm");
  }, [router]);

  const onStakeClick = useCallback(() => {
    router.push("/index-stake");
  }, [router]);

  const onDashbordClick = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const onStake1Click = useCallback(() => {
    window.open("nft.dexifi.io");
  }, []);

  const onDAOClick = useCallback(() => {
    router.push("/index-i-d-o");
  }, [router]);

  const onDEXIFILOGOImageClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <>
      <div className={styles.indextrade}>
        <div className={styles.lamp} />
        <div className={styles.tradePanel}>
          <div className={styles.listPanel}>
            <div className={styles.lamp1} />
            <button className={styles.createPositionButton}>
              <div className={styles.placeOrder}>Place Order</div>
            </button>
            <div className={styles.limitPriceParent}>
              <div className={styles.limitPrice}>Limit Price</div>
              <input className={styles.frameChild} type="number" required />
            </div>
            <div className={styles.amountParent}>
              <div className={styles.limitPrice}>Amount</div>
              <input className={styles.frameItem} type="number" required />
            </div>
            <div className={styles.totalParent}>
              <div className={styles.limitPrice}>Total</div>
              <input
                className={styles.frameItem}
                type="number"
                disabled
                readOnly
              />
            </div>
            <div className={styles.usdcBalance0}>USDC Balance: 0</div>
            <button className={styles.transferDomainButton}>
              <div className={styles.transfer}>%25</div>
            </button>
            <button className={styles.transferDomainButton1}>
              <div className={styles.transfer}>%50</div>
            </button>
            <button className={styles.transferDomainButton2}>
              <div className={styles.transfer}>%75</div>
            </button>
            <button className={styles.transferDomainButton3}>
              <div className={styles.transfer}>%100</div>
            </button>
            <div className={styles.limitOrder}>Limit Order</div>
            <div className={styles.rectangleParent}>
              <div className={styles.instanceChild} />
              <div className={styles.buy}>{`Buy `}</div>
              <div className={styles.sell}>Sell</div>
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
                <div className={styles.dxe}>DXE</div>
                <div className={styles.usdc}>USDC</div>
                <div className={styles.lineDiv} />
              </div>
              <div className={styles.walletParent}>
                <div className={styles.wallet}>Wallet</div>
                <div className={styles.dxe}>100,000.00</div>
              </div>
              <div className={styles.dexParent}>
                <div className={styles.wallet}>DEX</div>
                <div className={styles.dxe}>100,000.00</div>
              </div>
              <div className={styles.div21}>100,000.00</div>
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
              <div className={styles.dxeusdcParent}>
                <div className={styles.wallet}>DXE/USDC</div>
                <div className={styles.side}>Buy</div>
                <div className={styles.size}>100,000.00</div>
                <div className={styles.price}>100,000.00</div>
                <button className={styles.createPositionButton4}>
                  <div className={styles.settle}>Cancel</div>
                </button>
              </div>
              <div className={styles.dxeusdcGroup}>
                <div className={styles.wallet}>DXE/USDC</div>
                <div className={styles.side}>Buy</div>
                <div className={styles.size}>100,000.00</div>
                <div className={styles.price}>100,000.00</div>
                <button className={styles.createPositionButton4}>
                  <div className={styles.settle}>Cancel</div>
                </button>
              </div>
              <div className={styles.dxeusdcContainer}>
                <div className={styles.wallet}>DXE/USDC</div>
                <div className={styles.side}>Buy</div>
                <div className={styles.size}>100,000.00</div>
                <div className={styles.price}>100,000.00</div>
                <button className={styles.createPositionButton4}>
                  <div className={styles.settle}>Cancel</div>
                </button>
              </div>
              <div className={styles.dxeusdcParent1}>
                <div className={styles.wallet}>DXE/USDC</div>
                <div className={styles.side}>Buy</div>
                <div className={styles.size}>100,000.00</div>
                <div className={styles.price}>100,000.00</div>
                <button className={styles.createPositionButton4}>
                  <div className={styles.settle}>Cancel</div>
                </button>
              </div>
              <div className={styles.dxeusdcParent2}>
                <div className={styles.wallet}>DXE/USDC</div>
                <div className={styles.side}>Buy</div>
                <div className={styles.size}>100,000.00</div>
                <div className={styles.price}>100,000.00</div>
                <button className={styles.createPositionButton4}>
                  <div className={styles.settle}>Cancel</div>
                </button>
              </div>
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
              <div className={styles.parent}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
              <div className={styles.group}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
              <div className={styles.parent1}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
              <div className={styles.parent2}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
              <div className={styles.parent3}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
              <div className={styles.parent4}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
              <img className={styles.frameChild2} alt="" src="/line-5.svg" />
              <div className={styles.parent5}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
              <div className={styles.parent6}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
              <div className={styles.parent7}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
              <div className={styles.parent8}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
              <div className={styles.parent9}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
              <div className={styles.parent10}>
                <div className={styles.div33}>100,000,000.000</div>
                <div className={styles.div34}>1,000.00</div>
              </div>
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
              <div className={styles.selectMarket}>Select Market</div>
            </button>
            <div className={styles.dxeusdc5}>DXE/USDC</div>
            <div className={styles.totalVolume}>Total Volume</div>
            <div className={styles.lastOrder}>Last Order</div>
            <div className={styles.lastOrder1}>Last Order</div>
            <div className={styles.div57}>$ 100,000,000.00</div>
            <div className={styles.div58}>{`$ 1.000  `}</div>
            <img
              className={styles.usdCoinUsdcLogo2Icon}
              alt=""
              src="/usdcoinusdclogo-21@2x.png"
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
              src="/sitelogo-copy-1@2x.png"
            />
            <div className={styles.market2}>Market</div>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.lamp7} />
          <div className={styles.swapParent}>
            <a className={styles.swap} onClick={onSwapClick}>
              Swap
            </a>
            <a className={styles.lend} onClick={onLendClick}>
              Lend
            </a>
            <a className={styles.trade} onClick={onTradeClick}>
              Trade
            </a>
            <a className={styles.yield} onClick={onYieldClick}>
              Liquidity
            </a>
            <a className={styles.farm} onClick={onFarmClick}>
              Farm
            </a>
            <a className={styles.stake} onClick={onStakeClick}>
              Stake
            </a>
            <div className={styles.frameChild3} />
            <a className={styles.dashbord} onClick={onDashbordClick}>
              Dashboard
            </a>
            <a className={styles.stake1} onClick={onStake1Click}>
              NFT
            </a>
            <a className={styles.dao} onClick={onDAOClick}>
              IDO
            </a>
          </div>
          <img
            className={styles.dexifiLogoIcon}
            alt=""
            src="/dexifi-logo@2x.png"
            onClick={onDEXIFILOGOImageClick}
          />
          <div className={styles.instanceParent}>
            <button
              className={styles.connectWalletWrapper}
              ref={frameButton1Ref}
              onClick={openWalletSettingPopup}
            >
              <button className={styles.connectWallet}>Connect Wallet</button>
            </button>
            <button
              className={styles.iconSettingsWrapper}
              ref={frameButton2Ref}
              onClick={openDisconnectSettingPopup}
            >
              <button className={styles.iconSettings}>
                <img
                  className={styles.vectorIcon2}
                  alt=""
                  src="/vector15.svg"
                />
                <img
                  className={styles.vectorIcon3}
                  alt=""
                  src="/vector16.svg"
                />
              </button>
            </button>
          </div>
        </div>
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
          <TradeTokenListWindow onClose={closeTradeTokenListWindowPopup} />
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
      {isWalletSettingPopupOpen && (
        <PortalPopup
          overlayColor="rgba(13, 17, 27, 0.7)"
          placement="Top right"
          top={-520}
          relativeLayerRef={frameButton1Ref}
          onOutsideClick={closeWalletSettingPopup}
        >
          <WalletSetting onClose={closeWalletSettingPopup} />
        </PortalPopup>
      )}
      {isDisconnectSettingPopupOpen && (
        <PortalPopup
          overlayColor="rgba(13, 17, 27, 0.7)"
          placement="Top right"
          top={-250}
          relativeLayerRef={frameButton2Ref}
          onOutsideClick={closeDisconnectSettingPopup}
        >
          <DisconnectSetting onClose={closeDisconnectSettingPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default IndexTrade;
