import type { NextPage } from "next";
import { useState, useCallback } from "react";
import Sendnftpopup from "./sendnftpopup";
import PortalPopup from "./portal-popup";
import Burnnftpopup from "./burnnftpopup";
import styles from "./managenftpopup.module.css";

type ManagenftpopupType = {
  onClose?: () => void;
};

const Managenftpopup: NextPage<ManagenftpopupType> = ({ onClose, NFT }) => {
  const [isSendnftpopupOpen, setSendnftpopupOpen] = useState(false);
  const [isBurnnftpopupOpen, setBurnnftpopupOpen] = useState(false);

  const openSendnftpopup = useCallback(() => {
    setSendnftpopupOpen(true);
  }, []);

  const closeSendnftpopup = useCallback(() => {
    setSendnftpopupOpen(false);
  }, []);

  const openBurnnftpopup = useCallback(() => {
    setBurnnftpopupOpen(true);
  }, []);

  const closeBurnnftpopup = useCallback(() => {
    setBurnnftpopupOpen(false);
  }, []);
  console.log(NFT);
  return (
    <>
      <div className={styles.managenftpopup}>
        <div className={styles.lamp} />
        <button
          className={styles.createPositionButton}
          onClick={openSendnftpopup}
        >
          <div className={styles.send}>Send</div>
        </button>
        <button
          className={styles.createPositionButton1}
          onClick={openBurnnftpopup}
        >
          <div className={styles.send}>Burn</div>
        </button>
        <div className={styles.usturCssTier1Csslu1Parent}>
          <div className={styles.usturCssTier}>{NFT.name}</div>
          <button className={styles.vectorWrapper} onClick={onClose}>
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
          </button>
        </div>
        <div className={styles.balanceSymbolImageContainer}>
          <span className={styles.balanceSymbolImageContainer1}>
            <p className={styles.balance}>{`Balance `}</p>
            <p className={styles.balance}>{`Symbol `}</p>
            <p className={styles.balance}>Image</p>
            <p className={styles.balance}>{`Current Supply `}</p>
            <p className={styles.balance}>Collection</p>
            <p className={styles.balance}>Mint</p>
            <p className={styles.balance}>Freeze Authority</p>
            <p className={styles.balance}>Status</p>
            <p className={styles.balance}>Royalty</p>
          </span>
        </div>
        <div className={styles.descriptionAPropertyTitleContainer}>
          <span className={styles.balanceSymbolImageContainer1}>
            <p className={styles.balance}>Description</p>
            <p className={styles.balance}>
              A Property title for a tier I residential land plot on the surface
              area of the Ustur Central Space Station. This title was issued
              under the Council of peace authority during the SAGE Start
              Sequence Phase II - 2022. Disclaimer: Images are Sogmian District
              for example only. Final art will vary based on final faction and
              district selection.
            </p>
          </span>
        </div>
        <div className={styles.csslu1ViewOriginalContainer}>
          <span className={styles.balanceSymbolImageContainer1}>
            <p className={styles.balance}>
              <span>
                <span className={styles.span}>1</span>
              </span>
            </p>
            <p className={styles.balance}>
              <span className={styles.csslu11}>
                <span>CSSLU1</span>
              </span>
            </p>
            <p className={styles.balance}>
              <span className={styles.csslu11}>
                <span>View Original</span>
              </span>
            </p>
            <p className={styles.balance}>
              <span className={styles.csslu11}>
                <span>167</span>
              </span>
            </p>
            <p className={styles.balance}>
              <span className={styles.csslu11}>
                <span>{`Star Atlas `}</span>
              </span>
            </p>
            <p className={styles.bvjevq1v}>
              <span className={styles.csslu11}>
                <span className={styles.bvjevq1v2}>BVJE...VQ1V</span>
              </span>
            </p>
            <p className={styles.balance}>
              <span className={styles.csslu11}>
                <span className={styles.bvjevq1v2}>BVJE...VQ1V</span>
              </span>
            </p>
            <p className={styles.balance}>
              <span className={styles.csslu11}>
                <span>Primary-MarketMutable</span>
              </span>
            </p>
            <p className={styles.balance}>
              <span className={styles.csslu11}>
                <span>0%</span>
              </span>
            </p>
          </span>
        </div>
        <img
          className={styles.managenftpopupChild}
          alt=""
          src={NFT.image}
        />
      </div>
      {isSendnftpopupOpen && (
        <PortalPopup
          overlayColor="rgba(19, 35, 45, 0.7)"
          placement="Centered"
          onOutsideClick={closeSendnftpopup}
        >
          <Sendnftpopup onClose={closeSendnftpopup} />
        </PortalPopup>
      )}
      {isBurnnftpopupOpen && (
        <PortalPopup
          overlayColor="rgba(19, 35, 45, 0.7)"
          placement="Centered"
          onOutsideClick={closeBurnnftpopup}
        >
          <Burnnftpopup onClose={closeBurnnftpopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default Managenftpopup;
