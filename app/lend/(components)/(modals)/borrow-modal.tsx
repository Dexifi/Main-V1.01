"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useBorrowModal } from "@/lib/stores/lend.store";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useWallet } from "@solana/wallet-adapter-react";
import formatedNumber from "@/lib/numbers";
import formatedString from "@/lib/string";
import { useToast } from "@/components/ui/use-toast";
import { LendState, useLend } from "@/applications/Lend/store";
import {
  fetchObligationsByAddress,
  formatObligation,
} from "@solendprotocol/solend-sdk/index";
import { connection } from "@/lib/get-connections";
import { createPool, onBorrow } from "@/applications/Lend/actions";
import { exploreAtom } from "@/stores/config";
import { useAtom } from "jotai";
import InitialLending from "@/applications/Lend/initial";
import { CircularProgress } from "@mui/material";

type Props = {
  page: "main" | "turbo";
  reserve: LendState["poolList"][0] | null;
};

const BorrowModal = ({ page, reserve }: Props) => {
  const { isOpen, onClose } = useBorrowModal();
  const mainMarket = useLend((state) => state.mainMarket);
  const turboMarket = useLend((state) => state.turboMarket);
  const mainObligations = useLend((state) => state.mainObligations);
  const turboObligations = useLend((state) => state.turboObligations);
  const reserves = useLend((state) => state.poolList);
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState(0);
  const [userBorrowLimit, setUserBorrowLimit] = useState(0);
  const [explorer] = useAtom(exploreAtom);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const obligation = useMemo(
    () => (page === "main" ? mainObligations : turboObligations),
    [mainObligations, page, turboObligations]
  );
  const pool = useMemo(
    () => (page === "main" ? mainMarket : turboMarket),
    [mainMarket, page, turboMarket]
  );
  const withdraw_modal = {
    title: "Borrow",

    body: [
      {
        title: "Price",
        value: reserve?.marketReserve?.stats?.assetPriceUSD,
      },
      {
        title: "User Borrow Limit",
        value: obligation?.obligationStats.borrowLimit,
        sign: "$",
      },
      {
        title: "Utilization",
        value: reserve?.marketReserve?.stats?.optimalUtilizationRate,
        sign: "%",
      },
      {
        title: "Supply APR",
        sign: "%",
        value: (reserve?.marketReserve?.totalSupplyAPY()?.totalAPY ?? 0) * 100,
      },
    ],
  };

  const calculateNewBorrowLimit = async () => {
    if (!obligation || !reserve) return;
    const ff = await fetchObligationsByAddress(
      [obligation!.obligationAddress.toString()],
      connection
    );
    if (!pool) return;
    const pol = await createPool(pool, reserves);
    const t = formatObligation(ff[0], pol);

    const p = t.minPriceBorrowLimit ?? 0;
    setUserBorrowLimit(p.toNumber());
  };

  useEffect(() => {
    calculateNewBorrowLimit();
  }, [calculateNewBorrowLimit]);

  const handleBorrow = async () => {
    setLoading(true);
    if (Number(amount) <= 0)
      return toast({
        title: "Enter amount for supply!",
      });

    if (!publicKey || !reserve?.reserve || !pool) {
      return;
    }
    try {
      const tx = await onBorrow({
        amount: amount.toString(),
        connection,
        env: "production",
        market: pool,
        publicKey,
        reserves,
        reserve: reserve?.reserve,
        sendTransaction,
      });
      toast({
        title: "success",
        description: "transaction sent",
        link: `${explorer}tx/${tx}`,
      });
      await InitialLending(connection, publicKey);

      onClose();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setLoading(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110] rounded-2xl p-4 sm:p-5"
        style={{ boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)" }}
      >
        <div className="flex justify-between flex-col gap-3">
          <div
            className="flex justify-between items-center py-2 px-4 rounded-md"
            style={{
              boxShadow: "0 0 5px rgba(217, 248, 255, 0.25)",
            }}
          >
            <h6 className="text-lg text-[#d9f8ff]">{withdraw_modal.title}</h6>

            <div className="flex gap-4 items-center">
              {reserve ? (
                <div className="text-sm md:text-lg text-[#d9f8ff60] font-medium">
                  {reserve.marketReserve?.stats?.symbol}
                </div>
              ) : (
                <Skeleton className="w-24 h-6 bg-slate-600" />
              )}
              {reserve ? (
                <Image
                  alt={`${reserve.marketReserve?.stats?.symbol}-logo / lend`}
                  src={reserve.marketReserve?.config.liquidityToken.logo ?? ""}
                  width={24}
                  height={24}
                  className="w-6 h-6 aspect-square object-contain rounded-sm"
                />
              ) : (
                <Skeleton className="w-6 h-6 aspect-square object-contain bg-slate-600" />
              )}
            </div>

            <Button
              size="icon"
              className="hover:bg-[#d9f8ff20] transition-all h-6 w-6"
              onClick={onClose}
            >
              <X className="w-4 h-4 aspect-square object-contain" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between flex-col gap-1">
          <span className="text-sm text-[#757788]">
            Input Amount You Want to Borrow
          </span>
          {reserve ? (
            <span className="text-sm text-[#757788] flex gap-1 flex-nowrap">
              <span>Balance:</span>
              <span>
                {userBorrowLimit ? formatedNumber(userBorrowLimit, 6) : 0}
              </span>
              <span>{reserve.marketReserve?.stats?.symbol}</span>
            </span>
          ) : (
            <Skeleton className="w-24 h-6 bg-slate-600" />
          )}
        </div>

        <div className="flex gap-4 justify-between items-center px-4 py-2 rounded-md bg-[#202d3a] flex-wrap">
          <div className="flex gap-4 items-center w-1/2">
            {reserve ? (
              <Image
                alt={`${reserve.marketReserve?.stats?.symbol}-logo / lend`}
                src={reserve.marketReserve?.config.liquidityToken.logo ?? ""}
                width={24}
                height={24}
                className="w-6 h-6 aspect-square object-contain rounded-sm"
              />
            ) : (
              <Skeleton className="w-6 h-6 aspect-square object-contain bg-slate-600" />
            )}
            {reserve ? (
              <div className="text-sm md:text-lg text-[#d9f8ff60] font-medium">
                {reserve.marketReserve?.stats?.symbol}
              </div>
            ) : (
              <Skeleton className="w-24 h-6 bg-slate-600" />
            )}
          </div>
          <Input
            value={amount}
            onChange={(e) => {
              const value = +e.target.value;
              if (value > userBorrowLimit) setAmount(userBorrowLimit);
              else setAmount(value);
            }}
            type="number"
            placeholder="Amount"
            className="bg-transparent outline-none text-[#d9f8ff] flex-1 rounded-xl"
          />
          <div className="w-full flex justify-between items-center text-end">
            {reserve ? (
              <div className="text-xs md:text-sm text-[#d9f8ff60] font-medium">
                &asymp; $
                {formatedNumber(
                  reserve.marketReserve?.stats?.assetPriceUSD ?? 0,
                  3,
                  false
                )}
              </div>
            ) : (
              <Skeleton className="w-24 h-6 bg-slate-600" />
            )}
            {reserve ? (
              <div className="text-xs md:text-sm text-[#d9f8ff60] font-medium">
                $
                {formatedNumber(
                  amount * (reserve?.marketReserve?.stats?.assetPriceUSD ?? 0),
                  2,
                  true
                )}
              </div>
            ) : (
              <Skeleton className="w-24 h-6 bg-slate-600" />
            )}
          </div>
          <div className="w-full flex justify-between items-center text-end gap-2 md:gap-4 flex-col md:flex-row">
            <Button
              className="text-xs w-full md:w-1/2"
              size="sm"
              onClick={() =>
                setAmount(Number((userBorrowLimit / 2).toFixed(6)))
              }
            >
              Half
            </Button>
            <Button
              className="text-xs w-full md:w-1/2"
              size="sm"
              onClick={() =>
                setAmount(
                  userBorrowLimit > 0 ? Number(userBorrowLimit.toFixed(6)) : 0
                )
              }
            >
              Max
            </Button>
          </div>
        </div>

        <Table className="w-full flex-1">
          <TableBody>
            {withdraw_modal.body.map((row: any, index: number) => (
              <TableRow
                className="hover:bg-transparent border-[#7c7c8d]"
                key={`${formatedString(
                  row.title.toLocaleLowerCase()
                )}_${index}`}
              >
                <TableCell
                  className={`font-medium text-left text-[#7c7c8d] py-2 text-sm pl-0`}
                >
                  {row.title}
                </TableCell>
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2 text-sm pr-0">
                  {row.value && (
                    <span>
                      {`${row.sign ?? "$"}${formatedNumber(
                        row.value,
                        2,
                        false
                      )}`}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button disabled={loading} onClick={handleBorrow}>
          {loading ? <CircularProgress size={24} /> : "Borrow"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowModal;
