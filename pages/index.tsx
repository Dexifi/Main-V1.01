import type { NextPage } from "next";
import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./index.module.css";
const Index: NextPage = () => {
  const router = useRouter();

  const onFrame1Click = useCallback(() => {
    window.open("https://github.com/Dexifi");
  }, []);

  const onFrame2Click = useCallback(() => {
    window.open("https://t.me/dexifi");
  }, []);

  const onFrameButtonClick = useCallback(() => {
    window.open("https://discord.gg/q4PkFEJQ");
  }, []);

  const onFrameButton1Click = useCallback(() => {
    window.open("https://www.youtube.com/@Dexifi.");
  }, []);

  const onFrameButton2Click = useCallback(() => {
    window.open("https://twitter.com/DexifiFinance");
  }, []);

  const onFrameButton3Click = useCallback(() => {
    window.open("https://medium.com/@dexifi.finance");
  }, []);

  const onFrameButton4Click = useCallback(() => {
    window.open("https://dexifi-finances.gitbook.io/dexifi-documentation/");
  }, []);

  const onFrameButton5Click = useCallback(() => {
    window.open("https://app.dexifi.io");
  }, []);

  const onComponent5Click = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const onFrameButton6Click = useCallback(() => {
    window.open("https://dexifi-finances.gitbook.io/dexifi-blog/");
  }, []);

  return (
    <div className={styles.index1}>
      <img className={styles.circleMainIcon} alt="" src="/circle-main.svg" />
      <div className={styles.lamp} />
      <div className={styles.frameParent}>
        <div className={styles.frameChild} />
        <div className={styles.lampBot} />
        <div className={styles.lampBot1} />
        <div className={styles.lampMid} />
        <div className={styles.blur} />
        <img className={styles.circleMidIcon} alt="" src="/circle-mid.svg" />
        <img className={styles.circleMidIcon1} alt="" src="/circle-mid1.svg" />
        <img className={styles.circleBotIcon} alt="" src="/circle-bot.svg" />
        <div className={styles.footerParent}>
          <div className={styles.footer}>
            <div className={styles.frameGroup}>
              <button className={styles.frame} onClick={onFrame1Click}>
                <img className={styles.vectorIcon} alt="" src="/vector13.svg" />
              </button>
              <button className={styles.frame1} onClick={onFrame2Click}>
                <img
                  className={styles.vectorIcon1}
                  alt=""
                  src="/vector14.svg"
                />
              </button>
              <button
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
              </button>
              <button
                className={styles.groupWrapper}
                onClick={onFrameButton1Click}
              >
                <img className={styles.clipPathGroup} alt="" src="/group.svg" />
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
            <div className={styles.comesByThe}>{`Comes by The Rage `}</div>
            <img
              className={styles.sitelogo1Icon}
              alt=""
              src="/sitelogo-1@2x.png"
            />
            <a
              className={styles.whitepaper}
              href="https://dexifi.io/whitepaper.pdf"
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
            <a className={styles.coingecko} href="https://coingecko.com">
              CoinGecko
            </a>
            <a
              className={styles.documentation}
              href="https://dexifi-finances.gitbook.io/dexifi-documentation/"
            >
              Documentation
            </a>
            <div className={styles.dexifiInc}>© 2023 Dexifi, Inc.</div>
          </div>
          <div className={styles.walletutility}>
            <div className={styles.dashboardPanelProvides}>
              Dashboard panel provides users with easy access to their locker,
              live positions, and the overall state of the network. This enables
              users to better manage their portfolios and accounts, all from a
              single, high-quality user interface. By bringing everything
              together in one place, the DeFi platform offers a seamless user
              experience that makes it easy to navigate and manage all aspects
              of the platform.
            </div>
            <div className={styles.frame2}>
              <div className={styles.rectangle} />
              <div className={styles.walletUtility}>Wallet Utility</div>
              <div className={styles.rectangle1} />
            </div>
            <div className={styles.rectangleParent}>
              <div className={styles.groupChild} />
              <div className={styles.groupItem} />
              <div className={styles.groupInner} />
              <div className={styles.ellipseDiv} />
            </div>
          </div>
          <div className={styles.jup}>
            <div className={styles.rectangle2} />
            <div className={styles.frame3}>
              <div className={styles.rectangle} />
              <div className={styles.jupiter}>Jupiter</div>
            </div>
            <div
              className={styles.theBestSwap}
            >{`The best swap aggregator & infrastructure for Solana - powering best price, token selection and UX for all users and devs.`}</div>
            <img
              className={styles.jupiterLogo2Icon}
              alt=""
              src="/jupiterlogo-2.svg"
            />
            <div className={styles.frame4}>
              <div className={styles.div}>24</div>
              <div className={styles.liveDexs}>LIVE DEXs</div>
              <img className={styles.icon} alt="" src="/1.svg" />
            </div>
          </div>
          <div className={styles.ido}>
            <div className={styles.frame3}>
              <div className={styles.rectangle} />
              <div className={styles.jupiter}>IDO</div>
              <div className={styles.rectangle5} />
            </div>
            <div className={styles.dexifiPlatformIs}>
              Dexifi platform is dedicated to bringing the best ideas for
              creating new blockchain services that empower decentralization
              across the network. By leveraging the power of blockchain
              technology, Dexifi aims to revolutionize the financial industry
              and provide users with access to financial services that are
              transparent, secure, and decentralized. With a focus on innovation
              and user experience, Dexifi is driving the next wave of
              blockchain-based services and creating a new sensation in the
              world of finance.
            </div>
            <div className={styles.frame6}>
              <div className={styles.div}>3</div>
              <div
                className={styles.totalProjectLunched}
              >{`total Project Lunched `}</div>
              <img className={styles.icon} alt="" src="/11.svg" />
            </div>
            <img
              className={styles.image3Copy1}
              alt=""
              src="/image-3-copy-1@2x.png"
            />
          </div>
          <div className={styles.trade}>
            <div className={styles.rectangle6} />
            <div className={styles.frame3}>
              <div className={styles.rectangle} />
              <div className={styles.jupiter}>Trade</div>
            </div>
            <div className={styles.tradeChild} />
            <img className={styles.tradeItem} alt="" src="/polygon-1.svg" />
            <div className={styles.tradeInner} />
            <img className={styles.polygonIcon} alt="" src="/polygon-2.svg" />
            <div className={styles.dexifisTradingFeature}>
              Dexifi's trading feature provides access to all Solana network
              order books, with a user-friendly interface, and integrates with
              Openbook for the best trading experience.
            </div>
            <div className={styles.frame8}>
              <div className={styles.div}>133,546</div>
              <div className={styles.totalProjectLunched}>Live Pools</div>
              <img className={styles.icon} alt="" src="/2.svg" />
            </div>
          </div>
          <div className={styles.liquidity}>
            <div className={styles.frame3}>
              <div className={styles.rectangle} />
              <div className={styles.jupiter}>Liquidity</div>
              <div className={styles.rectangle9} />
            </div>
            <img
              className={styles.cc72fDc654a1dA1b7Cc4ce95daIcon}
              alt=""
              src="/806cc72fdc654a1da1b7cc4ce95da481-copy-1@2x.png"
            />
            <div className={styles.platformOffersUsers}>
              Platform offers users access to some of the largest AMM and CLMM
              pools available, providing them with a wide range of investment
              options to choose from. The platform is designed to be
              user-friendly and efficient, making it easy for anyone to navigate
              and invest in their preferred assets. With a diverse range of
              options and a simple interface, Dexifi is the perfect platform for
              anyone looking to explore the world of decentralized finance.
            </div>
            <div className={styles.frame10}>
              <div className={styles.div3}>164,687,546.67 $</div>
              <div className={styles.totalProjectLunched}>
                total Liquidity accessble
              </div>
              <img className={styles.icon} alt="" src="/21.svg" />
            </div>
          </div>
          <div className={styles.magicedan}>
            <div className={styles.frame3}>
              <div className={styles.rectangle} />
              <div className={styles.jupiter}>Magic Edan</div>
              <div className={styles.rectangle11} />
            </div>
            <div
              className={styles.theNftMarketplace}
            >{`The NFT Marketplace Solana deserves, smooth as silk & fast as Solana.the biggest and most liquid NFT marketplace globally and home to the next generation of digital creators.`}</div>
            <img className={styles.image1Icon} alt="" src="/image-11@2x.png" />
            <div className={styles.frame12}>
              <div className={styles.div}>168,897 SOL</div>
              <div className={styles.totalProjectLunched}>MARKET Value</div>
              <img className={styles.icon} alt="" src="/3.svg" />
            </div>
          </div>
          <div className={styles.solana}>
            <div className={styles.frame13}>
              <div className={styles.div}>168 B</div>
              <div
                className={styles.totalProjectLunched}
              >{`total transaction `}</div>
              <img className={styles.icon} alt="" src="/1.svg" />
            </div>
            <div className={styles.dontKeepYour}>
              Don’t keep your users waiting. Solana has block times of 400
              milliseconds — and as hardware gets faster, so will the network.
            </div>
            <div className={styles.frame3}>
              <div className={styles.rectangle} />
              <div className={styles.solana1}>Solana</div>
              <div className={styles.rectangle13} />
            </div>
            <img className={styles.solana1Icon} alt="" src="/solana-1@2x.png" />
          </div>
          <div className={styles.dexifi}>
            <div className={styles.div4}>0.00 %</div>
            <div className={styles.platformFee}>platform fee</div>
            <div className={styles.enablesUsersTo}>
              Enables users to access financial services without intermediaries,
              and it operates on a transparent and secure blockchain network.
              With zero platform fees and an open-source code, Dexifi offers a
              user-friendly and accessible alternative to traditional finance.
            </div>
            <div className={styles.frame15}>
              <div className={styles.rectangle} />
              <div className={styles.walletUtility}>Dexifi</div>
              <div className={styles.rectangle15} />
            </div>
            <img
              className={styles.dexifiLogoIcon}
              alt=""
              src="/dexifi-logo@2x.png"
            />
          </div>
          <div className={styles.newSensationOfFullDefiPowParent}>
            <div className={styles.newSensationOfContainer}>
              <p className={styles.newSensationOfFull}>
                <b>
                  <span
                    className={styles.newSensation}
                  >{`New Sensation `}</span>
                  <span className={styles.ofFull}>{`of Full `}</span>
                </b>
              </p>
              <p className={styles.defiPower}>DeFi Power</p>
            </div>
            <b className={styles.aModernApproach}>
              A Modern Approach To Earn More
            </b>
            <div className={styles.modernProblemsNeedContainer}>
              <p className={styles.newSensationOfFull}>
                Modern Problems Need Modern Solutions, Invest in Dexifi and take
                advantage of the innovative decentralized finance ecosystem.
              </p>
              <p className={styles.newSensationOfFull}>
                Dexifi unlocks a world of decentralized applications, providing
                users with diverse opportunities to explore and engage with the
                decentralized finance ecosystem.
              </p>
            </div>
            <button
              className={styles.readDocsWrapper}
              onClick={onFrameButton4Click}
            >
              <div className={styles.readDocs}>Read Docs</div>
            </button>
            <button
              className={styles.launchAppWrapper}
              onClick={onFrameButton5Click}
            >
              <div className={styles.launchApp}>Launch App</div>
            </button>
            <img
              className={styles.component5Icon}
              alt=""
              src="/component-5.svg"
              onClick={onComponent5Click}
            />
            <button
              className={styles.readBlogWrapper}
              onClick={onFrameButton6Click}
            >
              <div className={styles.readDocs}>Read Blog</div>
            </button>
            <div className={styles.withDexifiYou}>
              With Dexifi, you can enjoy fast and low-cost transactions, making
              it ideal for everyday use and global remittances.
            </div>
            <img className={styles.image2Icon} alt="" src="/image-2@2x.png" />
            <div className={styles.total}>
              <div className={styles.totalTradeValueWrapper}>
                <div
                  className={styles.totalTradeValue}
                >{`Total Trade Value `}</div>
              </div>
              <div className={styles.frame16}>
                <div className={styles.parent}>
                  <img className={styles.icon6} alt="" src="/31.svg" />
                  <div className={styles.div5}>{`168,643,515.08 $ `}</div>
                </div>
              </div>
            </div>
            <div className={styles.total1}>
              <div className={styles.totalTradeValueWrapper}>
                <div
                  className={styles.totalTradeValue}
                >{`Total Value Locked `}</div>
              </div>
              <div className={styles.frame16}>
                <div className={styles.parent}>
                  <img className={styles.icon6} alt="" src="/31.svg" />
                  <div className={styles.div5}>{`168,643,515.08 $ `}</div>
                </div>
              </div>
            </div>
            <div className={styles.total2}>
              <div className={styles.totalUsersCountWrapper}>
                <div className={styles.totalUsersCount}>Total Users Count</div>
              </div>
              <div className={styles.frame16}>
                <div className={styles.frameDiv}>
                  <img className={styles.icon6} alt="" src="/31.svg" />
                  <div className={styles.div7}>10,561</div>
                </div>
              </div>
            </div>
            <img className={styles.mockupIcon} alt="" src="/mockup.svg" />
          </div>
        </div>
      </div>
      <div className={styles.header}>
        <img className={styles.dexfiCopy1} alt="" src="/dexfi-copy-1@2x.png" />
        <div className={styles.docParent}>
          <a
            className={styles.doc}
            href="https://dexifi-finances.gitbook.io/dexifi-documentation/"
          >
            Doc
          </a>
          <Link className={styles.lunchApp} href="/dashboard">
            Lunch App
          </Link>
          <a
            className={styles.blog1}
            href="https://dexifi-finances.gitbook.io/dexifi-blog/"
          >
            Blog
          </a>
        </div>
      </div>
      <img
        className={styles.financeusdCircleIcon}
        alt=""
        src="/financeusdcircle.svg"
      />
    </div>
  );
};

export default Index;
