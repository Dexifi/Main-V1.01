import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { connection } from "../../utils/get-connection";
import { useWallet } from "@solana/wallet-adapter-react";
import styles from "../../pages/dashboard.module.css";
import PortalPopup from "../portal-popup";
import Managenftpopup from "../managenftpopup";
import { useState, useCallback, useEffect, SetStateAction } from "react";
import axios from "axios";
import { getPrice } from "./walletBalance";

const GetNFT = () => {
  const { publicKey } = useWallet();
  const [isManagenftpopupOpen, setManagenftpopupOpen] = useState(false);
  const [NFTs, setNFTs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [NFTBalance, setNFTBalance] = useState(0);
  const openManagenftpopup = useCallback(() => {
    setManagenftpopupOpen(true);
  }, []);

  const closeManagenftpopup = useCallback(() => {
    setManagenftpopupOpen(false);
  }, []);
  const fetchData = async () => {
    setNFTBalance(0);
    const wallet = Keypair.generate();

    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(wallet))
      .use(bundlrStorage());
    if (publicKey === null) {
      return;
    }
    const userNft = await metaplex.nfts().findAllByOwner({ owner: publicKey });
    let userNFTs: SetStateAction<never[]> = [];
    userNft.forEach(async (nft) => {
      const metaData = await axios.get(
        `https://api-mainnet.magiceden.dev/v2/tokens/${nft.mintAddress.toString()}`
      );
      const price = await axios.get(
        `https://api-mainnet.magiceden.dev/v2/collections/${metaData.data.collection}/stats`
      );
      setNFTBalance(
        (pervValue) => (pervValue += price.data.floorPrice / LAMPORTS_PER_SOL)
      );

      userNFTs.push({
        ...metaData.data,
        price: price.data.floorPrice / LAMPORTS_PER_SOL,
      });
    });
    const solPrice = (await getPrice("SOL")).data.data.SOL.price;
    setNFTBalance((pervValue) => (pervValue *= solPrice));
    setNFTs(userNFTs);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    if (publicKey && isLoading) fetchData();
  }, [publicKey]);
  return (
    <>
      <div className={styles.nft}>
        <div className={styles.netWorth}>
          <div className={styles.nftContainer}>
            <span>NFT</span>
            <span className={styles.span}>{` `}</span>
            <span className={styles.span1}>*</span>
            <span className={styles.span2}>{`  `}</span>
            <span>$ {NFTBalance}</span>
          </div>
        </div>
        <div className={styles.headParent}>
          <div className={styles.head}>
            <div className={styles.headChild} />
            <div className={styles.mintParent}>
              <div className={styles.nftContainer}>Mint</div>
              <div className={styles.collection}>Collection</div>
              <div className={styles.balance}>Balance</div>
              <div className={styles.nftSupply}>NFT Supply</div>
              <div className={styles.value}>Value</div>
              <div className={styles.price}>Price</div>
            </div>
          </div>
          {isLoading ? (
            <div className={styles.div}>Loading...</div>
          ) : (
            NFTs.map((item, index) => {
              return (
                <div className={styles.div} key={index+1}>
                  <div className={styles.j7a3brfy}>{item.mintAddress.toString().slice(0,3)}...{item.mintAddress.toString().slice(-3)}</div>
                  <div className={styles.div1}>1</div>
                  <div className={styles.ray}>{item.supply}</div>
                  <div className={styles.div3}>$ {item.price}</div>
                  <div className={styles.starAtlas}>{item.collection}</div>
                  <div className={styles.usturCssTier}>{item.name}</div>
                  <div className={styles.div4}>$ {item.price}</div>
                  <div className={styles.child} />
                  <button
                    className={styles.transferDomainButton}
                    onClick={openManagenftpopup}
                  >
                    <div className={styles.transfer}>Details</div>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
      {isManagenftpopupOpen && (
        <PortalPopup
          overlayColor="rgba(19, 35, 45, 0.7)"
          placement="Centered"
          onOutsideClick={closeManagenftpopup}
        >
          <Managenftpopup onClose={closeManagenftpopup} />
        </PortalPopup>
      )}
    </>
  );
};
export default GetNFT;
