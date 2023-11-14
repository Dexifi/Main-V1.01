import type { NextPage } from 'next';
import styles from './lend-repaypopup.module.css';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import BN from 'bn.js';
import { PublicKey, PublicKeyInitData } from '@solana/web3.js';
import { SolendAction } from '@solendprotocol/solend-sdk';
import { connection } from '../utils/get-connection';

type LendRepaypopupType = {
  onClose?: () => void;
  pool: {
    config: {
      address: PublicKeyInitData
    }
  };
  user: any;
  lend: any;
};

const LendRepaypopup: NextPage<LendRepaypopupType> = ({
                                                        onClose,
                                                        pool,
                                                        user,
                                                        lend,
                                                      }) => {
  const [amount, setAmount] = useState(0);
  const {sendTransaction, wallet, publicKey} = useWallet();
  const [totalBorrow, setTotalBorrow] = useState(0);
  if (user.obligationStats && !totalBorrow) {
    setTotalBorrow(
      (user.obligationStats.userTotalBorrow - 0.001) / lend.stats.assetPriceUSD
    );
  }
  const handleChangeAmount = (event: any) => {
    if (event.target.value > lend.user) setAmount(lend.user);
    else setAmount(event.target.value);
  };
  const repay = async () => {
    const a = new BN(amount * 10 ** lend.stats.decimals);
    if(wallet?.adapter.publicKey === null || wallet?.adapter.publicKey === undefined) {
      return;
    }
    const solendAction = await SolendAction.buildRepayTxns(
      connection,
      a,
      lend.stats.symbol,
      wallet.adapter.publicKey,
      'production',
      new PublicKey(pool.config.address)
    );
    (await solendAction).sendTransactions(sendTransaction);
  };
  console.log(lend);
  return (
    <div className={styles.lendRepaypopup}>
      <div className={styles.lamp}/>
      <div className={styles.repayParent}>
        <div className={styles.repay}>Repay</div>
        <div className={styles.sol}>{lend.stats.symbol}</div>
        <img className={styles.solana2Icon} alt="" src={lend.config.liquidityToken.logo}/>
      </div>
      <div className={styles.balance11366987}>
        Balance : {totalBorrow} {lend.stats.symbol}
      </div>
      <div className={styles.per1}>
        <div className={styles.div}>$ {(lend.stats.assetPriceUSD * amount).toFixed(8)}</div>
        <div className={styles.solana2Parent}>
          <img className={styles.solana2Icon} alt="" src={lend.config.liquidityToken.logo}/>
          <div className={styles.sol1}>{lend.stats.symbol}</div>
        </div>
      </div>
      <input
        className={styles.lendRepaypopupChild}
        type="number"
        onChange={handleChangeAmount}
        value={amount}
      />
      <button
        className={styles.maxbutton}
        onClick={() => setAmount(totalBorrow)}
      >
        <div className={styles.max}>Max</div>
      </button>
      <button
        className={styles.maxbutton1}
        onClick={() => setAmount(totalBorrow / 2)}
      >
        <div className={styles.max}>Half</div>
      </button>
      <div className={styles.div1}>~~ $ 21.6804</div>
      <button className={styles.createPositionButton} onClick={repay}>
        <div className={styles.repay1}>Repay</div>
      </button>
      <div className={styles.details}>
        <div className={styles.priceUserBorrowContainer}>
          <p className={styles.price}>Price</p>
          <p className={styles.price}>User Borrow Limit</p>
          <p className={styles.price}>Utilization</p>
          <p className={styles.price}>Supply APR</p>
        </div>
        <div className={styles.to531782Container}>
          <p className={styles.price}>$ {lend.stats.assetPriceUSD}</p>
          <p className={styles.price}>$ 3,804.47 to $ 5317.82</p>
          <p className={styles.price}> 54.47 % to 17.82 %</p>
          <p className={styles.price}>Supply APR</p>
        </div>
      </div>
      <div
        className={styles.inputAmountYou}
      >{`Input Amount You Want to Repay `}</div>
    </div>
  );
};

export default LendRepaypopup;
