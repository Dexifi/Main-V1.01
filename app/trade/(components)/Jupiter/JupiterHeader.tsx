import { useJupiterModal } from "@/lib/stores/trade.store";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import formatedNumber from "@/lib/numbers";
import { useJupiterTrade } from "@/applications/Trade/store";
import { useEffect, useState } from "react";
import { connection } from "@/lib/get-connections";
import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";

type HeaderProps = {
  isEXTRASMALL: boolean;
};

const JupiterHeader = ({ isEXTRASMALL }: HeaderProps) => {
  const { onOpen } = useJupiterModal();
  const { tokenA, tokenB } = useJupiterTrade();
  const [lastOrder, setLastOrder] = useState({ amount: 0, side: "BUY" });

  const fetchLastOrder = async () => {
    const t = await connection.getConfirmedSignaturesForAddress2(
      new PublicKey(tokenA?.address ?? ""),
      {
        limit: 12,
      }
    );

    const transaction: ParsedTransactionWithMeta =
      await connection.getParsedTransaction(t[0].signature, {
        maxSupportedTransactionVersion: 0,
      });

    const post = transaction?.meta?.postTokenBalances?.find(
      (e) => e.mint === tokenA?.address
    );
    const pre = transaction?.meta?.preTokenBalances?.find(
      (e) => e.mint === tokenA?.address
    );

    if (
      (post?.uiTokenAmount.uiAmount ?? 0) > (pre?.uiTokenAmount.uiAmount ?? 0)
    ) {
      setLastOrder((e) => ({
        side: "BUY",
        amount: post?.uiTokenAmount.uiAmount ?? e.amount,
      }));
    } else {
      setLastOrder((e) => ({
        side: "SELL",
        amount: post?.uiTokenAmount.uiAmount ?? e.amount,
      }));
    }
  };

  useEffect(() => {
    if (!tokenB) return;
    const interval = setInterval(async () => {
      await fetchLastOrder();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchLastOrder, tokenB]);

  return (
    <div
      className={`grid ${
        isEXTRASMALL ? "grid-cols-1" : "grid-cols-2"
      } sm:grid-cols-2 md:grid-cols-4 px-4 py-5 rounded-xl gap-4 w-full`}
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
          Base Token
        </h3>
        {/* Actions */}
        <div className="flex items-center w-full flex-wrap">
          <Button
            className="flex cursor-pointer  gap-1 "
            onClick={() => onOpen("tokenA")}
          >
            <img src={tokenA?.logoURI} alt={tokenA?.name} className="w-7 h-7" />
            <span>{tokenA?.symbol}</span>
            <ChevronDown className=" ml-2 w-6 h-6 aspect-square object-contain" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
          Quote Token
        </h3>
        {/* Actions */}
        <div className="flex items-center w-full flex-wrap">
          <Button
            className="flex cursor-pointer  gap-1 "
            onClick={() => onOpen("tokenB")}
          >
            <img src={tokenB?.logoURI} alt={tokenB?.name} className="w-7 h-7" />
            <span>{tokenB?.symbol}</span>
            <ChevronDown className=" ml-2 w-6 h-6 aspect-square object-contain" />
          </Button>
        </div>
      </div>

      <div></div>
      <div className="flex flex-col gap-4">
        <h6 className="text-[#d9f8ff] text-sm md:text-lg">Last Order</h6>
        {lastOrder ? (
          <div className="flex gap-4">
            <span
              className={`text-sm md:text-lg ${
                lastOrder.side.toUpperCase() === "BUY"
                  ? "text-[#88e8ad]"
                  : "text-[#c95901]"
              }`}
            >
              ${formatedNumber(lastOrder.amount, 2, isEXTRASMALL)}
            </span>
            <ChevronUp
              className={`w-6 h-6 aspect-square object-contain  ${
                lastOrder.side.toUpperCase() === "BUY"
                  ? "text-[#88e8ad]"
                  : "text-[#c95901] rotate-180"
              }`}
            />
          </div>
        ) : (
          "-"
        )}
      </div>
    </div>
  );
};

export default JupiterHeader;
