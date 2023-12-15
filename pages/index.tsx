import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import { connection } from '../utils/get-connection';

const Index: NextPage = () => {
  const router = useRouter();

  const onFrame1Click = useCallback(() => {
    window.open('https://github.com/Dexifi');
  }, []);

  const onFrame2Click = useCallback(() => {
    window.open('https://t.me/dexifi');
  }, []);

  const onFrameButtonClick = useCallback(() => {
    window.open('https://discord.gg/q4PkFEJQ');
  }, []);

  const onFrameButton1Click = useCallback(() => {
    window.open('https://www.youtube.com/@Dexifi.');
  }, []);

  const onFrameButton2Click = useCallback(() => {
    window.open('https://twitter.com/DexifiFinance');
  }, []);

  const onFrameButton3Click = useCallback(() => {
    window.open('https://medium.com/@dexifi.finance');
  }, []);

  const onFrameButton4Click = useCallback(() => {
    window.open('https://dexifi-finances.gitbook.io/dexifi-documentation/');
  }, []);

  const onFrameButton5Click = useCallback(() => {
    window.open('https://app.dexifi.io');
  }, []);

  const onComponent5Click = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  const onFrameButton6Click = useCallback(() => {
    window.open('https://dexifi-finances.gitbook.io/dexifi-blog/');
  }, []);
  const [transactionsCount, setTransactionsCount] = useState(0);
  connection.getTransactionCount().then((res) => {
    setTransactionsCount(res);
  });

  const [isMenuActive, setMenuActive] = useState(false);

  const openMenu = () => {
    setMenuActive(true);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <img
          className={styles.mainLogo}
          alt=""
          src="/dexfi-copy-1@2x.png"
        />

        <div className={`${styles.menu} ${isMenuActive
          ? styles.menuActive
          : ''}`}>
          <div className={styles.menuContent}
               onClick={(event) => event.stopPropagation()}>
        <button
          className={`${styles.menuButton} ${isMenuActive ? styles.inactiveButton : styles.activeButton}`}
          onClick={openMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            viewBox="0 0 448 512"
          >
            <path
              fill="#ffffff"
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </button>

        <button
          className={`${styles.menuButton} ${isMenuActive ? styles.activeButton : styles.inactiveButton}`}
          onClick={closeMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
            <path fill="#ffffff"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </button>

        <div
          className={`${styles.headerLinks} ${isMenuActive ? styles.activeMenu : ''
          }`}>
          <a href="https://dexifi-finances.gitbook.io/dexifi-blog/">Blog</a>
          <a href="https://dexifi-finances.gitbook.io/dexifi-documentation/">
            Doc
          </a>
          <Link href="/dashboard">Launch App</Link>
        </div>
          </div>
        </div>
      </div>

      <div className={styles.lamp}/>

      <div>
        <img
          className={styles.mainCircle}
          alt=""
          src="/main-circle.png"
        />
        <img
          className={styles.circleMidIcon}
          alt=""
          src="/circle-mid.svg"
        />
        <img
          className={styles.circleBotIcon}
          alt=""
          src="/circle-bot.svg"
        />
        <img
          className={`${styles.blur1} ${styles.blur}`}
          alt=""
          src="/Lamp-Mid.png"
        />
        <img
          className={`${styles.blur2} ${styles.blur}`}
          alt=""
          src="/lamp-bot.png"
        />
        <img
          className={`${styles.blur3} ${styles.blur}`}
          alt=""
          src="/lamp-bot2.png"
        />
        <div className={styles.mainContent}>
          <div className={`${styles.firstScreen}`}>
            <section className={styles.firstScreenSection}>
              <span className={styles.firstScreenTitle}>
                New Sensation of Full
              </span>
              <p className={styles.firstScreenSubTitle}>DeFi Power</p>
            </section>
            <div className={styles.firstScreenDescription}>
              With Dexifi, you can enjoy fast and low-cost transactions, making
              it ideal for everyday use and global remittances.
            </div>
            <button
              className={`${styles.firstScreenButton} ${styles.firstScreenReadDocs}`}
              onClick={onFrameButton4Click}
            >
              <p className={styles.firstScreenButtonTitle}>Read Docs</p>
            </button>

            <img
              className={styles.image2Icon}
              alt=""
              src="/image-2@2x.png"
            />

            <span className={styles.firstScreenTitle}>
              A Modern Approach To Earn More
            </span>
            <div className={styles.firstScreenDescriptionSecond}>
              <p>
                Modern Problems Need Modern Solutions, Invest in Dexifi and take
                advantage of the innovative decentralized finance ecosystem.
                Dexifi unlocks a world of decentralized applications, providing
                users with diverse opportunities to explore and engage with the
                decentralized finance ecosystem.
              </p>
            </div>
            <button
              className={styles.firstScreenButton}
              onClick={onFrameButton6Click}
            >
              <div className={styles.firstScreenButtonTitle}>Read Blog</div>
            </button>

            <img
              className={styles.firstScreenLaptop}
              alt=""
              src="/mockup.svg"
            />
            <img
              className={styles.firstScreenStartButton}
              alt=""
              src="/component-5.svg"
              onClick={onComponent5Click}
            />
          </div>

          <div className={`${styles.statistics}`}>
            <div className={`${styles.statisticsRow} ${styles.statisticsRow1}`}>
              <div className={styles.statisticsDexifiBlock}>
                <div className={styles.statisticsDexifiTitleContainer}>
                  <div className={styles.nameTitleContainer}>
                    <div className={styles.rectangle15}></div>
                    <h4>Dexifi</h4>
                  </div>
                  <img
                    className={styles.dexifiLogoIcon}
                    alt=""
                    src="/dexifi-logo@2x.png"
                  />
                </div>
                <p className={styles.statisticText}>
                  Enables users to access financial services without
                  intermediaries, and it operates on a transparent and secure
                  blockchain network. With zero platform fees and an open-source
                  code, Dexifi offers a user-friendly and accessible alternative
                  to traditional finance.
                </p>
                <div className={styles.statisticsInnerRow}>
                  <div className={styles.statisticsInnerRowTitle}>
                    platform fee
                  </div>
                  <div className={styles.statisticsInnerRowPrice}>0.00 %</div>
                </div>
              </div>
              <div className={styles.solanaBlock}>
                <div className={styles.solanaTitleBlock}>
                  <div className={styles.nameTitleContainer}>
                    <div className={styles.solanaBlockRectangle}/>
                    <h4 className={styles.solanaTitle}>Solana</h4>
                  </div>
                  <img
                    className={styles.solanaIcon}
                    alt=""
                    src="/solana-1@2x.png"
                  />
                </div>
                <p className={styles.solanaDescription}>
                  Don’t keep your users waiting. Solana has block times of 400
                  milliseconds — and as hardware gets faster, so will the
                  network.
                </p>
                <div className={styles.solanaPriceBlock}>
                  <div className={styles.solanaPrice}>
                    {Math.round(transactionsCount / 1_000_000_000)} B
                  </div>
                  <p className={styles.totalProjectLunched}>
                    total transaction
                  </p>
                  <img
                    className={styles.solanaDotIcon}
                    alt=""
                    src="/1.svg"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.statisticsRow} ${styles.statisticsRow2}`}>
              <div className={styles.walletUtilityBlock}>
                <div className={styles.walletUtilityBlockHeader}>
                  <div className={styles.nameTitleContainer}>
                    <div className={styles.rectangle1}/>
                    <h4>Wallet Utility</h4>
                  </div>
                  <div className={styles.rectangleParent}>
                    <div className={styles.groupChild}/>
                    <div className={styles.groupItem}/>
                    <div className={styles.groupInner}/>
                    <div className={styles.ellipseDiv}/>
                  </div>
                </div>

                <p className={styles.walletUtilityDescription}>
                  Dashboard panel provides users with easy access to their
                  locker, live positions, and the overall state of the network.
                  This enables users to better manage their portfolios and
                  accounts, all from a single, high-quality user interface. By
                  bringing everything together in one place, the DeFi platform
                  offers a seamless user experience that makes it easy to
                  navigate and manage all aspects of the platform.
                </p>
              </div>
              <div className={styles.jupiterBlock}>
                <div className={styles.statisticTitleContainer}>
                  <div className={styles.nameTitleContainer}>
                    <div className={styles.rectangle2}/>
                    <h4 className={styles.jupiterTitle}>Jupiter</h4>
                  </div>
                  <img
                    className={styles.jupiterLogoIcon}
                    alt=""
                    src="/jupiterlogo-2.svg"
                  />
                </div>

                <p className={styles.jupiterDescription}>
                  The best swap aggregator & infrastructure for Solana -
                  powering best price, token selection and UX for all users and
                  devs.
                </p>

                <div className={styles.solanaPriceBlock}>
                  <p className={styles.solanaPrice}>24</p>
                  <p className={styles.totalProjectLunched}>LIVE DEXs</p>
                  <img
                    className={styles.solanaDotIcon}
                    alt=""
                    src="/1.svg"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.statisticsRow} ${styles.statisticsRow3}`}>
              <div className={styles.magicedanBlock}>
                <div className={styles.statisticTitleContainer}>
                  <div className={styles.nameTitleContainer}>
                    <div className={styles.rectangle11}/>
                    <h4 className={styles.magicedanTitle}>Magic Edan</h4>
                  </div>
                  <img
                    className={styles.magicedanIcon}
                    alt=""
                    src="/image-11@2x.png"
                  />
                </div>

                <p className={styles.magicedanDescription}>
                  The NFT Marketplace Solana deserves, smooth as silk & fast as
                  Solana.the biggest and most liquid NFT marketplace globally
                  and home to the next generation of digital creators.
                </p>

                <div className={styles.solanaPriceBlock}>
                  <p className={styles.solanaPrice}>168,897 SOL</p>
                  <p className={styles.totalProjectLunched}>MARKET Value</p>
                  <img
                    className={styles.solanaDotIcon}
                    alt=""
                    src="/3.svg"
                  />
                </div>
              </div>

              <div className={styles.idoBlock}>
                <div className={styles.statisticTitleContainer}>
                  <div className={styles.nameTitleContainer}>
                    <div className={styles.rectangle5}/>
                    <h4>IDO</h4>
                  </div>
                  <img
                    className={styles.idoBlockLogo}
                    alt=""
                    src="/image-3-copy-1@2x.png"
                  />
                </div>

                <p className={styles.idoDescription}>
                  Dexifi platform is dedicated to bringing the best ideas for
                  creating new blockchain services that empower decentralization
                  across the network. By leveraging the power of blockchain
                  technology, Dexifi aims to revolutionize the financial
                  industry and provide users with access to financial services
                  that are transparent, secure, and decentralized. With a focus
                  on innovation and user experience, Dexifi is driving the next
                  wave of blockchain-based services and creating a new sensation
                  in the world of finance.
                </p>
                <div className={styles.solanaPriceBlock}>
                  <p className={styles.solanaPrice}>3</p>
                  <p className={styles.totalProjectLunched}>
                    TOTAL PROJECT LAUNCHED
                  </p>
                  <img
                    className={styles.solanaDotIcon}
                    alt=""
                    src="/11.svg"
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.statisticsRow} ${styles.statisticsRow4}`}>
              <div className={styles.liquidityBlock}>
                <div className={styles.statisticTitleContainer}>
                  <div className={styles.nameTitleContainer}>
                    <div className={styles.rectangle9}/>
                    <h4>Liquidity</h4>
                  </div>
                  <img
                    className={styles.liquidityIcon}
                    alt=""
                    src="/806cc72fdc654a1da1b7cc4ce95da481-copy-1@2x.png"
                  />
                </div>

                <p className={styles.liquidityDescription}>
                  Platform offers users access to some of the largest AMM and
                  CLMM pools available, providing them with a wide range of
                  investment options to choose from. The platform is designed to
                  be user-friendly and efficient, making it easy for anyone to
                  navigate and invest in their preferred assets. With a diverse
                  range of options and a simple interface, Dexifi is the perfect
                  platform for anyone looking to explore the world of
                  decentralized finance.
                </p>
                <div className={styles.solanaPriceBlock}>
                  <p className={styles.solanaPrice}>164,687,546.67 $</p>
                  <p className={styles.totalProjectLunched}>
                    TOTAL LIQUIDITY ACCESSIBLE
                  </p>
                  <img
                    className={styles.solanaDotIcon}
                    alt=""
                    src="/21.svg"
                  />
                </div>
              </div>

              <div className={styles.tradeBlock}>
                <div className={styles.statisticTitleContainer}>
                  <div className={styles.nameTitleContainer}>
                    <div className={styles.rectangle6}/>
                    <h4>Trade</h4>
                  </div>
                  <img
                    className={styles.tradeBlockImg}
                    alt=""
                    src="/polygon-logo.svg"
                  />
                </div>

                <p className={styles.tradePriceDescription}>
                  Dexifi's trading feature provides access to all Solana network
                  order books, with a user-friendly interface, and integrates
                  with Openbook for the best trading experience.
                </p>
                <div className={styles.solanaPriceBlock}>
                  <p className={styles.solanaPrice}>133,546</p>
                  <p className={styles.totalProjectLunched}>Live Pools</p>
                  <img
                    className={styles.solanaDotIcon}
                    alt=""
                    src="/2.svg"
                  />
                </div>
              </div>
            </div>
          </div>

          <footer className={styles.footer}>
            <div className={styles.footerContainer}>
              <img
                className={styles.dexifiLogoIcon}
                alt=""
                src="/sitelogo-1@2x.png"
              />
              <div className={styles.dexifiInc}>© 2023 Dexifi, Inc.</div>
              <div className={styles.comesByThe}>{`Comes by The Rage `}</div>
              <div className={styles.footerLinks}>
                <button
                  className={styles.footerLink}
                  onClick={onFrame1Click}
                >
                  <img
                    className={styles.vectorIcon}
                    alt=""
                    src="/vector13.svg"
                  />
                </button>
                <button
                  className={styles.frame1}
                  onClick={onFrame2Click}
                >
                  <img
                    className={styles.vectorIcon1}
                    alt=""
                    src="/vector14.svg"
                  />
                </button>
                <div
                  className={styles.groupWrapper}
                  onClick={onFrameButtonClick}
                >
                  <button className={styles.group}>
                    <img
                      className={styles.clipPathGroup}
                      alt=""
                      src="/clip-path-group.svg"
                    />
                  </button>
                </div>
                <button
                  className={styles.groupWrapper}
                  onClick={onFrameButton1Click}
                >
                  <img
                    className={styles.clipPathGroup}
                    alt=""
                    src="/group.svg"
                  />
                </button>
                <button
                  className={styles.groupWrapper}
                  onClick={onFrameButton2Click}
                >
                  <img
                    className={styles.clipPathGroup}
                    alt=""
                    src="/group1.svg"
                  />
                </button>
                <button
                  className={styles.groupWrapper}
                  onClick={onFrameButton3Click}
                >
                  <img
                    className={styles.clipPathGroup}
                    alt=""
                    src="/group-1.svg"
                  />
                </button>
              </div>
            </div>

            <div className={styles.footerNav}>
              <a
                className={styles.whitepaper}
                href="/Dexifi Protocol Whitepaper.pdf"
              >
                Whitepaper
              </a>
              <a
                className={styles.blog}
                href="https://dexifi-finances.gitbook.io/dexifi-blog/"
              >
                Blog
              </a>
              <a
                className={styles.coinmarketcap}
                href="https://coinmarketcap.com"
              >
                CoinMarketCap
              </a>
              <a
                className={styles.coingecko}
                href="https://coingecko.com"
              >
                CoinGecko
              </a>
              <a
                className={styles.documentation}
                href="https://dexifi-finances.gitbook.io/dexifi-documentation/"
              >
                Documentation
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
