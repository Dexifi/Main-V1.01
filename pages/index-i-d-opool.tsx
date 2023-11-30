import type { NextPage } from 'next';
import { useState, useRef, useCallback } from 'react';
import WalletSetting from '../components/wallet-setting';
import PortalPopup from '../components/portal-popup';
import DisconnectSetting from '../components/disconnect-setting';
import styles from './index-i-d-opool.module.css';
import global from './global-classes.module.css';
import Header from '../components/header';
const IndexIDOpool: NextPage = () => {
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const [isWalletSettingPopupOpen, setWalletSettingPopupOpen] = useState(false);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const [isDisconnectSettingPopupOpen, setDisconnectSettingPopupOpen] =
    useState(false);

  const closeWalletSettingPopup = useCallback(() => {
    setWalletSettingPopupOpen(false);
  }, []);

  const closeDisconnectSettingPopup = useCallback(() => {
    setDisconnectSettingPopupOpen(false);
  }, []);

  const onHowToParticipateClick = useCallback(() => {
    window.open('www.dexifi.io');
  }, []);

  const onSocialGithubIconCopyClick = useCallback(() => {
    window.open('github.com');
  }, []);

  const onTelegramSocialMediaLogoMesIconClick = useCallback(() => {
    window.open('t.me/dexifi');
  }, []);

  const onDiscordGameGamingVoiceChatIconClick = useCallback(() => {
    window.open('discord.com');
  }, []);

  const onLogoMediaPlaySocialYoutubeIconClick = useCallback(() => {
    window.open('Youtube.com');
  }, []);

  const onMediumMediumLogoIconCopyClick = useCallback(() => {
    window.open('medium.com');
  }, []);

  const onTweetTwitterTwitterLogoIcoIconClick = useCallback(() => {
    window.open('https://twitter.com/');
  }, []);

  const onStakeClick = useCallback(() => {
    window.open('nft.dexifi.io');
  }, []);

  return (
    <>
      <div className={styles.indexidopool}>
        <div className={styles.lamp} />
        <Header page={'ido'} />
        <div className={styles.liquidityPanel}>
          <div className={styles.listPanel1}>
            <div className={styles.listPanelInner}>
              <img
                className={styles.prismathic1Icon}
                alt=''
                src='/prismathic-1@2x.png'
              />
              <div className={`${global.column} ${global.spaceBetween}`}>
                <div className={`${global.column}`}>
                  <div className={`${styles.rowGrid} `}>
                    <div className={styles.idoTitle}>PRM</div>
                    <div className={styles.idoTitle}>Total Raise</div>
                    <div className={styles.idoTitle}>
                      <p className={styles.idoTitle}>Pool open</p>
                    </div>

                    <div className={styles.idoTitle}>Ticket Raise</div>
                    <div className={styles.idoTitle}>Trade Available From</div>
                  </div>
                  <div className={`${styles.rowGrid} `}>
                    <div className={styles.idoText}>
                      <p className={styles.idoText}>Prismatic</p>
                    </div>
                    <div className={styles.idoText}>
                      <p className={styles.idoText}>30,000,000.00 PRM</p>
                    </div>
                    <div className={styles.idoText}>2022-04-20 22:00 UTC</div>
                    <div className={styles.idoText}>
                      <p className={styles.idoText}>233</p>
                    </div>
                    <div className={styles.idoText}>2022-04-20 22:00 UTC</div>
                  </div>
                </div>
                <div className={`${global.column}`}>
                  <div className={`${styles.rowGrid} `}>
                    <div className={styles.idoTitle}>Per DXE</div>
                    <div className={styles.idoTitle}>
                      Allocation / Winning Ticket
                    </div>
                    <div className={styles.idoTitle}>
                      <p className={styles.idoTitle}>Pool Close</p>
                    </div>
                    <div className={styles.idoTitle}>Max Winners</div>
                    <div className={styles.idoTitle}>
                      <p className={styles.idoTitle}>Status</p>
                    </div>
                  </div>
                  <div className={`${styles.rowGrid} `}>
                    <div className={styles.idoText}>$ 0.000012</div>

                    <div className={styles.idoText}>$ 1.00</div>
                    <div className={styles.idoText}>2022-04-20 22:00 UTC</div>
                    <div className={styles.idoText}>36</div>
                    <div className={styles.idoText}>Open</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frameParent6}>
              <div className={styles.roiAthWrapper}>
                <div className={styles.roiAth}>ROI (ATH)</div>
              </div>
              <div className={styles.x8Wrapper}>
                <div className={styles.x8}>
                  <p className={styles.theNirvanaProtocol}>700.00 %</p>
                  <p className={styles.theNirvanaProtocol}>x8</p>
                </div>
              </div>
            </div>
            <div className={styles.frameParent7}>
              <div className={styles.poolFillUpWrapper}>
                <div className={styles.div}>Pool Fill up</div>
              </div>
              <div className={styles.wrapper63}>
                <b className={styles.b}>547 %</b>
              </div>
            </div>
            <img
              className={styles.bg1Icon}
              alt=''
              src='/bg-1@2x.png'
            />
          </div>
          <div className={styles.listPanel}>
            <div className={`${styles.gridRowDescription}`}>
              <div className={`${global.column} ${global.spaceBetween}`}>
                <div className={`${global.column}`}>
                  <div className={styles.projectBanner}>Project Banner</div>
                  <div className={`${global.row} ${global.spaceBetween}`}>
                    <div className={styles.projectDetail}>Project Detail</div>
                    <div
                      className={styles.howToParticipate}
                      onClick={onHowToParticipateClick}
                    >
                      How to Participate
                    </div>
                  </div>
                  <div className={styles.theNirvanaProtocolContainer}>
                    <p className={styles.theNirvanaProtocol}>
                      The Nirvana protocol is a twin system that produces $ANA,
                      a volatile token with an algorithmically rising floor
                      price, as well as $NIRV, a decentralized superstable coin
                      with a delegated peg.
                    </p>
                    <p className={styles.theNirvanaProtocol}>
                      Nirvana’s virtual AMM enables the minting of ANA from a
                      diverse set of trusted stablecoin options. ANA’s price is
                      free to appreciate, but the minimum floor price rises
                      algorithmically as stablecoin reserves increase.
                    </p>
                    <p className={styles.theNirvanaProtocol}>
                      Zero liquidation-risk loans of the superstable NIRV token
                      can be taken by staking ANA. Loans have a negative
                      interest rate by virtue of prANA reward emissions, meaning
                      users earn yield on debt.
                    </p>
                    <p
                      className={styles.theNirvanaProtocol}
                    >{`Yield for staking ANA and taking NIRV loans is distributed in prANA (pre-ANA), which are tokens that act as non-expiring options to mint ANA at its floor price. `}</p>
                  </div>
                </div>
                <div
                  className={`${global.row} ${global.spaceBetween} ${global.alignCenter}`}
                >
                  <a
                    className={styles.stake}
                    onClick={onStakeClick}
                  >
                    Project Website
                  </a>
                  <div className={styles.socialGithubIconCopyParent}>
                    <img
                      className={styles.socialGithubIconCopy}
                      alt=''
                      src='/211904-social-github-icon-copy@2x.png'
                      onClick={onSocialGithubIconCopyClick}
                    />
                    <img
                      className={styles.telegramSocialMediaLogoMesIcon}
                      alt=''
                      src='/7693324-telegram-social-media-logo-messenger-icon-copy@2x.png'
                      onClick={onTelegramSocialMediaLogoMesIconClick}
                    />
                    <img
                      className={styles.telegramSocialMediaLogoMesIcon}
                      alt=''
                      src='/5474122-discord-game-gaming-voice-chat-icon-copy-2@2x.png'
                      onClick={onDiscordGameGamingVoiceChatIconClick}
                    />
                    <img
                      className={styles.telegramSocialMediaLogoMesIcon}
                      alt=''
                      src='/1964418-logo-media-play-social-youtube-icon-copy@2x.png'
                      onClick={onLogoMediaPlaySocialYoutubeIconClick}
                    />
                    <img
                      className={styles.telegramSocialMediaLogoMesIcon}
                      alt=''
                      src='/7088889-medium-medium-logo-icon-copy@2x.png'
                      onClick={onMediumMediumLogoIconCopyClick}
                    />
                    <img
                      className={styles.telegramSocialMediaLogoMesIcon}
                      alt=''
                      src='/5305173-tweet-twitter-twitter-logo-icon-copy@2x.png'
                      onClick={onTweetTwitterTwitterLogoIcoIconClick}
                    />
                  </div>
                </div>
              </div>
              <div className={`${global.column} ${styles.rightContainer}`}>
                <div className={styles.container}>
                  <div className={styles.luckyEndingNumbers}>
                    Lucky Ending Numbers
                  </div>
                  <div className={styles.div67}>
                    01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15,
                    16, 17, 18, 19, 20, 22, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                    30, 31, 32, 33, 34, 35, 34, 35, 36,
                  </div>
                </div>

                <div className={styles.container}>
                  <div className={`${global.row} ${global.spaceBetween}`}>
                    <div className={styles.tickets1}>Tickets</div>
                    <div className={styles.eligibleTickets0Container}>
                      <p className={styles.theNirvanaProtocol}>
                        Eligible tickets: 0
                      </p>
                    </div>
                  </div>

                  <div className={styles.group1Copy1Parent}>
                    <img
                      className={styles.group1Copy1}
                      alt=''
                      src='/group-1-copy-1@2x.png'
                    />
                    <button className={styles.maxbutton}>
                      <div className={styles.max}>Max</div>
                    </button>
                    <input
                      className={styles.frameChild}
                      type='number'
                    />
                  </div>
                </div>
                <div className={styles.container}>
                  <div className={`${global.row} ${global.spaceBetween}`}>
                    <div className={styles.tickets1}>Deposit</div>
                    <div className={styles.eligibleTickets0Container}>
                      Balance: 0
                    </div>
                  </div>
                  <div className={`${global.row} ${global.spaceBetween}`}>
                    <div className={styles.usdCoinUsdcLogo1Parent}>
                      <img
                        className={styles.usdCoinUsdcLogo1Icon}
                        alt=''
                        src='/usdcoinusdclogo-1@2x.png'
                      />
                      <div className={styles.usdc1}>USDC</div>
                    </div>
                    <input
                      className={styles.frameItem}
                      type='number'
                    />
                  </div>
                </div>
                <button className={styles.createPositionButton}>
                  <div className={styles.claimTokens}>Deposit</div>
                </button>
                <div className={styles.container}>
                  <div className={styles.yourCanClaim}>Your Can Claim</div>
                  <div className={styles.usdc16666666666Prm}>
                    <p className={styles.theNirvanaProtocol}>63 USDC</p>
                    <p className={styles.theNirvanaProtocol}>
                      166,666.66666 PRM
                    </p>
                  </div>
                </div>
                <button className={styles.createPositionButton}>
                  <div className={styles.claimTokens}>Claim Tokens</div>
                </button>
              </div>
            </div>

            <div className={styles.frameParent}>
              <div className={`${global.column} ${global.spaceBetween}`}>
                <div className={styles.yourTicketsParent}>
                  <div className={styles.yourTickets}>Your Tickets</div>
                  <div className={styles.tickets}>65 Tickets</div>
                </div>
                <div className={styles.yourWonParent}>
                  <div className={styles.yourWon}>Your Won</div>
                  <div className={styles.div66}>35</div>
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.frameContainer}>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100001</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100002</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100003</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100004</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100005</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100006</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100007</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100008</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100009</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100010</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100011</div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameContainer}>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100012</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100013</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100014</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100015</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100016</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100017</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100018</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100019</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100020</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100021</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100022</div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameContainer}>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100023</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100024</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100025</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100026</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100027</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100028</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100029</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100030</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100031</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100032</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100033</div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameContainer}>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100034</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100035</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector17.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100036</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100037</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100038</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100039</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100040</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100041</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100042</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100043</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100044</div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameContainer}>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100045</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100046</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100047</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100048</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100049</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100050</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100051</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100052</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100053</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100054</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100055</div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameContainer}>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100056</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100057</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100058</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100059</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100060</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100061</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100062</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.circleCheckRegular1Icon}
                      alt=''
                      src='/circlecheckregular-1.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100063</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent59}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.div}>100064</div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100065</div>
                    </div>
                  </div>
                  <div className={styles.vectorParent}>
                    <img
                      className={styles.vectorIcon}
                      alt=''
                      src='/vector2.svg'
                    />
                    <div className={styles.wrapper}>
                      <div className={styles.div}>100066</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.theNirvanaProtocol}>V1.0.1</p>
          <p className={styles.theNirvanaProtocol}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isWalletSettingPopupOpen && (
        <PortalPopup
          overlayColor='rgba(13, 17, 27, 0.7)'
          placement='Top right'
          top={-520}
          relativeLayerRef={frameButtonRef}
          onOutsideClick={closeWalletSettingPopup}
        >
          <WalletSetting onClose={closeWalletSettingPopup} />
        </PortalPopup>
      )}
      {isDisconnectSettingPopupOpen && (
        <PortalPopup
          overlayColor='rgba(13, 17, 27, 0.7)'
          placement='Top right'
          top={-250}
          relativeLayerRef={frameButton1Ref}
          onOutsideClick={closeDisconnectSettingPopup}
        >
          <DisconnectSetting onClose={closeDisconnectSettingPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default IndexIDOpool;
