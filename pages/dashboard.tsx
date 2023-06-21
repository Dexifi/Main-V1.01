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
import GetFarm from "../components/dashboard/farm";
import GetTrade from "../components/dashboard/trade";

const Dashboard: NextPage = () => {
  const [isTransferDomainPopupOpen, setTransferDomainPopupOpen] =
    useState(false);
  const [walletBalance, setWalletBalance] = useState(false);
  const router = useRouter();

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
      <Header page={"dashboard"} />
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
            {/* <WalletBalance
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
            /> */}
            {/* <GetStake /> */}
            {/* <GetLend /> */}
            {/* <GetTrade /> */}
            <GetLiquidity />
            {/* <GetFarm /> */}
            {/* <GetNFT /> */}
          </div>
        </div>
        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.utc}>V1.0.1</p>
          <p className={styles.utc}>2022-04-20 22:00 UTC</p>
        </div>
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
