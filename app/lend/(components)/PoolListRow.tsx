import { SolendObligation } from "@solendprotocol/solend-sdk/index";
import { LendState } from "@/applications/Lend/store";
import { Dispatch, useEffect, useMemo } from "react";
import { Token } from "@/types/token";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  useBorrowModal,
  useRepayModal,
  useSupplyModal,
  useWithdrawModal,
} from "@/lib/stores/lend.store";
import { toast } from "@/components/ui/use-toast";
import { TableCell, TableRow } from "@/components/ui/table";
import formatedNumber from "@/lib/numbers";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type PoolListRow = {
  isEXTRASMALL: boolean;
  obligation: SolendObligation | null;
  row: LendState["poolList"][0];
  setSelectedLend: Dispatch<LendState["poolList"][0]>;
  tokens: Token[];
};
const PoolListRow = ({
  row,
  isEXTRASMALL,
  obligation,
  setSelectedLend,
  tokens,
}: PoolListRow) => {
  const { wallet } = useWallet();

  const { onSupplyOpen } = useSupplyModal();
  const { onWithdrawOpen } = useWithdrawModal();
  const { onBorrowOpen } = useBorrowModal();
  const { onRepayOpen } = useRepayModal();

  const borrow = useMemo(
    () =>
      obligation?.borrows.find(
        (e) => e.mintAddress === row.marketReserve?.stats?.mintAddress
      ),
    [obligation?.borrows, row.marketReserve?.stats?.mintAddress]
  );
  const deposit = useMemo(
    () =>
      obligation?.deposits.find(
        (e) => e.mintAddress === row.marketReserve?.stats?.mintAddress
      ),
    [obligation?.deposits, row.marketReserve?.stats?.mintAddress]
  );

  const useToken = useMemo(
    () => tokens.find((e) => e.symbol === row.marketReserve?.stats?.symbol),
    [row.marketReserve?.stats?.symbol, tokens]
  );

  const handleNotifyConnectWallet = () => {
    toast({
      title: "Connect Wallet",
      description: "Please connect your wallet to continue",
      variant: "destructive",
    });
  };

  return (
    <TableRow className="hover:bg-transparent border-[#7c7c8d] h-max">
      <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
        <div className="flex flex-nowrap gap-3 items-center">
          <div className="flex flex-col gap-6 min-w-[120px]">
            <span className="text-[#d9f8ff]">
              {row?.marketReserve?.stats?.symbol}
            </span>
            <span className="text-sm text-[#7c7c8d]">
              $
              {!!row.marketReserve?.stats
                ? formatedNumber(
                    row.marketReserve?.stats.assetPriceUSD,
                    3,
                    isEXTRASMALL
                  )
                : 105.50115}
            </span>
          </div>
          {row.marketReserve?.config?.liquidityToken.logo ? (
            <img
              src={row.marketReserve?.config.liquidityToken.logo}
              alt={`${row?.marketReserve?.stats?.symbol}-logo / lend`}
              width={40}
              height={40}
              className="aspect-square rounded-full object-contain"
            />
          ) : (
            <Skeleton className="w-6 h-6 aspect-square object-contain" />
          )}
        </div>
      </TableCell>
      {/* ASSET */}
      <TableCell className="font-medium text-left text-[#7c7c8d] py-4 w-max min-w-[170px]">
        <div className="flex flex-nowrap gap-6 flex-col">
          <div className="flex flex-row gap-2">
            <span className="text-[#d9f8ff]">Open LTV:</span>
            <span className="text-sm text-[#7c7c8d]">
              {row?.marketReserve?.stats?.loanToValueRatio}
            </span>
          </div>
          <div className="flex flex-row gap-2">
            <span className="text-[#d9f8ff]">Borrow weigh:</span>
            <span className="text-sm text-[#7c7c8d]">
              {row.marketReserve?.stats?.optimalBorrowRate}
            </span>
          </div>
        </div>
      </TableCell>
      {/* LTV */}
      <TableCell className="font-medium text-left text-[#7c7c8d] py-4 w-max min-w-[290px]">
        <div className="flex flex-nowrap gap-6 flex-col">
          <div className="flex flex-row gap-2">
            <span className="text-[#d9f8ff] text-xs sm:text-sm">Supply:</span>
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-xs sm:text-sm text-[#7c7c8d]">
                {formatedNumber(row.reserve?.totalSupply.toNumber() ?? 0, 2)}
              </span>
              <span className="text-xs sm:text-sm text-[#7c7c8d]">
                {row?.marketReserve?.stats?.symbol} -
              </span>
              <span className="text-xs sm:text-sm text-[#7c7c8d]">
                {`${formatedNumber(
                  (deposit?.amount.toNumber() ?? 0) /
                    10 ** (row.marketReserve?.stats?.decimals ?? 0),
                  2
                )} ${row.marketReserve?.stats?.symbol}`}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <span className="text-[#d9f8ff]">Borrow:</span>
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-sm text-[#7c7c8d]">
                ${formatedNumber(row.reserve?.totalBorrow.toNumber() ?? 0, 2)}
              </span>
              <span className="text-sm text-[#7c7c8d]">
                {row?.marketReserve?.stats?.symbol} -
              </span>
              <span className="text-sm text-[#7c7c8d]">
                {`${formatedNumber(
                  (borrow?.amount.toNumber() ?? 0) /
                    10 ** (row.marketReserve?.stats?.decimals ?? 0),
                  2
                )} ${row.marketReserve?.stats?.symbol}`}
              </span>
            </div>
          </div>
        </div>
      </TableCell>
      {/* TOTAL */}
      <TableCell className="font-medium text-left text-[#7c7c8d] py-4 w-max">
        <div className="flex flex-col gap-6">
          <span>
            {formatedNumber(
              (row.marketReserve?.stats?.supplyInterestAPY ?? 0) * 100,
              2,
              isEXTRASMALL
            )}
            %
          </span>
        </div>
      </TableCell>

      <TableCell className="font-medium text-left text-[#7c7c8d] py-4 w-max">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center flex-nowrap">
            <Button
              style={{ boxShadow: "0 0 4px 1px #d9f8ff" }}
              className="min-w-[100px] truncate rounded-3xl h-8"
              size="sm"
              disabled={!useToken || useToken.amount === 0}
              onClick={() => {
                if (wallet) {
                  setSelectedLend(row);
                  onSupplyOpen();
                } else {
                  handleNotifyConnectWallet();
                }
              }}
            >
              Supply
            </Button>
            <Button
              style={{ boxShadow: "0 0 4px 1px #d9f8ff" }}
              className="min-w-[100px] truncate rounded-3xl h-8"
              size="sm"
              onClick={() => {
                setSelectedLend(row);
                onBorrowOpen();
              }}
              disabled={!wallet || !deposit}
            >
              Borrow
            </Button>
          </div>
          <div className="flex gap-2 items-center flex-nowrap">
            <Button
              style={{ boxShadow: "0 0 4px 1px #d9f8ff" }}
              size="sm"
              className="min-w-[100px] truncate rounded-3xl h-8"
              onClick={() => {
                setSelectedLend(row);
                onRepayOpen();
              }}
              disabled={!wallet || !borrow}
            >
              Repay
            </Button>
            <Button
              style={{ boxShadow: "0 0 4px 1px #d9f8ff" }}
              size="sm"
              className="min-w-[100px] truncate rounded-3xl h-8"
              onClick={() => {
                setSelectedLend(row);
                onWithdrawOpen();
              }}
              disabled={!wallet || !deposit}
            >
              Withdraw
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PoolListRow;
