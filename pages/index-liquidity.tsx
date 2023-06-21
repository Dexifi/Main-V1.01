import type { NextPage } from "next";
import { useState, useRef, useCallback, useEffect } from "react";
import ManagePositionPopup from "../components/manage-position-popup";
import PortalPopup from "../components/portal-popup";
import CLMMPositionpopup from "../components/c-l-m-m-positionpopup";
import RemoveAMMpopup from "../components/remove-a-m-mpopup";
import AddAMMpopup from "../components/add-a-m-mpopup";
import { useRouter } from "next/router";
import styles from "./index-liquidity.module.css";
import Header from "../components/header";
import { useWallet } from "@solana/wallet-adapter-react";
import { connection } from "../utils/get-connection";
import { AnchorProvider, BN } from "@project-serum/anchor";
import {
  WhirlpoolContext,
  buildWhirlpoolClient,
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PDAUtil,
  PriceMath,
  PoolUtil,
  AccountFetcher,
} from "@orca-so/whirlpools-sdk";
import axios from "axios";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { DecimalUtil, TokenUtil } from "@orca-so/common-sdk";

const IndexLiquidity: NextPage = () => {
  const [isManagePositionPopupOpen, setManagePositionPopupOpen] =
    useState(false);
  const [isManagePositionPopup1Open, setManagePositionPopup1Open] =
    useState(false);
  const [isCLMMPositionpopupOpen, setCLMMPositionpopupOpen] = useState(false);
  const [isRemoveAMMpopupOpen, setRemoveAMMpopupOpen] = useState(false);
  const [isAddAMMpopupOpen, setAddAMMpopupOpen] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [orcaList, setOrcaList] = useState({});
  const [userLiquidity, setUserLiquidity] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

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

  const onMyPositionsClick = useCallback(() => {
    router.push("/index-liquiditymy");
  }, [router]);
  const { publicKey, wallet } = useWallet();
  useEffect(() => {
    (async () => {
      const tokenInfo = await axios.get(
        "https://api.mainnet.orca.so/v1/whirlpool/list"
      );

      let sum = 0;
      await Promise.all(
        tokenInfo.data.whirlpools.map(async (item) => {
          if (item.tvl) sum = item.tvl + sum;
          item.symbol = `${item.tokenA.symbol}-${item.tokenB.symbol}`;
        })
      );
      setOrcaList({ pools: tokenInfo.data.whirlpools, sum });
    })();
  }, []);
  const fetchData = async () => {
    const ctx = WhirlpoolContext.from(
      connection,
      wallet?.adapter,
      ORCA_WHIRLPOOL_PROGRAM_ID
    );
    let accountLiquidity = [];
    const fetcher = new AccountFetcher(connection);
    const client = buildWhirlpoolClient(ctx, fetcher);
    const token_accounts = (
      await ctx.connection.getTokenAccountsByOwner(ctx.wallet.publicKey, {
        programId: TOKEN_PROGRAM_ID,
      })
    ).value;
    const whirlpool_position_candidate_pubkeys = token_accounts
      .map((ta) => {
        const parsed = TokenUtil.deserializeTokenAccount(ta.account.data);

        // Derive the address of Whirlpool's position from the mint address (whether or not it exists)
        const pda = PDAUtil.getPosition(ctx.program.programId, parsed.mint);

        // Returns the address of the Whirlpool position only if the number of tokens is 1 (ignores empty token accounts and non-NFTs)
        return new BN(parsed.amount.toString()).eq(new BN(1))
          ? pda.publicKey
          : undefined;
      })
      .filter((pubkey) => pubkey !== undefined);

    // Get data from Whirlpool position addresses
    const whirlpool_position_candidate_datas = await ctx.fetcher.listPositions(
      whirlpool_position_candidate_pubkeys,
      true
    );
    // Leave only addresses with correct data acquisition as position addresses
    const whirlpool_positions = whirlpool_position_candidate_pubkeys.filter(
      (pubkey, i) => whirlpool_position_candidate_datas[i] !== null
    );

    // Output the status of the positions
    for (let i = 0; i < whirlpool_positions.length; i++) {
      const p = whirlpool_positions[i];

      // Get the status of the position
      const position = await client.getPosition(p);
      const data = position.getData();

      // Get the pool to which the position belongs
      const pool = await client.getPool(data.whirlpool);
      const token_a = pool.getTokenAInfo();
      const token_b = pool.getTokenBInfo();
      const price = PriceMath.sqrtPriceX64ToPrice(
        pool.getData().sqrtPrice,
        token_a.decimals,
        token_b.decimals
      );

      // Get the price range of the position
      const lower_price = PriceMath.tickIndexToPrice(
        data.tickLowerIndex,
        token_a.decimals,
        token_b.decimals
      );
      const upper_price = PriceMath.tickIndexToPrice(
        data.tickUpperIndex,
        token_a.decimals,
        token_b.decimals
      );

      // Calculate the amount of tokens that can be withdrawn from the position
      const amounts = PoolUtil.getTokenAmountsFromLiquidity(
        data.liquidity,
        pool.getData().sqrtPrice,
        PriceMath.tickIndexToSqrtPriceX64(data.tickLowerIndex),
        PriceMath.tickIndexToSqrtPriceX64(data.tickUpperIndex),
        true
      );
      // Output the status of the position
      accountLiquidity.push({
        position: p.toBase58(),
        whirlpoolAddress: data.whirlpool.toBase58(),
        whirlpoolPrice: price.toFixed(token_b.decimals),
        liquidity: data.liquidity.toString(),
        amountA: DecimalUtil.fromU64(
          amounts.tokenA,
          token_a.decimals
        ).toString(),
        amountB: DecimalUtil.fromU64(
          amounts.tokenB,
          token_b.decimals
        ).toString(),
        lower_price: lower_price.toNumber(),
        upper_price: upper_price.toNumber(),
      });
    }
    return accountLiquidity;
  };
  useEffect(() => {
    if (publicKey) {
      fetchData().then((res) => {
        setUserLiquidity(res);
      });
    }
    
  }, [publicKey]);
  if (fetched) {
    userLiquidity.forEach((item) => {
      const liqudityFarmData = orcaList.pools.find(
        (i) => i.address == item.whirlpoolAddress
      );
      liqudityFarmData.user = item;
      console.log(liqudityFarmData);
    });
    orcaList.pools.sort((a, b) => (a.user === b.user ? 0 : a.user ? -1 : 1));
  }
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className={styles.indexliquidity}>
        <div className={styles.lamp} />
        <div className={styles.liquidityPanelWrapper}>
          <div className={styles.liquidityPanel}>
            <div className={styles.listPanel}>
              <div className={styles.poolOverwiew}>
                <div className={styles.listOfAll}>
                  List of All Active Pools in Ecosystem
                </div>
                <input
                  className={styles.serachinput}
                  type="search"
                  placeholder="Search"
                  onChange={handleSearch}
                  value={search}
                />
                <div className={styles.earnYieldOnContainer}>
                  <p className={styles.earnYieldOn}>
                    Earn yield on trading fees by providing liquidity
                  </p>
                </div>
                <div className={styles.rectangleParent}>
                  <div className={styles.instanceChild} />
                  <div className={styles.all}>All</div>
                  <div className={styles.orca}>Orca</div>
                  <div className={styles.raydium}>Raydium</div>
                  <button className={styles.instanceItem} />
                </div>
                <div className={styles.rectangleGroup}>
                  <div className={styles.instanceInner} />
                  <div className={styles.rectangleDiv} />
                  <div className={styles.all1}>All</div>
                  <div className={styles.clmm}>CLMM</div>
                  <div className={styles.amm}>AMM</div>
                </div>
                <div className={styles.rectangleContainer}>
                  <div className={styles.instanceChild1} />
                  <div className={styles.instanceChild2} />
                  <div className={styles.tvl}>TVL</div>
                  <div className={styles.apr}>APR</div>
                </div>
                <div className={styles.frameDiv}>
                  <div className={styles.instanceChild3} />
                  <div className={styles.instanceChild4} />
                  <div className={styles.frameWrapper}>
                    <div className={styles.solana1Parent}>
                      <img
                        className={styles.solana1Icon}
                        alt=""
                        src="/solana-2@2x.png"
                      />
                      <div className={styles.sol}>SOL</div>
                    </div>
                  </div>
                  <div className={styles.frameContainer}>
                    <div className={styles.allWrapper}>
                      <div className={styles.all2}>All</div>
                    </div>
                  </div>
                  <div className={styles.groupDiv}>
                    <div className={styles.solana1Parent}>
                      <img
                        className={styles.ethereumEthLogo1Icon}
                        alt=""
                        src="/ethereumethlogo-1@2x.png"
                      />
                      <div className={styles.sol}>ETH</div>
                    </div>
                  </div>
                  <div className={styles.frameWrapper1}>
                    <div className={styles.solana1Parent}>
                      <img
                        className={styles.lidoForSolanaLogo2Icon}
                        alt=""
                        src="/lidoforsolanalogo-2@2x.png"
                      />
                      <div className={styles.sol}>stSOL</div>
                    </div>
                  </div>
                  <div className={styles.frameWrapper2}>
                    <div className={styles.solana1Parent}>
                      <img
                        className={styles.marinadeLogoCopy1}
                        alt=""
                        src="/marinadelogo-copy-1@2x.png"
                      />
                      <div className={styles.sol}>mSOL</div>
                    </div>
                  </div>
                  <div className={styles.frameWrapper3}>
                    <div className={styles.solana1Parent}>
                      <img
                        className={styles.solana1Icon}
                        alt=""
                        src="/tetherusdtlogo-2@2x.png"
                      />
                      <div className={styles.sol}>USDT</div>
                    </div>
                  </div>
                  <div className={styles.frameWrapper4}>
                    <div className={styles.solana1Parent}>
                      <img
                        className={styles.solana1Icon}
                        alt=""
                        src="/usdcoinusdclogo-2@2x.png"
                      />
                      <div className={styles.sol}>USDC</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.poolList}>
                <div className={styles.lamp1} />
                <div className={styles.tab}>
                  <div className={styles.protocol}>Protocol</div>
                  <div className={styles.poolLiquidity}>Pool Liquidity</div>
                  <div className={styles.protocolTvl}>Protocol TVL</div>
                  <div className={styles.volume}>Volume</div>
                  <div className={styles.fee}>Fee</div>
                  <div className={styles.apr1}>ApR</div>
                  <div className={styles.pool}>Pool</div>
                  <div className={styles.tabChild} />
                </div>
                <div className={styles.scrollFrame}>
                  <div className={styles.frameParent}>
                    {fetched
                      ? orcaList.pools
                          .filter(
                            (i) =>
                              i.symbol
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                              i.address == search
                          )
                          .map((item, index) => {
                            return (
                              <div className={styles.mParent} key={index + 1}>
                                <div className={styles.m}>
                                  $ {Number(item.tvl / 1000000).toFixed(2)} m
                                </div>
                                <div className={styles.solUsdc}>
                                  {item.symbol}
                                </div>
                                <div className={styles.orca1}>Orca</div>
                                <div className={styles.frameChild} />
                                <div className={styles.m1}>
                                  ${" "}
                                  {Number(item.volume?.day / 1000000).toFixed(
                                    2
                                  )}{" "}
                                  m
                                </div>
                                <div className={styles.m2}>
                                  ${" "}
                                  {(item.lpFeeRate * item.volume?.day).toFixed(
                                    2
                                  )}
                                </div>
                                <div className={styles.div}>
                                  {(item.totalApr?.day * 100).toFixed(2)} %
                                </div>
                                <div className={styles.m3}>
                                  $ {Number(orcaList.sum / 1000000).toFixed(2)}{" "}
                                  m
                                </div>
                                <img
                                  className={styles.solana2Icon}
                                  alt=""
                                  src={item.tokenA.logoURI}
                                />
                                <img
                                  className={styles.usdCoinUsdcLogo1Icon1}
                                  alt=""
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
                                      alt=""
                                      src="/circlexmarkregular-1.svg"
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
                                      alt=""
                                      src="/circlecheckregular-11.svg"
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
                                  alt=""
                                  src="/orcaaef56d30-2.svg"
                                />
                                <div className={styles.clmm1}>CLMM</div>
                              </div>
                            );
                          })
                      : null}
                    <div className={styles.mGroup}>
                      <div className={styles.m}>$ 12.65 m</div>
                      <div className={styles.solUsdc}>SOL-USDC</div>
                      <div className={styles.orca1}>Raydium</div>
                      <div className={styles.frameItem} />
                      <div className={styles.m1}>$ 2.65 m</div>
                      <div className={styles.m2}>$ 2.65 m</div>
                      <div className={styles.div}>65.64 %</div>
                      <div className={styles.m3}>$ 47.65 m</div>
                      <img
                        className={styles.solana2Icon}
                        alt=""
                        src="/solana-23@2x.png"
                      />
                      <img
                        className={styles.usdCoinUsdcLogo1Icon1}
                        alt=""
                        src="/usdcoinusdclogo-1@2x.png"
                      />
                      <img
                        className={styles.raydiumRayCoin1Icon}
                        alt=""
                        src="/raydiumraycoin-12@2x.png"
                      />
                      <div className={styles.clmm1}>AMM</div>
                      <div className={styles.openPositions2}>
                        <button
                          className={styles.createPositionButton1}
                          onClick={openRemoveAMMpopup}
                        >
                          <div className={styles.manage}>Remove Liquidity</div>
                        </button>
                        <div
                          className={styles.value}
                        >{`Value : $ 100,000.66 `}</div>
                        <div className={styles.lpTokens}>
                          LP Tokens : 15334.63 LP
                        </div>
                        <div
                          className={styles.yourShare}
                        >{`Your share : 0.01 % <`}</div>
                      </div>
                      <button
                        className={styles.createPositionButton2}
                        onClick={openAddAMMpopup}
                      >
                        <div className={styles.manage}>Add Liquidity</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rectangleParent1}>
              <div className={styles.instanceChild5} />
              <div className={styles.pools}>Pools</div>
              <a className={styles.myPositions} onClick={onMyPositionsClick}>
                My Positions
              </a>
              <button className={styles.rectangleButton} />
            </div>
          </div>
        </div>
        <Header page={"liquidity"} />
        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.earnYieldOn}>V1.0.1</p>
          <p className={styles.earnYieldOn}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isManagePositionPopupOpen && (
        <PortalPopup
          overlayColor="rgba(17, 27, 42, 0.7)"
          placement="Centered"
          onOutsideClick={closeManagePositionPopup}
        >
          <ManagePositionPopup onClose={closeManagePositionPopup} />
        </PortalPopup>
      )}
      {isManagePositionPopup1Open && (
        <PortalPopup
          overlayColor="rgba(17, 27, 42, 0.7)"
          placement="Centered"
          onOutsideClick={closeManagePositionPopup1}
        >
          <ManagePositionPopup onClose={closeManagePositionPopup1} />
        </PortalPopup>
      )}
      {isCLMMPositionpopupOpen && (
        <PortalPopup
          overlayColor="rgba(17, 27, 42, 0.7)"
          placement="Centered"
          onOutsideClick={closeCLMMPositionpopup}
        >
          <CLMMPositionpopup onClose={closeCLMMPositionpopup} />
        </PortalPopup>
      )}
      {isRemoveAMMpopupOpen && (
        <PortalPopup
          overlayColor="rgba(17, 27, 42, 0.7)"
          placement="Centered"
          onOutsideClick={closeRemoveAMMpopup}
        >
          <RemoveAMMpopup onClose={closeRemoveAMMpopup} />
        </PortalPopup>
      )}
      {isAddAMMpopupOpen && (
        <PortalPopup
          overlayColor="rgba(17, 27, 42, 0.7)"
          placement="Centered"
          onOutsideClick={closeAddAMMpopup}
        >
          <AddAMMpopup onClose={closeAddAMMpopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default IndexLiquidity;
