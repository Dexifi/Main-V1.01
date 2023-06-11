import type { NextPage } from "next";
import { useState, useRef, useCallback } from "react";
import Managenftpopup from "../components/managenftpopup";
import PortalPopup from "../components/portal-popup";
import TransferDomainPopup from "../components/transfer-domain-popup";
import { useRouter } from "next/router";
import styles from "./dashboard.module.css";
import Header from "../components/header";
import { WalletBalance } from "../components/dashboard/walletBalance";
import GetStake from "../components/dashboard/stake";
import GetLend from "../components/dashboard/lending";
import GetLiquidity from "../components/dashboard/liquidity";
import GetNFT from "../components/dashboard/nft";

const Dashboard: NextPage = () => {
  const [isTransferDomainPopupOpen, setTransferDomainPopupOpen] =
    useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const router = useRouter();

  const openTransferDomainPopup = useCallback(() => {
    setTransferDomainPopupOpen(true);
  }, []);

  const closeTransferDomainPopup = useCallback(() => {
    setTransferDomainPopupOpen(false);
  }, []);

  const onNFTGalleryClick = useCallback(() => {
    router.push("/index-n-f-t-gallery");
  }, [router]);

  const onAccountsClick = useCallback(() => {
    router.push("/index-accounts");
  }, [router]);

  const onTransactionsClick = useCallback(() => {
    router.push("/index-transaction");
  }, [router]);

  const onRectangle14Click = useCallback(() => {
    router.push("/index-n-f-t-gallery");
  }, [router]);

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.lamp} />
        <div className={styles.walletOverviewWrapper}>
          <div className={styles.walletOverview}>
            <div className={styles.dashboardPageSwitcher}>
              <div className={styles.dashboardPageSwitcherChild} />
              <button className={styles.nftGallery} onClick={onNFTGalleryClick}>
                NFT Gallery
              </button>
              <button className={styles.accounts} onClick={onAccountsClick}>
                Accounts
              </button>
              <button
                className={styles.transactions}
                onClick={onTransactionsClick}
              >
                Transactions
              </button>
              <div
                className={styles.dashboardPageSwitcherItem}
                onClick={onRectangle14Click}
              />
            </div>
            <div className={styles.walletNetwortPanel}>
              <div className={styles.groupParent}>
                <div className={styles.rectangleParent}>
                  <div className={styles.groupChild} />
                  <div className={styles.groupItem} />
                  <div className={styles.groupInner} />
                  <div className={styles.ellipseDiv} />
                </div>
                <div className={styles.headParent1}>
                  <div className={styles.head4}>
                    <div className={styles.value5}>Value</div>
                    <div className={styles.pendingValue}>Pending Value</div>
                    <div className={styles.valuenetworth1}>
                      Value/NetWorth %
                    </div>
                    <div className={styles.headChild2} />
                  </div>
                  <div className={styles.staking}>
                    <div className={styles.walletBalanceContainer1}>
                      <span>{`Wallet Balance `}</span>
                      <span className={styles.span15}>*</span>
                    </div>
                    <div className={styles.div56}>$ 25,000.00</div>
                    <div className={styles.div57}>{`$ 0.00 `}</div>
                    <div className={styles.div58}>25.00 %</div>
                    <div className={styles.walletBalanceChild} />
                  </div>
                  <div className={styles.staking}>
                    <div className={styles.walletBalanceContainer1}>
                      <span>Staking</span>
                      <span className={styles.span}>{` `}</span>
                      <span className={styles.inRange}>*</span>
                    </div>
                    <div className={styles.div56}>$ 12,500.00</div>
                    <div className={styles.div57}>$ 150.0</div>
                    <div className={styles.walletBalanceChild} />
                    <div className={styles.div61}>12.50%</div>
                  </div>
                  <div className={styles.staking}>
                    <div className={styles.walletBalanceContainer1}>
                      <span>Lending</span>
                      <span className={styles.span}>{` `}</span>
                      <span className={styles.span11}>*</span>
                    </div>
                    <div className={styles.div56}>$ 12,500.00</div>
                    <div className={styles.div61}>12.50 %</div>
                    <div className={styles.div57}>{`$ 0.00 `}</div>
                    <div className={styles.walletBalanceChild} />
                  </div>
                  <div className={styles.staking}>
                    <div className={styles.walletBalanceContainer1}>
                      <span>Trading</span>
                      <span className={styles.span}>{` `}</span>
                      <span className={styles.span9}>*</span>
                    </div>
                    <div className={styles.div56}>$ 12,500.00</div>
                    <div className={styles.div57}>{`$ 0.00 `}</div>
                    <div className={styles.walletBalanceChild} />
                    <div className={styles.div61}>12.50 %</div>
                  </div>
                  <div className={styles.staking}>
                    <div className={styles.walletBalanceContainer1}>
                      <span>Liquidity</span>
                      <span className={styles.span}>{` `}</span>
                      <span className={styles.span6}>*</span>
                    </div>
                    <div className={styles.div56}>$ 12,500.00</div>
                    <div className={styles.div57}>{`$ 0.00 `}</div>
                    <div className={styles.walletBalanceChild} />
                    <div className={styles.div61}>12.50 %</div>
                  </div>
                  <div className={styles.staking}>
                    <div className={styles.walletBalanceContainer1}>
                      <span>Farm</span>
                      <span className={styles.span}>{` `}</span>
                      <span className={styles.span4}>*</span>
                    </div>
                    <div className={styles.div56}>$ 0.00</div>
                    <div className={styles.div57}>{`$ 0.00 `}</div>
                    <div className={styles.div61}>2.00 %</div>
                    <div className={styles.walletBalanceChild} />
                  </div>
                  <div className={styles.staking}>
                    <div className={styles.walletBalanceContainer1}>
                      <span>NFT</span>
                      <span className={styles.span}>{` `}</span>
                      <span className={styles.span1}>*</span>
                    </div>
                    <div className={styles.div56}>$ 25,000.00</div>
                    <div className={styles.div61}>10.50 %</div>
                    <div className={styles.div57}>{`$ 0.00 `}</div>
                    <div className={styles.walletBalanceChild} />
                  </div>
                  <div className={styles.staking}>
                    <div className={styles.div57}>{`$ 0.00 `}</div>
                    <div className={styles.div61}>100 %</div>
                  </div>
                </div>
              </div>
              <div className={styles.netWorth7}>
                <div className={styles.netWorthContainer}>
                  <span>{`Net Worth   `}</span>
                  <span className={styles.span30}>$ 100,000.00</span>
                </div>
              </div>
            </div>
            <div className={styles.pieChartPanel}>
              <div className={styles.hoverTips}>
                <div className={styles.hoverTipsChild} />
                <div className={styles.div32}>
                  <div className={styles.legendinfo}>
                    <div className={styles.container}>
                      <div className={styles.div33} />
                    </div>
                    <div className={styles.legend1}>Wallet Balance</div>
                  </div>
                  <div className={styles.div34}>25%</div>
                </div>
                <div className={styles.hoverTips1}>
                  <div className={styles.div35}>
                    <div className={styles.legendinfo}>
                      <div className={styles.container}>
                        <div className={styles.div36} />
                      </div>
                      <div className={styles.legend1}>{`Staking `}</div>
                    </div>
                    <div className={styles.div37}>20%</div>
                  </div>
                  <div className={styles.div38}>
                    <div className={styles.legendinfo}>
                      <div className={styles.container}>
                        <div className={styles.div36} />
                      </div>
                      <div className={styles.legend1}>{`Staking `}</div>
                    </div>
                    <div className={styles.div40}>25%</div>
                  </div>
                  <div className={styles.div35}>
                    <div className={styles.legendinfo}>
                      <div className={styles.container}>
                        <div className={styles.div42} />
                      </div>
                      <div
                        className={styles.legend1}
                      >{`Lending                 `}</div>
                    </div>
                    <div className={styles.div34}>10%</div>
                  </div>
                  <div className={styles.div32}>
                    <div className={styles.legendinfo}>
                      <div className={styles.container}>
                        <div className={styles.div45} />
                      </div>
                      <div className={styles.legend1}>Trading</div>
                    </div>
                    <div className={styles.div46}>10%</div>
                  </div>
                  <div className={styles.div32}>
                    <div className={styles.legendinfo}>
                      <div className={styles.container}>
                        <div className={styles.div48} />
                      </div>
                      <div className={styles.legend1}>Liquidity</div>
                    </div>
                    <div className={styles.div46}>10%</div>
                  </div>
                  <div className={styles.div32}>
                    <div className={styles.legendinfo}>
                      <div className={styles.container}>
                        <div className={styles.div51} />
                      </div>
                      <div className={styles.legend1}>Farm</div>
                    </div>
                    <div className={styles.div46}>10%</div>
                  </div>
                  <div className={styles.div32}>
                    <div className={styles.legendinfo}>
                      <div className={styles.container}>
                        <div className={styles.div54} />
                      </div>
                      <div className={styles.legend1}>NFT</div>
                    </div>
                    <div className={styles.div46}>5%</div>
                  </div>
                </div>
              </div>
              <img className={styles.donutIcon} alt="" src="/donut.svg" />
            </div>
            <WalletBalance
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
            />
            <GetStake />
            {/* <GetLend /> */}
            <div className={styles.marginTradingBalance}>
              <div className={styles.frameParent}>
                <div className={styles.sizeParent}>
                  <div className={styles.size}>Size</div>
                  <div className={styles.market}>Market</div>
                  <div className={styles.type1}>Type</div>
                  <div className={styles.entryIndex}>Entry / Index</div>
                  <div className={styles.driftParent}>
                    <div className={styles.drift}>{`Drift `}</div>
                    <img
                      className={styles.adcc1db02d660497f9957eDriftFIcon}
                      alt=""
                      src="/63adcc1db02d660497f9957e-drift-full-logo-whitep500-copy-2@2x.png"
                    />
                    <div className={styles.frameItem} />
                  </div>
                  <div className={styles.frameInner} />
                </div>
                <div className={styles.frameWrapper}>
                  <div className={styles.positionParent}>
                    <div className={styles.usturCssTier}>Position</div>
                    <div className={styles.solPerp}>SOL-PERP</div>
                    <img
                      className={styles.adcc1db02d660497f9957eDriftFIcon1}
                      alt=""
                      src="/63adcc1db02d660497f9957e-drift-full-logo-whitep500-copy-2@2x.png"
                    />
                    <div className={styles.div14}>$ 22.653</div>
                    <div className={styles.div15}>$ 22.753</div>
                    <img
                      className={styles.solanaCopy22}
                      alt=""
                      src="/solana-copy-2@2x.png"
                    />
                    <div className={styles.sol}>0.90 SOL</div>
                    <div className={styles.div16}>$ 20.45</div>
                    <div className={styles.liqPrice}>Liq Price :</div>
                    <div className={styles.div17}>% 10.81</div>
                    <div className={styles.pl}>{`P&L :`}</div>
                    <div className={styles.wrapper}>
                      <div className={styles.div18}>$ 0.08 (+0.01%)</div>
                    </div>
                    <div className={styles.longParent}>
                      <div className={styles.long}>Long</div>
                      <div className={styles.x22}>X2.2</div>
                    </div>
                    <div className={styles.lineDiv} />
                  </div>
                </div>
                <div className={styles.balanceParent}>
                  <div className={styles.drift}>Balance :</div>
                  <div className={styles.usdc}>$ 111.23 USDC</div>
                </div>
              </div>
              <div className={styles.netWorth3}>
                <div className={styles.tradingContainer}>
                  <span>Trading</span>
                  <span className={styles.span}>{` `}</span>
                  <span className={styles.span9}>{`*  `}</span>
                  <span>$ 12,500.00</span>
                </div>
              </div>
            </div>
            <GetLiquidity />
            <GetNFT />
          </div>
        </div>
        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.utc}>V1.0.1</p>
          <p className={styles.utc}>2022-04-20 22:00 UTC</p>
        </div>
        <Header page={"dashboard"} />
      </div>

      {isTransferDomainPopupOpen && (
        <PortalPopup
          overlayColor="rgba(19, 35, 45, 0.7)"
          placement="Centered"
          onOutsideClick={closeTransferDomainPopup}
        >
          <TransferDomainPopup onClose={closeTransferDomainPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default Dashboard;
