import type { NextPage } from "next";
import styles from "./lend-borrowpopup.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import BN from "bn.js";
import { SolendAction } from "@solendprotocol/solend-sdk";

type LendBorrowpopupType = {
  onClose?: () => void;
};

const LendBorrowpopup: NextPage<LendBorrowpopupType> = ({
  onClose,
  lend,
  pool,
  user,
}) => {
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState(0);
  const [warning, setWarning] = useState(null);
  const [userBoorrowLimit, setUserBoorrowLimit] = useState(undefined);
  if (!userBoorrowLimit)
    setUserBoorrowLimit(
      (
        (user.obligationStats.borrowLimit - 0.01) /
        lend.stats.assetPriceUSD.toFixed(2)
      ).toFixed(7)
    ) || 0;
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleBorrow = async () => {
    if (Number(amount) <= 0) return setWarning("Enter amount for supply!");
    const a = new BN(Number(amount) * 10 ** lend.stats.decimals);
    console.log(a.toString());
    const solendAction = await SolendAction.buildBorrowTxns(
      connection,
      a,
      lend.stats.symbol,
      publicKey,
      "production",
      undefined,
      new PublicKey(pool.config.address)
    );
    await solendAction.sendTransactions(sendTransaction);
  };
  return (
    <div className={styles.lendBorrowpopup}>
      <div className={styles.lamp} />
      <div className={styles.borrowParent}>
        <div className={styles.borrow}>Borrow</div>
        <div className={styles.sol}>SOL</div>
        <img className={styles.solana2Icon} alt="" src="/solana-2@2x.png" />
      </div>
      <div className={styles.balance11366987}>Balance : 113.66987 SOL</div>
      <div className={styles.per1}>
        <div className={styles.div}>$ 224.6646</div>
        <div className={styles.solana2Parent}>
          <img className={styles.solana2Icon} alt="" src="/solana-2@2x.png" />
          <div className={styles.sol1}>SOL</div>
        </div>
      </div>
      <input className={styles.lendBorrowpopupChild} type="number" />
      <button className={styles.maxbutton}>
        <div className={styles.max}>Max</div>
      </button>
      <button className={styles.maxbutton1}>
        <div className={styles.max}>Half</div>
      </button>
      <div className={styles.div1}>~~ $ 21.6804</div>
      <button className={styles.createPositionButton}>
        <div className={styles.borrow1}>Borrow</div>
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
      >{`Input Amount You Want to Borrow `}</div>
    </div>
  );
};

export default LendBorrowpopup;
