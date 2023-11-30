import { useCallback } from 'react';
import styles from './liquidity-nav.module.css';
import { useRouter } from 'next/router';

interface GreetingProps {
  activePage: string;
  activeBlock: string;
}

const LiquidityNav: React.FC<GreetingProps> = (props) => {
  const router = useRouter();
  const onMyPositionsClick = useCallback(() => {
    router.push('/index-liquiditymy');
  }, [router]);

  const onPoolsClick = useCallback(() => {
    router.push('/index-liquidity');
  }, [router]);

  const onFarmsPoolsClick = useCallback(() => {
    router.push('/index-farm');
  }, [router]);

  const onMyFarmsClick = useCallback(() => {
    router.push('/index-farmmy');
  }, [router]);

  return (
    <div className={styles.rectangleParent1}>
      <a
        className={`${styles.pools} ${
          props.activePage === 'pools' ? styles.navActive : ''
        }`}
        onClick={
          props.activeBlock == 'liquidity' ? onPoolsClick : onFarmsPoolsClick
        }
      >
        Pools
      </a>
      <a
        className={`${styles.myPositions} ${
          props.activePage === 'position' || props.activePage === 'farms'
            ? styles.navActive
            : ''
        }`}
        onClick={
          props.activeBlock == 'liquidity' ? onMyPositionsClick : onMyFarmsClick
        }
      >
        {props.activeBlock == 'liquidity' ? 'My Positions' : 'My Farms'}
      </a>
    </div>
  );
};
export default LiquidityNav;
