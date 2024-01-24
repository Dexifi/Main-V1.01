"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { connection } from "@/lib/get-connections";
import formatedNumber from "@/lib/numbers";
import { useRepayModal } from "@/lib/stores/lend.store";
import formatedString from "@/lib/string";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { SolendAction } from "@solendprotocol/solend-sdk";
import { BN } from "bn.js";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  user: any;
  pool: any;
  reserve: any;
};

const RepayModal = ({ user, pool, reserve }: Props) => {
  const { isOpen, onClose } = useRepayModal();

  const withdraw_modal = {
    title: "Replay",

    body: [
      {
        title: "Price",
        value: reserve?.stats?.assetPriceUSD,
      },
      {
        title: "User Borrow Limit",
        range: {
          min: 3804,
          max: 5317,
          sign: "$",
        },
      },
      {
        title: "Utilization",
        range: {
          min: 54.47,
          max: 18.82,
          sign: "%",
        },
      },
      {
        title: "Borrow APR",
        value: "Borrow APR",
      },
    ],
  };
  const [amount, setAmount] = useState(0);
  const { sendTransaction, wallet } = useWallet();
  const [totalBorrow, setTotalBorrow] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    if (user.obligationStats && !totalBorrow) {
      setTotalBorrow(
        (user.obligationStats.userTotalBorrow - 0.001) /
          reserve.stats.assetPriceUSD
      );
    }
  }, []);

  const handleRepay = async () => {
    if (Number(amount) <= 0)
      return toast({
        title: "Enter amount for repay!",
      });

    const a = new BN(amount * 10 ** reserve.stats.decimals);
    if (
      wallet?.adapter.publicKey === null ||
      wallet?.adapter.publicKey === undefined
    ) {
      return;
    }
    const solendAction = await SolendAction.buildRepayTxns(
      connection,
      a,
      reserve.stats.symbol,
      wallet.adapter.publicKey,
      "production",
      new PublicKey(pool.config.address)
    );
    (await solendAction).sendTransactions(sendTransaction);
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
                  {reserve.stats.symbol}
                </div>
              ) : (
                <Skeleton className="w-24 h-6 bg-slate-600" />
              )}
              {reserve ? (
                <Image
                  alt={`${reserve.stats.symbol}-logo / lend`}
                  src={reserve.config.liquidityToken.logo}
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
            Input Amount You Want to Repay
          </span>
          {reserve ? (
            <span className="text-sm text-[#757788] flex gap-1 flex-nowrap">
              <span>Balance:</span>
              <span>
                {totalBorrow ? formatedNumber(totalBorrow, 1, true) : 0}
              </span>
              <span>{reserve.stats.symbol}</span>
            </span>
          ) : (
            <Skeleton className="w-24 h-6 bg-slate-600" />
          )}
        </div>

        <div className="flex gap-4 justify-between items-center px-4 py-2 rounded-md bg-[#202d3a] flex-wrap">
          <div className="flex gap-4 items-center w-1/2">
            {reserve ? (
              <Image
                alt={`${reserve.stats.symbol}-logo / lend`}
                src={reserve.config.liquidityToken.logo}
                width={24}
                height={24}
                className="w-6 h-6 aspect-square object-contain rounded-sm"
              />
            ) : (
              <Skeleton className="w-6 h-6 aspect-square object-contain bg-slate-600" />
            )}
            {reserve ? (
              <div className="text-sm md:text-lg text-[#d9f8ff60] font-medium">
                {reserve.stats.symbol}
              </div>
            ) : (
              <Skeleton className="w-24 h-6 bg-slate-600" />
            )}
          </div>
          <Input
            value={amount}
            onChange={(e) => {
              const value = +e.target.value;
              if (value > +reserve.user) setAmount(reserve.user);
              else setAmount(value);
            }}
            type="number"
            placeholder="Amount"
            className="bg-transparent outline-none text-[#d9f8ff] flex-1 rounded-xl"
          />
          <div className="w-full flex justify-between items-center text-end">
            {reserve ? (
              <div className="text-xs md:text-sm text-[#d9f8ff60] font-medium">
                &asymp; ${formatedNumber(reserve.stats.assetPriceUSD, 3, false)}
              </div>
            ) : (
              <Skeleton className="w-24 h-6 bg-slate-600" />
            )}
            {reserve ? (
              <div className="text-xs md:text-sm text-[#d9f8ff60] font-medium">
                ${formatedNumber(amount * reserve.stats.assetPriceUSD, 2, true)}
              </div>
            ) : (
              <Skeleton className="w-24 h-6 bg-slate-600" />
            )}
          </div>
          <div className="w-full flex justify-between items-center text-end gap-2 md:gap-4 flex-col md:flex-row">
            <Button
              className="text-xs w-full md:w-1/2"
              size="sm"
              onClick={() => setAmount(totalBorrow / 2)}
            >
              Half
            </Button>
            <Button
              className="text-xs w-full md:w-1/2"
              size="sm"
              onClick={() => setAmount(totalBorrow > 0 ? totalBorrow : 0)}
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
                      {typeof row.value === "number"
                        ? `$${formatedNumber(row.value, 2, false)}`
                        : "0"}
                    </span>
                  )}
                  {row.range
                    ? `${formatedNumber(row.range.min, 2, true)}${
                        row.range.sign
                      } to ${formatedNumber(row.range.max, 2, true)}${
                        row.range.sign
                      }`
                    : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button onClick={handleRepay}>Repay</Button>
      </DialogContent>
    </Dialog>
  );
};

export default RepayModal;
