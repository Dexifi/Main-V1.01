import type { NextPage } from 'next';
import { useState, useCallback, useEffect } from 'react';
import LendSupplypopup from '../components/lend-supplypopup';
import PortalPopup from '../components/portal-popup';
import LendBorrowpopup from '../components/lend-borrowpopup';
import LendRepaypopup from '../components/lend-repaypopup';
import LendWithdrawpopup from '../components/lend-withdrawpopup';
import styles from './index-lend.module.css';
import global from './global-classes.module.css';
import { useWallet } from '@solana/wallet-adapter-react';
import Header from '../components/header';
import {
  SolendMarket,
  SolendObligation,
  SolendReserve,
} from '@solendprotocol/solend-sdk';
import { connection } from '../utils/get-connection';
import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';

const IndexLend: NextPage = () => {
  const [isLendSupplypopupOpen, setLendSupplypopupOpen] = useState(false);
  const [isLendBorrowpopupOpen, setLendBorrowpopupOpen] = useState(false);
  const [isLendRepaypopupOpen, setLendRepaypopupOpen] = useState(false);
  const [isLendWithdrawpopupOpen, setLendWithdrawpopupOpen] = useState(false);
  const [selectedLend, setSelectedLend] = useState(null);
  const [marketTVl, setMarketTVl] = useState({} as any);
  const [markets, setMarkets] = useState([] as SolendReserve[]);
  const [loading, setLoading] = useState(true);
  const [pool, setPool] = useState({} as SolendMarket);
  const [user, setUser] = useState({} as SolendObligation);
  const { publicKey } = useWallet();
  const [page, setPage] = useState('main');

  const openLendSupplypopup = useCallback((lend: any) => {
    setLendSupplypopupOpen(true);
    setSelectedLend(lend);
  }, []);

  const closeLendSupplypopup = useCallback(() => {
    setLendSupplypopupOpen(false);
  }, []);

  const openLendBorrowpopup = useCallback((lend: any) => {
    setLendBorrowpopupOpen(true);
    setSelectedLend(lend);
  }, []);

  const closeLendBorrowpopup = useCallback(() => {
    setLendBorrowpopupOpen(false);
  }, []);

  const openLendRepaypopup = useCallback((lend: any) => {
    setLendRepaypopupOpen(true);
    setSelectedLend(lend);
  }, []);

  const closeLendRepaypopup = useCallback(() => {
    setLendRepaypopupOpen(false);
  }, []);

  const openLendWithdrawpopup = useCallback((lend: any) => {
    setLendWithdrawpopupOpen(true);
    setSelectedLend(lend);
  }, []);

  const closeLendWithdrawpopup = useCallback(() => {
    setLendWithdrawpopupOpen(false);
  }, []);

  const fetchMarketData = async () => {
    let marketPubkey =
      page === 'turbo'
        ? new PublicKey('7RCz8wb6WXxUhAigok9ttgrVgDFFFbibcirECzWSBauM')
        : undefined;
    let market = await SolendMarket.initialize(
      connection,
      'production', // optional environment argument
      marketPubkey !== undefined ? marketPubkey.toString() : undefined
    );
    await market.loadAll();
    setPool(market);
    let totalSupplyMarket = 0;
    let totalBorrowMarket = 0;
    await market.reserves.forEach(async (item) => {
      await item.load();
      let WAD = new BN(10).pow(new BN(18));
      if (item?.stats?.decimals === undefined) {
        return;
      }
      let TokenDecimals = new BN(10).pow(new BN(item?.stats?.decimals));
      item.supply = item?.stats?.totalDepositsWads
        .div(WAD)
        .div(TokenDecimals)
        .toString();
      item.borrow = item?.stats?.totalBorrowsWads
        .div(WAD)
        .div(TokenDecimals)
        .toString();
      item.value = Number(item.supply) * item?.stats?.assetPriceUSD || 0;
      totalSupplyMarket += item.value;
      item.borrowValue = item.borrow * item?.stats?.assetPriceUSD || 0;
      totalBorrowMarket += item.borrowValue;
      if (item?.stats?.supplyInterestAPY) {
        const supplyAPR =
          ((1 + item?.stats?.supplyInterestAPY / 1) ** 1 - 1) * 100;
        item.supplyAPR = supplyAPR.toFixed(2);
      }
      if (item?.stats?.borrowInterestAPY) {
        const borrowAPR =
          ((1 + item?.stats?.borrowInterestAPY / 1) ** 1 - 1) * 100;
        item.borrowAPR = borrowAPR.toFixed(2);
      }
    });
    setMarketTVl({
      totalBorrowMarket,
      totalSupplyMarket,
      TVL: Number(totalSupplyMarket) - Number(totalBorrowMarket),
    });
    setMarkets(market.reserves);
  };
  const fetchData = async () => {
    if (publicKey === null) {
      return;
    }
    let userData = await pool.fetchObligationByWallet(publicKey);
    if (userData === null) {
      return;
    }
    userData.totalSupply = 0;
    userData.totalBorrow = 0;
    userData?.deposits.forEach((deposit) => {
      const reserve = pool.reserves.find(
        (item) => item?.stats?.mintAddress === deposit.mintAddress
      );
      if (reserve) {
        reserve.user =
          deposit.amount.toNumber() /
          10 ** reserve.config.liquidityToken.decimals;
        reserve.userValue = reserve.user * reserve.stats?.assetPriceUSD;
      }
      deposit.info = reserve;
      userData.totalSupply += reserve.user;
    });
    userData?.borrows.forEach((deposit) => {
      const reserve = pool.reserves.find(
        (item) => item?.stats?.mintAddress === deposit.mintAddress
      );
      if (reserve) {
        reserve.userBorrow =
          deposit.amount.toNumber() /
          10 ** reserve.config.liquidityToken.decimals;
        reserve.userBorrowValue =
          reserve.userBorrow * reserve.stats?.assetPriceUSD;
        if (reserve.userBorrow < 0.00001) {
          reserve.userBoorrow = 0.00001;
          reserve.userBorrowValue = 0.00001;
        }
      }
      deposit.borrowInfo = reserve;
      userData.totalBorrow += reserve.userBorrow;
    });
    setUser(userData);
    if (user) setLoading(false);
  };

  useEffect(() => {
    fetchMarketData();
  }, [page]);

  useEffect(() => {
    if (loading && publicKey && pool && !user) fetchData();
  }, [publicKey, page, markets]);
  return (
    <>
      <div className={styles.indexlend}>
        <Header page={'lend'} />
        <div className={styles.lamp} />
        <div className={styles.indexlendInner}>
          <div className={styles.walletNetwortPanelParent}>
            <div className={styles.frame1272Button}>
              <div
                className={`${styles.solendMainPool} ${
                  page === 'main' ? styles.activePage : ''
                }`}
                onClick={() => {
                  if (page !== 'main') setPage('main');
                }}
              >
                Solend Main Pool
              </div>
              <button
                className={`${styles.solendTurboSol} ${
                  page === 'turbo' ? styles.activePage : ''
                }`}
                onClick={() => {
                  if (page === 'main') setPage('turbo');
                }}
              >
                Solend Turbo Sol
              </button>
            </div>
            <div className={styles.walletNetwortPanel}>
              <div className={styles.poolOverwiew}>
                <div className={`${global.row} ${global.spaceBetween}`}>
                  <div className={global.column}>
                    <div className={styles.poolOverview}>
                      <p className={styles.poolFillingRate}>Pool Overview</p>
                    </div>
                    <div className={styles.totalBorrowParent}>
                      <div className={styles.creator}>Creator</div>
                      <div className={styles.pool}>Pool</div>
                      <div className={styles.totalSupply}>Total supply</div>
                      <div className={styles.totalBorrow}>Total borrow</div>

                      <div className={styles.tvl}>TVL</div>
                      {page === 'turbo' ? (
                        <div className={styles.maxOutflow}>Max outflow</div>
                      ) : null}

                      <div className={styles.frameChild} />
                    </div>
                    <div className={styles.gridRow}>
                      <div className={styles.solend}>Solend</div>
                      <div className={styles.mainpool}>
                        {page === 'main' ? 'MainPool' : 'TurboPool'}
                      </div>
                      <div className={styles.m}>
                        ${(marketTVl.totalBorrowMarket / 1_000_000).toFixed(1)}m
                      </div>
                      <div className={styles.m1}>
                        ${(marketTVl.totalSupplyMarket / 1_000_000).toFixed(1)}m
                      </div>
                      <div className={styles.m2}>
                        ${(marketTVl.TVL / 1_000_000).toFixed(1)}m
                      </div>
                      {page === 'turbo' ? (
                        <div className={styles.per4Hours}>
                          $4,000,000 per 4 hours
                        </div>
                      ) : null}
                    </div>
                    <div className={styles.poolDetails}>
                      {pool?.config?.description}
                    </div>
                  </div>

                  <div className={styles.poolFillingRateTotalBorroParent}>
                    <div className={styles.basicGauge}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='8 10 110 100'
                        style={{ width: '170px', height: 'auto' }}
                      >
                        <linearGradient
                          id='gradient'
                          x1='0'
                          y1='0'
                          x2='0'
                          y2='100%'
                        >
                          <stop
                            offset='0%'
                            stopColor='#76FFFF'
                          />
                          <stop
                            offset='100%'
                            stopColor='#76FFFF'
                          />
                        </linearGradient>
                        <path
                          className='grey'
                          d='M30,90 A40,40 0 1,1 80,90'
                          fill='none'
                          style={{
                            stroke: '#292f39',
                            strokeLinecap: 'round',
                            strokeWidth: '6',
                          }}
                        />
                        <path
                          id='blue'
                          fill='none'
                          className='blue'
                          d='M30,90 A40,40 0 1,1 80,90'
                          style={{
                            stroke: 'url(#gradient)',
                            strokeLinecap: 'round',
                            strokeWidth: '6',
                            strokeDasharray: '198',
                            strokeDashoffset: marketTVl.totalBorrowMarket
                              ? (
                                  198 -
                                  198 *
                                    (marketTVl.totalBorrowMarket /
                                      marketTVl.totalSupplyMarket)
                                ).toFixed(2)
                              : 198,
                            animation: 'dash 3s ease-out forwards',
                          }}
                        />
                      </svg>
                      <div className={styles.div3}>
                        {marketTVl.totalBorrowMarket
                          ? (
                              (marketTVl.totalBorrowMarket /
                                marketTVl.totalSupplyMarket) *
                              100
                            ).toFixed(2)
                          : 0}
                        %
                      </div>
                    </div>
                    <div className={styles.poolFillingRateContainer}>
                      <p
                        className={styles.poolFillingRate}
                      >{`Pool Filling Rate `}</p>
                      <p
                        className={styles.poolFillingRate}
                      >{`(Total borrow/Total supply) `}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${global.row} ${styles.gap}`}>
              <div className={styles.poolInfo}>
                <div className={styles.lamp1} />
                <div className={styles.totalParent}>
                  <div className={styles.asset}>Asset</div>
                  <div className={styles.total}>{`Total `}</div>
                  <div className={styles.apr}>APR</div>

                  <div className={styles.frameChild} />
                </div>
                <div className={styles.scrollFrame}>
                  {markets.map((item, index) => {
                    return (
                      <div
                        className={styles.supplyParent}
                        key={index + 1}
                      >
                        <div className={global.row}>
                          <div className={global.column}>
                            <div className={styles.sol}>
                              {item?.stats?.symbol}
                            </div>
                            <div className={styles.div4}>
                              $ {Number(item?.stats?.assetPriceUSD.toFixed(5))}
                            </div>
                          </div>

                          <img
                            className={styles.solana2Icon}
                            alt=''
                            src={item.config.liquidityToken.logo}
                          />
                        </div>

                        <div className={global.column}>
                          <div className={styles.openLtvContainer}>
                            <span>Open LTV :</span>
                            <span className={styles.span}>
                              {' '}
                              {item?.stats?.loanToValueRatio}
                            </span>
                          </div>
                          <div className={styles.borrowWeightContainer}>
                            <span>Borrow weight :</span>
                            <span className={styles.span}> 1</span>
                          </div>
                        </div>

                        <div className={global.column}>
                          <div className={global.row}>
                            <div className={styles.supply}>Supply :</div>
                            <div className={styles.kSol}>
                              {Number(item.supply / 1000).toFixed(0)}k $
                              {item?.stats?.symbol} -{' '}
                              {(Number(item.value) / 1_000_000).toFixed(2)}m $
                            </div>
                          </div>
                          <div className={global.row}>
                            <div className={styles.borrow}>Borrow :</div>
                            <div className={styles.kSol1}>
                              {' '}
                              {Number(item.borrow / 1000).toFixed(0)}k $
                              {item?.stats?.symbol} -{' '}
                              {(Number(item.borrowValue) / 1000).toFixed(2)}k $
                            </div>
                          </div>
                        </div>

                        <div className={global.column}>
                          <div className={styles.div5}>
                            {' '}
                            % {item.supplyAPR ? item.supplyAPR : 0}
                          </div>
                          <div className={styles.div6}>
                            % {item.borrowAPR ? item.borrowAPR : 0}
                          </div>
                        </div>

                        <div className={styles.buttonsTable}>
                          <button
                            className={`${
                              item?.stats?.supplyInterestAPY === 0
                                ? styles.supplyWrapper
                                : styles.activeSupply
                            }`}
                            onClick={() => openLendSupplypopup(item)}
                            disabled={
                              item.hasOwnProperty('supplyAPR') && user
                                ? false
                                : true
                            }
                          >
                            <div className={styles.supply1}>Supply</div>
                          </button>
                          <button
                            className={`${
                              item?.stats?.supplyInterestAPY === 0
                                ? styles.borrowWrapper
                                : styles.activeBorrow
                            }`}
                            onClick={() => openLendBorrowpopup(item)}
                            disabled={
                              item.hasOwnProperty('borrowAPR') && user
                                ? false
                                : true
                            }
                          >
                            <div className={styles.supply1}>Borrow</div>
                          </button>
                          <button
                            className={`${
                              item?.stats?.supplyInterestAPY === 0
                                ? styles.repayWrapper
                                : styles.activeRepay
                            }`}
                            onClick={() => openLendRepaypopup(item)}
                          >
                            <div className={styles.repay}>Repay</div>
                          </button>
                          <button
                            className={`${
                              item?.stats?.supplyInterestAPY === 0
                                ? styles.withdrawWrapper
                                : styles.activeWithdraw
                            }`}
                            onClick={() => openLendWithdrawpopup(item)}
                          >
                            <div className={styles.withdraw}>Withdraw</div>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.userPanel}>
                <div className={styles.lamp2} />
                <div className={styles.fix}>
                  <div className={styles.parent}>
                    <div className={styles.cylinder}>
                      <div
                        className={styles.water}
                        style={{ height: user?.totalSupply ? '100%' : 0 }}
                      ></div>
                    </div>
                    <div className={styles.cylinderBorrow}>
                      <div
                        className={styles.waterBorrow}
                        style={{
                          height: user.obligationStats
                            ? (user.obligationStats.userTotalBorrow /
                                user.obligationStats.userTotalDeposit) *
                                100 +
                              '%'
                            : 0,
                        }}
                      ></div>
                    </div>
                    <div className={styles.cylinderBorrowLimit}>
                      <div
                        className={styles.waterBorrowLimit}
                        style={{
                          height: user.obligationStats
                            ? (user.obligationStats.userTotalBorrow /
                                user.obligationStats.borrowLimit) *
                                100 +
                              '%'
                            : 0,
                        }}
                      ></div>
                    </div>
                    <img
                      className={styles.icon}
                      alt=''
                      src='/04.svg'
                    />
                  </div>
                  <div className={styles.netValueContainer}>
                    <span>{`Net value : `}</span>
                    <span className={styles.span}>
                      ${user?.obligationStats?.netAccountValue.toFixed(3)}
                    </span>
                  </div>
                  <div className={styles.supplyBalanceContainer}>
                    <span>Supply</span>
                    <span className={styles.balance}>{` balance : `}</span>
                    <span className={styles.span}>
                      $ {user?.obligationStats?.userTotalDeposit.toFixed(3)}
                    </span>
                  </div>
                  <div className={styles.borrowBalanceContainer}>
                    <span>Borrow</span>
                    <span className={styles.balance308778}>
                      <span>{` balance : `}</span>
                      <span className={styles.span}>
                        $ {user?.obligationStats?.userTotalBorrow.toFixed(3)}
                      </span>
                    </span>
                  </div>
                  <div className={styles.borrowLimitContainer}>
                    <span>Borrow</span>
                    <span className={styles.balance}>{` limit : `}</span>
                    <span className={styles.span}>
                      $ {user?.obligationStats?.borrowLimit.toFixed(3)}
                    </span>
                  </div>
                  <div className={styles.liquidationThresholdContainer}>
                    <span>Liquidation</span>
                    <span className={styles.balance}>{` threshold `}</span>
                    <span className={styles.span}>
                      $ {user?.obligationStats?.liquidationThreshold.toFixed(8)}
                    </span>
                  </div>
                  <div className={styles.weightBorrowContainer}>
                    <span>{`Weight Borrow : `}</span>
                    <span className={styles.span}>$ 3,087.78</span>
                  </div>

                  <div className={styles.lineParent}>
                    <div className={styles.assetsSupplied}>
                      <span>
                        <span className={styles.balance}>{`Assets `}</span>
                        <span>Supplied</span>
                      </span>
                      <span className={styles.span8}>{` `}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.scrollPosition}>
                  {user
                    ? user.deposits?.map((item: any, index: any) => {
                        return (
                          <div
                            className={styles.assetSupplied}
                            key={index + 1}
                          >
                            <div className={styles.msol}>
                              {item.info.stats.symbol}
                            </div>
                            <div className={styles.assetSuppliedChild} />
                            <div className={styles.div7}>
                              <p className={styles.poolFillingRate}>
                                {item.info.user}
                              </p>
                              <p className={styles.poolFillingRate}>
                                ${item.info.userValue.toFixed(3)}
                              </p>
                            </div>
                            <div className={styles.div8}>
                              % {item.info.supplyAPR}
                            </div>
                            <img
                              className={styles.usdCoinUsdcLogo4Icon}
                              alt=''
                              src={item.info.config.liquidityToken.logo}
                            />
                          </div>
                        );
                      })
                    : null}
                  <div className={styles.lineGroup}>
                    <div className={styles.assetsBorrowed}>
                      <span>
                        <span className={styles.balance}>{`Assets `}</span>
                        <span>Borrowed</span>
                      </span>
                      <span className={styles.span9}>{` `}</span>
                    </div>
                  </div>
                  {user
                    ? user.borrows?.map((item: any, index: any) => {
                        return (
                          <div className={styles.assetBorrowed}>
                            <div className={styles.msol}>
                              {item.borrowInfo.stats.symbol}
                            </div>
                            <div className={styles.assetSuppliedChild} />
                            <div className={styles.div9}>
                              <p className={styles.poolFillingRate}>
                                {item.borrowInfo.userBorrow}
                              </p>
                              <p className={styles.poolFillingRate}>
                                ${item.borrowInfo.userBorrowValue.toFixed(3)}
                              </p>
                            </div>
                            <div className={styles.div8}>
                              % {item.borrowInfo.borrowAPR}
                            </div>
                            <img
                              className={styles.usdCoinUsdcLogo4Icon}
                              alt=''
                              src={item.borrowInfo.config.liquidityToken.logo}
                            />
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.poolFillingRate}>V1.0.1</p>
          <p className={styles.poolFillingRate}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isLendSupplypopupOpen && (
        <PortalPopup
          overlayColor='rgba(20, 32, 48, 0.7)'
          placement='Centered'
          onOutsideClick={closeLendSupplypopup}
        >
          <LendSupplypopup
            onClose={closeLendSupplypopup}
            reserve={selectedLend}
            pool={pool}
            user={user}
          />
        </PortalPopup>
      )}
      {isLendBorrowpopupOpen && (
        <PortalPopup
          overlayColor='rgba(20, 32, 48, 0.7)'
          placement='Centered'
          onOutsideClick={closeLendBorrowpopup}
        >
          <LendBorrowpopup
            onClose={closeLendBorrowpopup}
            lend={selectedLend}
            pool={pool}
            user={user}
          />
        </PortalPopup>
      )}
      {isLendRepaypopupOpen && (
        <PortalPopup
          overlayColor='rgba(20, 32, 48, 0.7)'
          placement='Centered'
          onOutsideClick={closeLendRepaypopup}
        >
          <LendRepaypopup
            onClose={closeLendRepaypopup}
            pool={pool}
            lend={selectedLend}
            user={user}
          />
        </PortalPopup>
      )}
      {isLendWithdrawpopupOpen && (
        <PortalPopup
          overlayColor='rgba(20, 32, 48, 0.7)'
          placement='Centered'
          onOutsideClick={closeLendWithdrawpopup}
        >
          <LendWithdrawpopup
            onClose={closeLendWithdrawpopup}
            lend={selectedLend}
            pool={pool}
            user={user}
          />
        </PortalPopup>
      )}
    </>
  );
};

export default IndexLend;
