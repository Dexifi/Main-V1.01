import type { NextPage } from "next";
import { useState, useRef, useCallback, useEffect } from "react";
import Managenftpopup from "../components/managenftpopup";
import PortalPopup from "../components/portal-popup";
import { useRouter } from "next/router";
import styles from "./index-n-f-t-gallery.module.css";
import Header from "../components/header";
import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";
import { connection } from "../utils/get-connection";
import axios from "axios";
import { getPrice } from "../components/dashboard/walletBalance";

const IndexNFTGallery: NextPage = () => {
  const [isManagenftpopupOpen, setManagenftpopupOpen] = useState(false);
  const frameButtonRef = useRef<HTMLButtonElement>(null);
  const frameButton1Ref = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const openManagenftpopup = useCallback(() => {
    setManagenftpopupOpen(true);
  }, []);

  const closeManagenftpopup = useCallback(() => {
    setManagenftpopupOpen(false);
  }, []);

  const onAccountPageButtonClick = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const onAccountsClick = useCallback(() => {
    router.push("/index-accounts");
  }, [router]);

  const onTransactionsClick = useCallback(() => {
    router.push("/index-transaction");
  }, [router]);

  const onDashbordClick = useCallback(() => {
    router.push("/dashboard");
  }, [router]);
  const { publicKey } = useWallet();
  const [NFTs, setNFTs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchData = async () => {
    const wallet = Keypair.generate();
    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(wallet))
      .use(bundlrStorage());
    const userNft = await metaplex.nfts().findAllByOwner({ owner: publicKey });
    let userNFTs = [];
    userNft.forEach(async (nft) => {
      const metaData = await axios.get(
        `https://api-mainnet.magiceden.dev/v2/tokens/${nft.mintAddress.toString()}`
      );
      // const price = await axios.get(
      //   `https://api-mainnet.magiceden.dev/v2/collections/${metaData.data.collection}/stats`
      // );
      if (metaData.data.name) {
        userNFTs.push({
          ...metaData.data,
          // price: price.data.floorPrice / LAMPORTS_PER_SOL,
        });
      }
    });
    setNFTs(userNFTs);
    setLoading(false);
  };
  useEffect(() => {
    // setLoading(true);
    if (publicKey && isLoading) fetchData();
  }, [publicKey]);
  console.log(NFTs);
  return (
    <>
      <div className={styles.dashboardnftgallery}>
        <div className={styles.lamp} />
        <div className={styles.dashboardnftgalleryInner}>
          <div className={styles.frameParent}>
            <div className={styles.nftDetailWrapper}>
              {NFTs.length === 0
                ? null
                : NFTs.map((item, index) => {
                    return (
                      <div className={styles.nftDetail} key={index + 1}>
                        <div className={styles.netWorth}>
                          <div className={styles.collectionBalanceBidContainer}>
                            <p className={styles.collection}>Collection</p>
                            <p className={styles.collection}>Balance</p>
                            <p className={styles.collection}>Bid price</p>
                          </div>
                          <div className={styles.starAtlas1Container}>
                            <p className={styles.collection}>
                              {item.collection ? item.collection : "?"}
                            </p>
                            <p className={styles.collection}>1</p>
                            <p className={styles.collection}>10.655 SOL</p>
                          </div>
                        </div>
                        <img
                          className={styles.nftDetailChild}
                          alt=""
                          src={item.image}
                        />
                        <button
                          className={styles.transferDomainButton}
                          onClick={() => {
                            openManagenftpopup(item);
                            setSelectedNFT(item);
                          }}
                        >
                          <div className={styles.transfer}>Details</div>
                        </button>
                        <div className={styles.usturCssTier1Csslu1Wrapper}>
                          <div className={styles.usturCssTier}>{item.name}</div>
                        </div>
                      </div>
                    );
                  })}
            </div>
            <button
              className={styles.accountPageButton}
              onClick={onAccountPageButtonClick}
            >
              <div className={styles.transactions}>{`<<      Back`}</div>
            </button>
            <div className={styles.dashboardPageSwitcher}>
              <div className={styles.dashboardPageSwitcherChild} />
              <div className={styles.nftGallery}>NFT Gallery</div>
              <button className={styles.accounts} onClick={onAccountsClick}>
                Accounts
              </button>
              <button
                className={styles.transactions1}
                onClick={onTransactionsClick}
              >
                Transactions
              </button>
              <div className={styles.dashboardPageSwitcherItem} />
            </div>
          </div>
        </div>
        <Header />
        <div className={styles.v101202204202200UtcContainer}>
          <p className={styles.collection}>V1.0.1</p>
          <p className={styles.collection}>2022-04-20 22:00 UTC</p>
        </div>
      </div>
      {isManagenftpopupOpen && (
        <PortalPopup
          overlayColor="rgba(32, 45, 58, 0.7)"
          placement="Centered"
          onOutsideClick={closeManagenftpopup}
        >
          <Managenftpopup onClose={closeManagenftpopup} NFT={selectedNFT} />
        </PortalPopup>
      )}
    </>
  );
};

export default IndexNFTGallery;
