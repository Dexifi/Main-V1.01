import { useCallback, useState, FC, useEffect } from "react";
import styles from "../../pages/dashboard.module.css";
import PortalPopup from "../portal-popup";
import TransferDomainPopup from "../transfer-domain-popup";
import { useWallet } from "@solana/wallet-adapter-react";
import { TokenInfo, TokenListProvider } from "@solana/spl-token-registry";
import { connection } from "../../utils/get-connection";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import axios from "axios";

interface WalletBalanceProps {
  walletBalance: number;
  setWalletBalance: (newSum: number) => void;
}

const getPrice = async (symbol: string) => {
  let price = await axios.get(`https://price.jup.ag/v4/price?ids=${symbol}`);
  return price;
};

const getTokenBalanceFromWallet = async (owner: PublicKey) => {
  const walletTokens = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: owner,
          },
        },
      ],
    }
  );
  return walletTokens;
};

const WalletBalance: FC<WalletBalanceProps> = ({
  setWalletBalance,
  walletBalance,
}) => {
  const [tokensList, setTokensList] = useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isTransferDomainPopupOpen, setTransferDomainPopupOpen] =
    useState(false);
  const openTransferDomainPopup = useCallback(() => {
    setTransferDomainPopupOpen(true);
  }, []);

  const closeTransferDomainPopup = useCallback(() => {
    setTransferDomainPopupOpen(false);
  }, []);
  const { publicKey } = useWallet();
  const fetchData = async () => {
    try {
      let mint: { mint: string; uiAmount: number }[] = [];
      const balanceAccounts = await getTokenBalanceFromWallet(publicKey);
      for (const i of balanceAccounts) {
        if (i.account.data.parsed.info.tokenAmount.uiAmount > 0)
          mint.push({
            mint: i.account.data.parsed.info.mint,
            uiAmount: i.account.data.parsed.info.tokenAmount.uiAmount,
          });
      }

      const tokens = await new TokenListProvider().resolve();
      const tokenList = tokens.filterByChainId(101).getList();

      let updatedTokensList: TokenInfo[] = [];

      for (let m of mint) {
        const tokenInfo = tokenList.find((t) => t.address === m.mint);
        if (tokenInfo) {
          updatedTokensList.push({
            symbol: tokenInfo.symbol,
            name: tokenInfo.name,
            decimals: tokenInfo.decimals,
            uiAmount: m.uiAmount,
            mint: m.mint,
            logoURI: tokenInfo.logoURI,
          });
        }
      }
      updatedTokensList = updatedTokensList.filter(
        (t) => !t.symbol.includes("-")
      );
      const balance = await connection.getBalance(publicKey);
      updatedTokensList.push({
        symbol: "SOL",
        name: "Solana",
        decimals: 9,
        uiAmount: balance / LAMPORTS_PER_SOL,
        logoURI: "/solana-copy-2@2x.png",
      });
      try {
        for (let t of updatedTokensList) {
          let price = await getPrice(t.symbol);
          t.price = price.data.data[t.symbol].price;
          t.value = t.uiAmount * t.price;
        }
      } catch (err) {
        console.log(err);
      }
      setTokensList(updatedTokensList);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    if (publicKey) fetchData();
    let sum = tokensList ? tokensList.reduce((acc, t) => acc + t.value, 0) : 0;
    console.log(sum);
    setWalletBalance(sum.toFixed(2));
  }, [publicKey]);

  return (
    <>
      <div className={styles.walletBalance}>
        <div className={styles.frameGroup}>
          <div className={styles.amountParent}>
            <div className={styles.amount1}>Amount</div>
            <div className={styles.nftContainer}>Token</div>
            <div className={styles.tokenIndex}>Token Index</div>
            <div className={styles.value4}>Value</div>
            <div className={styles.valuenetworth}>Value/NetWorth %</div>
            <div className={styles.frameChild2} />
          </div>
          {isLoading ? (
            <div className={styles.solParent}>Loading...</div>
          ) : (
            tokensList.map((item, index) => {
              return (
                <div className={styles.solParent}>
                  <div className={styles.usturCssTier}>{item.symbol}</div>
                  <div className={styles.div27}>{item.uiAmount.toFixed(2)}</div>
                  <div className={styles.div28}>$ {item.value.toFixed(2)}</div>
                  <div className={styles.div29}>
                    {Number(item.price.toFixed(5))}
                  </div>
                  <div className={styles.div30}>
                    {((item.value / walletBalance) * 100).toFixed(2)}
                  </div>
                  <img
                    className={styles.solanaCopy24}
                    alt=""
                    src={item.logoURI}
                  />
                  <div className={styles.frameChild3} />
                </div>
              );
            })
          )}
        </div>
        <div className={styles.netWorth6}>
          <div className={styles.walletBalanceContainer}>
            <span>Wallet Balance</span>
            <span className={styles.span}>{` `}</span>
            <span className={styles.span15}>*</span>
            <span className={styles.span}>{` `}</span>
            <span>$ {walletBalance}</span>
          </div>
        </div>
        <div className={styles.walletBalanceInner}>
          <div className={styles.frameDiv}>
            <div className={styles.head3}>
              <div className={styles.domains}>Domains</div>
              <div className={styles.headChild1} />
            </div>
            <div className={styles.div31}>
              <img className={styles.rectangleIcon} alt="" />
              <div className={styles.dexifisol}>dexifi.sol</div>
              <div className={styles.child1} />
              <button
                className={styles.transferDomainButton2}
                onClick={openTransferDomainPopup}
              >
                <div className={styles.transfer}>Transfer</div>
              </button>
            </div>
          </div>
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
export { WalletBalance, getPrice, getTokenBalanceFromWallet };
