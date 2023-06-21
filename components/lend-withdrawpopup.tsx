import type { NextPage } from "next";
import styles from "./lend-withdrawpopup.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { connection } from "../utils/get-connection";
import { SolendAction } from "@solendprotocol/solend-sdk";
import { useState, useEffect } from "react";

type LendWithdrawpopupType = {
  onClose?: () => void;
};

const LendWithdrawpopup: NextPage<LendWithdrawpopupType> = ({
  onClose,
  lend,
  pool,
  user,
}) => {
  const [amount, setAmount] = useState(0);
  const { sendTransaction, wallet, publicKey } = useWallet();
  const [tokenBalance, setTokenBalance] = useState(null);
  useEffect(() => {
    const token = user.deposits.find(
      (item) => item.mintAddress === lend.config.liquidityToken.mint
    );
    if (token) setTokenBalance(token.info.user);
    else setTokenBalance(0);
  }, [publicKey]);
  const handleChangeAmount = (event) => {
    if (event.target.value > lend.user) setAmount(lend.user);
    else setAmount(event.target.value);
  };
  const withdraw = async () => {
    const a = new BN(amount * (10 ** lend.stats.decimals));
    const solendAction = await SolendAction.buildWithdrawTxns(
      connection,
      a,
      lend.stats.symbol,
      wallet?.adapter.publicKey,
      "production",
      undefined,
      new PublicKey(pool.config.address)
    );
    (await solendAction).sendTransactions(sendTransaction);
  };
  console.log(lend);
  return (
    <div className={styles.lendWithdrawpopup}>
      <div className={styles.lamp} />
      <div className={styles.withdrawParent}>
        <div className={styles.withdraw}>Withdraw</div>
        <div className={styles.sol}>{lend.stats.symbol}</div>
        <img
          className={styles.solana2Icon}
          alt=""
          src={lend.config.liquidityToken.logo}
        />
      </div>
      <div className={styles.balance11366987}>
        Balance : {tokenBalance || 0} {lend.stats.symbol}
      </div>
      <div className={styles.per1}>
        <div className={styles.div}>
          $ {(amount * lend.stats.assetPriceUSD).toFixed(8)}
        </div>
        <div className={styles.solana2Parent}>
          <img
            className={styles.solana2Icon}
            alt=""
            src={lend.config.liquidityToken.logo}
          />
          <div className={styles.sol1}>{lend.stats.symbol}</div>
        </div>
      </div>
      <input
        className={styles.lendWithdrawpopupChild}
        type="number"
        value={amount}
        onChange={handleChangeAmount}
      />
      <button
        className={styles.maxbutton}
        onClick={() => setAmount(tokenBalance)}
      >
        <div className={styles.max}>Max</div>
      </button>
      <button
        className={styles.maxbutton1}
        onClick={() => setAmount(tokenBalance / 2)}
      >
        <div className={styles.max}>Half</div>
      </button>
      <div className={styles.div1}>~~ $ {lend.stats.assetPriceUSD}</div>
      <button className={styles.createPositionButton} onClick={withdraw}>
        <div className={styles.withdraw1}>Withdraw</div>
      </button>
      <div className={styles.details}>
        <div className={styles.priceUserBorrowContainer}>
          <p className={styles.price}>Price</p>
          <p className={styles.price}>User Borrow Limit</p>
          <p className={styles.price}>Utilization</p>
          <p className={styles.price}>Borrow APR</p>
        </div>
        <div className={styles.to531782Container}>
          <p className={styles.price}>$ 23.30</p>
          <p className={styles.price}>$ 3,804.47 to $ 5317.82</p>
          <p className={styles.price}> 54.47 % to 17.82 %</p>
          <p className={styles.price}>Supply APR</p>
        </div>
      </div>
      <div
        className={styles.inputAmountYou}
      >{`Input Amount You Want to Withdraw `}</div>
    </div>
  );
};

export default LendWithdrawpopup;
