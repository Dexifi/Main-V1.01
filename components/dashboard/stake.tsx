import { useWallet } from "@solana/wallet-adapter-react";
import styles from "../../pages/dashboard.module.css";
import { connection } from "../../utils/get-connection";
import { PublicKey } from "@solana/web3.js";
import {
  MAINNET_PROGRAM_ID,
  RAYDIUM_MAINNET,
  Utils1216,
} from "@raydium-io/raydium-sdk";

const GetStake = () => {
  const { publicKey } = useWallet();
  const fetchData = async () => {
    const data = await connection.getParsedProgramAccounts(
      new PublicKey("EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q"),
      {
        filters: [
          { dataSize: 88 },
          {
            memcmp: {
              offset: 40,
              bytes: publicKey,
            },
          },
        ],
      }
    );
    console.log(data);
    // const infoList = await Utils1216.getAllInfo({
    //   connection,
    //   programId: MAINNET_PROGRAM_ID.UTIL1216,
    //   poolIds: Utils1216.DEFAULT_POOL_ID,
    //   wallet: publicKey,
    //   chainTime: new Date().getTime() / 1000,
    // });
    // console.log(infoList);
  };
  fetchData();
  return (
    <div className={styles.stakingBalance}>
      <div className={styles.netWorth5}>
        <div className={styles.stakingContainer}>
          <span>Staking</span>
          <span className={styles.span}>{` `}</span>
          <span className={styles.inRange}>{`*  `}</span>
          <span>$ 12,500.00</span>
        </div>
      </div>
      <div className={styles.headContainer}>
        <div className={styles.head2}>
          <div className={styles.amount}>Amount</div>
          <div className={styles.nftContainer}>Token</div>
          <div className={styles.apy}>APY</div>
          <div className={styles.value3}>Value</div>
          <div className={styles.pendingReward2}>Pending Reward $</div>
          <div className={styles.pendingReward3}>Pending Reward</div>
          <div className={styles.headInner} />
        </div>
        <div className={styles.atlasParent}>
          <div className={styles.atlas}>ATLAS</div>
          <div className={styles.div23}>100.00</div>
          <div className={styles.div24}>$ 20,000.00</div>
          <div className={styles.div25}>14.45 %</div>
          <div className={styles.div26}>22.4666 $</div>
          <div className={styles.polis05456}>POLIS 0.5456</div>
          <div className={styles.frameChild1} />
          <img
            className={styles.raydiumRayCoin1Icon2}
            alt=""
            src="/raydiumraycoin-111@2x.png"
          />
          <button className={styles.transferDomainButton1}>
            <div className={styles.transfer}>Claim Pending</div>
          </button>
          <img
            className={styles.raydiumRayCoin2Icon1}
            alt=""
            src="/raydiumraycoin-111@2x.png"
          />
        </div>
      </div>
    </div>
  );
};
export default GetStake;
