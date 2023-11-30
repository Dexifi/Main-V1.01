import styles from './dashboard-header.module.css';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

interface GreetingProps {
  activePage: string;
}

const DashboardHeader: React.FC<GreetingProps> = (props) => {
  const router = useRouter();
  const onNFTGalleryClick = useCallback(() => {
    router.push('/index-n-f-t-gallery');
  }, [router]);

  const onAccountsClick = useCallback(() => {
    router.push('/index-accounts');
  }, [router]);

  const onTransactionsClick = useCallback(() => {
    router.push('/index-transaction');
  }, [router]);

  const onRectangle14Click = useCallback(() => {
    router.push('/index-n-f-t-gallery');
  }, [router]);

  const onAccountPageButtonClick = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div
      className={`${styles.dashboardPageButton} ${
        props.activePage == 'nft' ? styles.nftHeader : ''
      } ${styles.dashboardPageSwitcher}`}
    >
      <button
        className={`${styles.accountPageButton} ${
          props.activePage == '' ? styles.hidden : ''
        }`}
        onClick={onAccountPageButtonClick}
      >
        <div className={styles.transactions}>{`<<      Back`}</div>
      </button>
      <div className={styles.row}>
        <button
          className={`${styles.dashboardPageButton} ${
            props.activePage == 'nft' ? styles.active : ''
          }`}
          onClick={onNFTGalleryClick}
        >
          NFT Gallery
        </button>
        <button
          className={`${styles.dashboardPageButton} ${
            props.activePage == 'transactions' ? styles.active : ''
          }`}
          onClick={onTransactionsClick}
        >
          Transactions
        </button>
        <button
          className={`${styles.dashboardPageButton} ${
            props.activePage == 'accounts' ? styles.active : ''
          }`}
          onClick={onAccountsClick}
        >
          Accounts
        </button>
      </div>

      <div
        className={styles.dashboardPageSwitcherItem}
        onClick={onRectangle14Click}
      />
    </div>
  );
};
export default DashboardHeader;
