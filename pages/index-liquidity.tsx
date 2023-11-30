import type { NextPage } from 'next';
import { useState, useRef, useCallback, useEffect } from 'react';
import ManagePositionPopup from '../components/manage-position-popup';
import PortalPopup from '../components/portal-popup';
import CLMMPositionpopup from '../components/c-l-m-m-positionpopup';
import RemoveAMMpopup from '../components/remove-a-m-mpopup';
import AddAMMpopup from '../components/add-a-m-mpopup';

import styles from './index-liquidity.module.css';
import global from './global-classes.module.css';
import Header from '../components/header';
import { useWallet } from '@solana/wallet-adapter-react';
import { connection } from '../utils/get-connection';
import { AnchorProvider, BN } from '@project-serum/anchor';
import {
  WhirlpoolContext,
  buildWhirlpoolClient,
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PDAUtil,
  PriceMath,
  PoolUtil,
  AccountFetcher,
} from '@orca-so/whirlpools-sdk';
import axios from 'axios';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { DecimalUtil, TokenUtil } from '@orca-so/common-sdk';
import { Address } from 'cluster';
import LiquidityUniversal from './liquidity-universal';
import LiquidityNav from './liquidity-nav';

const IndexLiquidity: NextPage = () => {
  const [isManagePositionPopupOpen, setManagePositionPopupOpen] =
    useState(false);
  const [isManagePositionPopup1Open, setManagePositionPopup1Open] =
    useState(false);
  const [isCLMMPositionpopupOpen, setCLMMPositionpopupOpen] = useState(false);
  const [isRemoveAMMpopupOpen, setRemoveAMMpopupOpen] = useState(false);
  const [isAddAMMpopupOpen, setAddAMMpopupOpen] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [orcaList, setOrcaList] = useState({} as any);
  const [userLiquidity, setUserLiquidity] = useState([] as any);
  const [search, setSearch] = useState('');

  const openManagePositionPopup = useCallback(() => {
    setManagePositionPopupOpen(true);
  }, []);

  const closeManagePositionPopup = useCallback(() => {
    setManagePositionPopupOpen(false);
  }, []);

  const openManagePositionPopup1 = useCallback(() => {
    setManagePositionPopup1Open(true);
  }, []);

  const closeManagePositionPopup1 = useCallback(() => {
    setManagePositionPopup1Open(false);
  }, []);

  const openCLMMPositionpopup = useCallback(() => {
    setCLMMPositionpopupOpen(true);
  }, []);

  const closeCLMMPositionpopup = useCallback(() => {
    setCLMMPositionpopupOpen(false);
  }, []);

  const openRemoveAMMpopup = useCallback(() => {
    setRemoveAMMpopupOpen(true);
  }, []);

  const closeRemoveAMMpopup = useCallback(() => {
    setRemoveAMMpopupOpen(false);
  }, []);

  const openAddAMMpopup = useCallback(() => {
    setAddAMMpopupOpen(true);
  }, []);

  const closeAddAMMpopup = useCallback(() => {
    setAddAMMpopupOpen(false);
  }, []);

  const { publicKey, wallet } = useWallet();
  useEffect(() => {
    (async () => {
      const tokenInfo = await axios.get(
        'https://api.mainnet.orca.so/v1/whirlpool/list'
      );

      let sum = 0;
      await Promise.all(
        tokenInfo.data.whirlpools.map(async (item: any) => {
          if (item.tvl) sum = item.tvl + sum;
          item.symbol = `${item.tokenA.symbol}-${item.tokenB.symbol}`;
        })
      );
      setOrcaList({ pools: tokenInfo.data.whirlpools, sum });
    })();
  }, []);
  // const fetchData = async () => {
  //   if (wallet === null) {
  //     return;
  //   }

  //   const ctx = WhirlpoolContext.from(
  //     connection,
  //     wallet,
  //     ORCA_WHIRLPOOL_PROGRAM_ID
  //   );
  //   let accountLiquidity = [];
  //   const fetcher = new AccountFetcher(connection);
  //   const client = buildWhirlpoolClient(ctx);
  //   const token_accounts = (
  //     await ctx.connection.getTokenAccountsByOwner(ctx.wallet.publicKey, {
  //       programId: TOKEN_PROGRAM_ID,
  //     })
  //   ).value;
  //   const whirlpool_position_candidate_pubkeys: = token_accounts
  //     .map((ta) => {
  //       const parsed = TokenUtil.deserializeTokenAccount(ta.account.data);
  //       if (parsed === null) {
  //         return;
  //       }
  //       // Derive the address of Whirlpool's position from the mint address (whether or not it exists)
  //       const pda = PDAUtil.getPosition(ctx.program.programId, parsed.mint);

  //       // Returns the address of the Whirlpool position only if the number of tokens is 1 (ignores empty token accounts and non-NFTs)
  //       return new BN(parsed.amount.toString()).eq(new BN(1))
  //         ? pda.publicKey
  //         : undefined;
  //     })
  //     .filter((pubkey) => pubkey !== undefined);

  //   // Get data from Whirlpool position addresses
  //   const whirlpool_position_candidate_datas = await ctx.fetcher.listPositions(
  //     whirlpool_position_candidate_pubkeys,
  //     true
  //   );
  //   // Leave only addresses with correct data acquisition as position addresses
  //   const whirlpool_positions = whirlpool_position_candidate_pubkeys.filter(
  //     (pubkey, i) => whirlpool_position_candidate_datas[i] !== null
  //   );

  //   // Output the status of the positions
  //   for (let i = 0; i < whirlpool_positions.length; i++) {
  //     const p = whirlpool_positions[i];

  //     // Get the status of the position
  //     const position = await client.getPosition(p);
  //     const data = position.getData();

  //     // Get the pool to which the position belongs
  //     const pool = await client.getPool(data.whirlpool);
  //     const token_a = pool.getTokenAInfo();
  //     const token_b = pool.getTokenBInfo();
  //     const price = PriceMath.sqrtPriceX64ToPrice(
  //       pool.getData().sqrtPrice,
  //       token_a.decimals,
  //       token_b.decimals
  //     );

  //     // Get the price range of the position
  //     const lower_price = PriceMath.tickIndexToPrice(
  //       data.tickLowerIndex,
  //       token_a.decimals,
  //       token_b.decimals
  //     );
  //     const upper_price = PriceMath.tickIndexToPrice(
  //       data.tickUpperIndex,
  //       token_a.decimals,
  //       token_b.decimals
  //     );

  //     // Calculate the amount of tokens that can be withdrawn from the position
  //     const amounts = PoolUtil.getTokenAmountsFromLiquidity(
  //       data.liquidity,
  //       pool.getData().sqrtPrice,
  //       PriceMath.tickIndexToSqrtPriceX64(data.tickLowerIndex),
  //       PriceMath.tickIndexToSqrtPriceX64(data.tickUpperIndex),
  //       true
  //     );
  //     // Output the status of the position
  //     accountLiquidity.push({
  //       position: p,
  //       whirlpoolAddress: data.whirlpool.toBase58(),
  //       whirlpoolPrice: price.toFixed(token_b.decimals),
  //       liquidity: data.liquidity.toString(),
  //       amountA: DecimalUtil.fromU64(
  //         amounts.tokenA,
  //         token_a.decimals
  //       ).toString(),
  //       amountB: DecimalUtil.fromU64(
  //         amounts.tokenB,
  //         token_b.decimals
  //       ).toString(),
  //       lower_price: lower_price.toNumber(),
  //       upper_price: upper_price.toNumber(),
  //     });
  //   }
  //   return accountLiquidity;
  // };
  useEffect(() => {
    if (publicKey) {
      // fetchData().then((res) => {
      //   setUserLiquidity(res);
      // });
    }
  }, [publicKey]);
  if (fetched) {
    userLiquidity.forEach((item: any) => {
      const liqudityFarmData = orcaList.pools.find(
        (i: any) => i.address == item.whirlpoolAddress
      );
      liqudityFarmData.user = item;
      console.log(liqudityFarmData);
    });
    orcaList.pools.sort((a: any, b: any) =>
      a.user === b.user ? 0 : a.user ? -1 : 1
    );
  }
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className={styles.indexliquidity}>
        <Header page={'liquidity'} />
        <div className={styles.lamp} />
        <div className={styles.liquidityPanelWrapper}>
          <LiquidityNav activeBlock='liquidity' activePage='pools' />
          <div className={styles.listPanel}>
            <div className={`${styles.poolOverwiew} ${global.row}`}>
              <div className={`${styles.titleContainer} ${global.column}`}>
                <div className={styles.listOfAll}>
                  List of All Active Pools in Ecosystem
                </div>
                <div className={styles.earnYieldOnContainer}>
                  <p className={styles.earnYieldOn}>
                    Earn yield on trading fees by providing liquidity
                  </p>
                </div>
                <input
                  className={styles.serachinput}
                  type='search'
                  placeholder='Search'
                  onChange={handleSearch}
                  value={search}
                />
              </div>

              <div
                className={`${styles.poolHeader} ${global.column} ${styles.gap}`}
              >
                <div className={`${global.row} ${styles.gap}`}>
                  <div className={styles.rectangleParent}>
                    <div className={`${styles.poolButton} ${styles.navActive}`}>
                      All
                    </div>
                    <div className={styles.poolButton}>Raydium</div>
                    <div className={styles.poolButton}>Orca</div>
                  </div>

                  <div className={styles.rectangleParent}>
                    <div className={`${styles.poolButton} ${styles.navActive}`}>
                      All
                    </div>
                    <div className={styles.poolButton}>AMM</div>
                    <div className={styles.poolButton}>CLMM</div>
                  </div>
                  <div className={styles.rectangleParent}>
                    <div className={`${styles.poolButton} ${styles.navActive}`}>
                      TVL
                    </div>
                    <div className={styles.poolButton}>APR</div>
                  </div>
                </div>

                <div className={styles.rectangleParent}>
                  <div
                    className={`${styles.poolImageButton} ${styles.navActive}`}
                  >
                    <div className={styles.poolImageButtonText}>All</div>
                  </div>
                  <div className={`${styles.poolImageButton} `}>
                    <img
                      className={styles.solana1Icon}
                      alt=''
                      src='/solana-2@2x.png'
                    />
                    <div className={styles.sol}>SOL</div>
                  </div>
                  <div className={`${styles.poolImageButton}`}>
                    <img
                      className={styles.ethereumEthLogo1Icon}
                      alt=''
                      src='/ethereumethlogo-1@2x.png'
                    />
                    <div className={styles.poolImageButtonText}>ETH</div>
                  </div>
                  <div className={`${styles.poolImageButton}`}>
                    <img
                      className={styles.lidoForSolanaLogo2Icon}
                      alt=''
                      src='/lidoforsolanalogo-2@2x.png'
                    />
                    <div className={styles.poolImageButtonText}>stSOL</div>
                  </div>
                  <div className={`${styles.poolImageButton}`}>
                    <img
                      className={styles.marinadeLogoCopy1}
                      alt=''
                      src='/marinadelogo-copy-1@2x.png'
                    />
                    <div className={styles.poolImageButtonText}>mSOL</div>
                  </div>
                  <div className={`${styles.poolImageButton}`}>
                    <img
                      className={styles.solana1Icon}
                      alt=''
                      src='/tetherusdtlogo-2@2x.png'
                    />
                    <div className={styles.poolImageButtonText}>USDT</div>
                  </div>
                  <div className={`${styles.poolImageButton}`}>
                    <img
                      className={styles.solana1Icon}
                      alt=''
                      src='/usdcoinusdclogo-2@2x.png'
                    />
                    <div className={styles.poolImageButtonText}>USDC</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.poolList}>
              <div className={styles.lamp1} />
              <div className={styles.tab}>
                <div className={styles.pool}>Pool</div>
                <div className={styles.protocol}>Protocol</div>
                <div className={styles.protocolTvl}>Protocol TVL</div>
                <div className={styles.poolLiquidity}>Pool Liquidity</div>

                <div className={styles.volume}>Volume</div>
                <div className={styles.fee}>Fee</div>
                <div className={styles.apr1}>ApR</div>
              </div>
              <div className={styles.scrollFrame}>
                <div className={styles.frameParent}>
                  {fetched
                    ? orcaList.pools
                        .filter(
                          (i: any) =>
                            i.symbol
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            i.address == search
                        )
                        .map((item: any, index: any) => {
                          return (
                            <div
                              className={styles.mParent}
                              key={index + 1}
                            >
                              <div className={styles.m}>
                                $ {Number(item.tvl / 1000000).toFixed(2)} m
                              </div>
                              <div className={styles.solUsdc}>
                                {item.symbol}
                              </div>
                              <div className={styles.orca1}>Orca</div>
                              <div className={styles.frameChild} />
                              <div className={styles.m1}>
                                ${' '}
                                {Number(item.volume?.day / 1000000).toFixed(2)}{' '}
                                m
                              </div>
                              <div className={styles.m2}>
                                ${' '}
                                {(item.lpFeeRate * item.volume?.day).toFixed(2)}
                              </div>
                              <div className={styles.div}>
                                {(item.totalApr?.day * 100).toFixed(2)} %
                              </div>
                              <div className={styles.m3}>
                                $ {Number(orcaList.sum / 1000000).toFixed(2)} m
                              </div>
                              <img
                                className={styles.solana2Icon}
                                alt=''
                                src={item.tokenA.logoURI}
                              />
                              <img
                                className={styles.usdCoinUsdcLogo1Icon1}
                                alt=''
                                src={item.tokenB.logoURI}
                              />
                              <div className={styles.openPositions}>
                                <button
                                  className={styles.managePositionButton}
                                  onClick={openManagePositionPopup}
                                >
                                  <div className={styles.manage}>Manage</div>
                                </button>
                                <div className={styles.usdcPerSol}>
                                  22.56 - 23.000 USDC per SOL
                                </div>
                                <div className={styles.apr108065}>
                                  APR : 1080.65 %
                                </div>
                                <div
                                  className={styles.circleXmarkRegular1Parent}
                                >
                                  <img
                                    className={styles.circleXmarkRegular1Icon}
                                    alt=''
                                    src='/circlexmarkregular-1.svg'
                                  />
                                  <div className={styles.outOfRange}>
                                    Out of Range
                                  </div>
                                </div>
                              </div>
                              <div className={styles.openPositions1}>
                                <button
                                  className={styles.managePositionButton}
                                  onClick={openManagePositionPopup1}
                                >
                                  <div className={styles.manage}>Manage</div>
                                </button>
                                <div className={styles.usdcPerSol}>
                                  18.263 - 23.682 USDC per SOL
                                </div>
                                <div className={styles.apr108065}>
                                  APR : 80.65 %
                                </div>
                                <div
                                  className={styles.circleCheckRegular1Parent}
                                >
                                  <img
                                    className={styles.circleXmarkRegular1Icon}
                                    alt=''
                                    src='/circlecheckregular-11.svg'
                                  />
                                  <div
                                    className={styles.outOfRange}
                                  >{` In Range `}</div>
                                </div>
                              </div>
                              <button
                                className={styles.createPositionButton}
                                onClick={openCLMMPositionpopup}
                              >
                                <div className={styles.manage}>
                                  Create Position
                                </div>
                              </button>
                              <img
                                className={styles.orcaaef56d302Icon}
                                alt=''
                                src='/orcaaef56d30-2.svg'
                              />
                              <div className={styles.clmm1}>CLMM</div>
                            </div>
                          );
                        })
                    : null}

                  <div className={`${global.column}`}>
                    <div className={styles.solUsdc}>SOL-USDC</div>
                    <div className={`${global.row} ${styles.gap}`}>
                      <img
                        className={styles.solana2Icon}
                        alt=''
                        src='/solana-23@2x.png'
                      />
                      <img
                        className={styles.usdCoinUsdcLogo1Icon1}
                        alt=''
                        src='/usdcoinusdclogo-1@2x.png'
                      />
                    </div>
                  </div>
                  <div className={`${global.column}`}>
                    <div className={styles.orca1}>Raydium</div>
                    <div className={styles.clmm1}>AMM</div>
                  </div>

                  <div className={`${global.column} ${global.spaceBetween}`}>
                    <div className={`${global.row} ${styles.gap}`}>
                      <img
                        className={styles.raydiumRayCoin1Icon}
                        alt=''
                        src='/raydiumraycoin-12@2x.png'
                      />
                      <div className={styles.m3}>$ 47.65 m</div>
                    </div>

                    <button
                      className={styles.createPositionButton2}
                      onClick={openAddAMMpopup}
                    >
                      <div className={styles.manage}>Add Liquidity</div>
                    </button>
                  </div>

                  <div className={`${global.column} ${global.spaceBetween}`}>
                    <div className={`${styles.gridRow}`}>
                      <div className={styles.m}>$ 12.65 m</div>
                      <div className={styles.m1}>$ 2.65 m</div>
                      <div className={styles.m2}>$ 2.65 m</div>
                      <div className={styles.div}>65.64 %</div>
                    </div>
                    <div className={styles.openPositions2}>
                      <div
                        className={styles.value}
                      >{`Value : $ 100,000.66 `}</div>
                      <div className={styles.lpTokens}>
                        LP Tokens : 15334.63 LP
                      </div>
                      <div
                        className={styles.yourShare}
                      >{`Your share : 0.01 % <`}</div>
                      <button
                        className={styles.createPositionButton1}
                        onClick={openRemoveAMMpopup}
                      >
                        <div className={styles.manage}>Remove Liquidity</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LiquidityUniversal />
      </div>
      {isManagePositionPopupOpen && (
        <PortalPopup
          overlayColor='rgba(17, 27, 42, 0.7)'
          placement='Centered'
          onOutsideClick={closeManagePositionPopup}
        >
          <ManagePositionPopup onClose={closeManagePositionPopup} />
        </PortalPopup>
      )}
      {isManagePositionPopup1Open && (
        <PortalPopup
          overlayColor='rgba(17, 27, 42, 0.7)'
          placement='Centered'
          onOutsideClick={closeManagePositionPopup1}
        >
          <ManagePositionPopup onClose={closeManagePositionPopup1} />
        </PortalPopup>
      )}
      {isCLMMPositionpopupOpen && (
        <PortalPopup
          overlayColor='rgba(17, 27, 42, 0.7)'
          placement='Centered'
          onOutsideClick={closeCLMMPositionpopup}
        >
          <CLMMPositionpopup onClose={closeCLMMPositionpopup} />
        </PortalPopup>
      )}
      {isRemoveAMMpopupOpen && (
        <PortalPopup
          overlayColor='rgba(17, 27, 42, 0.7)'
          placement='Centered'
          onOutsideClick={closeRemoveAMMpopup}
        >
          <RemoveAMMpopup onClose={closeRemoveAMMpopup} />
        </PortalPopup>
      )}
      {isAddAMMpopupOpen && (
        <PortalPopup
          overlayColor='rgba(17, 27, 42, 0.7)'
          placement='Centered'
          onOutsideClick={closeAddAMMpopup}
        >
          <AddAMMpopup onClose={closeAddAMMpopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default IndexLiquidity;
