import type { NextPage } from "next";
import styles from "./lend-borrowpopup.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import BN from "bn.js";
import { SolendAction } from "@solendprotocol/solend-sdk";
import { PublicKey } from "@solana/web3.js";
import { connection } from "../utils/get-connection";

type LendBorrowpopupType = {
  onClose?: () => void;
  lend: any;
  pool: any;
  user: any;
};

const LendBorrowpopup: NextPage<LendBorrowpopupType> = ({
  onClose,
  lend,
  pool,
  user,
}) => {
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState(0);
  const [warning, setWarning] = useState('');
  console.log(user)
  const [userBoorrowLimit, setUserBoorrowLimit] = useState(0);

    setUserBoorrowLimit(
      user.obligationStats ?
      Number((
        (user.obligationStats.borrowLimit - user.obligationStats.userTotalBorrow - 0.01) /
        lend.stats.assetPriceUSD.toFixed(2)
      ).toFixed(7)) : 0 ) ;

  const handleChangeAmount = (event: any) => {
    setAmount(event.target.value);
  };
  const handleBorrow = async () => {
    if (Number(amount) <= 0) return setWarning("Enter amount for supply!");
    const a = new BN(Number(amount) * 10 ** lend.stats.decimals);
    if (publicKey === null) {
      return
    }
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
        <div className={styles.sol}>{lend.stats.symbol}</div>
        <img
          className={styles.solana2Icon}
          alt=""
          src={lend.config.liquidityToken.logo}
        />
      </div>
      <div className={styles.balance11366987}>
        Balance : {userBoorrowLimit} {lend.stats.symbol}
      </div>
      <div className={styles.per1}>
        <div className={styles.div}>
          $ {Number((amount * lend.stats.assetPriceUSD).toFixed(5))}
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
        className={styles.lendBorrowpopupChild}
        type="number"
        onChange={handleChangeAmount}
        value={amount}
      />
      <button
        className={styles.maxbutton}
        onClick={() => setAmount(userBoorrowLimit)}
      >
        <div className={styles.max}>Max</div>
      </button>
      <button
        className={styles.maxbutton1}
        onClick={() => setAmount(userBoorrowLimit / 2)}
      >
        <div className={styles.max}>Half</div>
      </button>
      <div className={styles.div1}>~~ $ 21.6804</div>
      <button className={styles.createPositionButton} onClick={handleBorrow}>
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
          <p className={styles.price}>
            $ {lend.stats.assetPriceUSD.toFixed(5)}
          </p>
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
