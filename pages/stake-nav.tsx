import { useCallback } from 'react';
import styles from './stake-nav.module.css';
import { useRouter } from 'next/router';

interface GreetingProps {
  activePage: string;
}

const StakeNav: React.FC<GreetingProps> = (props) => {
  const router = useRouter();
  const onEcosystemTextClick = useCallback(() => {
    router.push('/index-stakestake-ecosystem');
  }, [router]);

  const onMyVaultsTextClick = useCallback(() => {
    router.push('/index-stakemy');
  }, [router]);

  const onLiquidityStakeTextClick = useCallback(() => {
    router.push('/iindex-stakestake-ecosystem');
  }, [router]);
  const onDEXIFILOGOImageClick = useCallback(() => {
    router.push('/index-stake');
  }, [router]);

  return (
    <div className={styles.rectangleParent}>
      <div
        className={`${styles.stakeHeaderButton} ${
          props.activePage == 'index' ? styles.navActive : ''
        }`}
        onClick={
          props.activePage == 'index' ? () => {} : onDEXIFILOGOImageClick
        }
      >
        <img
          className={styles.dexifiLogoIcon1}
          alt=''
          src='/dexifi-logo1@2x.png'
        />
      </div>

      <div
        className={`${styles.stakeHeaderButton} ${
          props.activePage == 'ecosystem' ? styles.navActive : ''
        }`}
        onClick={
          props.activePage == 'ecosystem' ? () => {} : onEcosystemTextClick
        }
      >
        Ecosystem
      </div>

      <div
        className={`${styles.stakeHeaderButton} ${
          props.activePage == 'liquidity-stake' ? styles.navActive : ''
        }`}
        onClick={
          props.activePage == 'liquidity-stake'
            ? () => {}
            : onLiquidityStakeTextClick
        }
      >
        Liquidity Stake
      </div>

      <div
        className={`${styles.stakeHeaderButton} ${
          props.activePage == 'vaults' ? styles.navActive : ''
        }`}
        onClick={props.activePage == 'vaults' ? () => {} : onMyVaultsTextClick}
      >
        My Vaults
      </div>
    </div>
  );
};
export default StakeNav;
