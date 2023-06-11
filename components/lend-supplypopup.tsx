import type { NextPage } from "next";
import styles from "./lend-supplypopup.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { connection } from "../utils/get-connection";
import {
  GetProgramAccountsFilter,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SolendAction } from "@solendprotocol/solend-sdk";
import { BN } from "bn.js";

type LendSupplypopupType = {
  onClose?: () => void;
};

const LendSupplypopup: NextPage<LendSupplypopupType> = ({
  onClose,
  reserve,
  pool,
  user,
  page,
}) => {
  const { publicKey, sendTransaction, wallet, signTransaction } = useWallet();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [warning, setWarning] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading && publicKey) {
    if (reserve.config.liquidityToken.symbol === "SOL")
      connection.getBalance(publicKey).then((res) => {
        setTokenBalance(res / LAMPORTS_PER_SOL);
        setIsLoading(false);
      });
    else {
      const filters: GetProgramAccountsFilter[] = [
        {
          dataSize: 165, //size of account (bytes)
        },
        {
          memcmp: {
            offset: 32, //location of our query in the account (bytes)
            bytes: publicKey, //our search criteria, a base58 encoded string
          },
        },
      ];
      connection
        .getParsedProgramAccounts(
          TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
          { filters: filters }
        )
        .then((accounts) => {
          const balance = accounts.filter(
            (account) =>
              account.account.data.parsed.info.mint ===
              reserve.stats.mintAddress
          );
          if (balance.length > 0)
            setTokenBalance(
              balance[0].account.data.parsed.info.tokenAmount.uiAmount
            );
          else setTokenBalance(0);
        });
      if (tokenBalance) setIsLoading(false);
    }
  }
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleSupply = async () => {
    if (Number(amount) <= 0) return setWarning("Enter amount for supply!");
    let marketPubkey =
      page === "turbo"
        ? new PublicKey("7RCz8wb6WXxUhAigok9ttgrVgDFFFbibcirECzWSBauM")
        : undefined;
    const a = new BN(amount * LAMPORTS_PER_SOL);
    const solendAction = await SolendAction.buildDepositTxns(
      connection,
      a,
      reserve.stats.symbol,
      publicKey,
      "production",
      marketPubkey
    );
    if (solendAction) (await solendAction).sendTransactions(sendTransaction);
  };
  return (
    <div className={styles.lendSupplypopup}>
      <div className={styles.lamp} />
      <div className={styles.supplyParent}>
        <div className={styles.supply} >Supply</div>
        <div className={styles.sol}>{reserve.stats.symbol}</div>
        <img
          className={styles.solana2Icon}
          alt=""
          src={reserve.config.liquidityToken.logo}
        />
      </div>
      <div className={styles.balance11366987}>
        Balance : {tokenBalance ? tokenBalance : 0} {reserve.stats.symbol}
      </div>
      <div className={styles.per1}>
        <div className={styles.div}>
          $ {(amount * reserve.stats.assetPriceUSD).toString()}
        </div>
        <div className={styles.solana2Parent}>
          <img
            className={styles.solana2Icon}
            alt=""
            src={reserve.config.liquidityToken.logo}
          />
          <div className={styles.sol1}>{reserve.stats.symbol}</div>
        </div>
      </div>
      <input
        className={styles.lendSupplypopupChild}
        type="number"
        onChange={handleChangeAmount}
        value={amount}
      />
      <button
        className={styles.maxbutton}
        onClick={() => setAmount(tokenBalance)}
      >
        <div className={styles.max}>Max</div>
      </button>
      <button
        className={styles.maxbutton1}
        onClick={() => setAmount(tokenBalance / 50)}
      >
        <div className={styles.max}>Half</div>
      </button>
      <div className={styles.div1}>~~ $ {reserve.stats.assetPriceUSD}</div>
      <button className={styles.createPositionButton} onClick={handleSupply}>
        <div className={styles.supply1}>Supply</div>
      </button>
      <div className={styles.details}>
        <div className={styles.priceUserBorrowContainer}>
          <p className={styles.price}>Price</p>
          <p className={styles.price}>User Borrow Limit</p>
          <p className={styles.price}>Utilization</p>
          <p className={styles.price}>Supply APR</p>
        </div>
        <div className={styles.to531782Container}>
          <p className={styles.price}>$ {reserve.stats.assetPriceUSD.toFixed(2)}</p>
          <p className={styles.price}>$ 3,804.47 to $ 5317.82</p>
          <p className={styles.price}> 54.47 % to 17.82 %</p>
          <p className={styles.price}>Supply APR</p>
        </div>
      </div>
      <div
        className={styles.inputAmountYou}
      >{`Input Amount You Want to Supply `}</div>
    </div>
  );
};

export default LendSupplypopup;
