import { Tabs } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import formatedNumber from "@/lib/numbers";
import { Token } from "@/types/token";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { TradeState, useJupiterTrade } from "@/applications/Trade/store";
import { Market } from "@mehranml/openbook";
import { useWallet } from "@solana/wallet-adapter-react";
import { createJupLimitOrder, getOpenOrder } from "@/applications/Trade/jup";
import { getPrice } from "@/data/price";
import { CircularProgress } from "@mui/material";
import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";

type SidebarProps = {
  isEXTRASMALL: boolean;
  form: {
    amount: number;
    limit_price: number;
    tab: string;
    userChanged: boolean;
  };
  setForm: (form: any) => void;
  selectedMarket?: TradeState["marketDetails"];
  userBalance: Token[];
  availableSide: Array<"buy" | "sell">;
  market: Market | null;
};
const JupiterSidebar = memo(
  ({ isEXTRASMALL, userBalance, market }: SidebarProps) => {
    const { tokenB, tokenA } = useJupiterTrade();
    const parts = [0.25, 0.5, 0.75, 1];
    const { wallet } = useWallet();
    const [amount, setAmount] = useState(0);
    const [tokenAPrice, setTokenAPrice] = useState(0);
    const [tokenBPrice, setTokenBPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    const tokenABalance = useMemo(
      () => userBalance.find((token) => token.mintAddress === tokenA?.address),
      [userBalance, tokenA?.address]
    );

    const tokenBBalance = useMemo(
      () => userBalance.find((token) => token.mintAddress === tokenB?.address),
      [userBalance, tokenB?.address]
    );
    const handleOrder = useCallback(async () => {
      if (!wallet?.adapter || !tokenA || !tokenB) return;
      try {
        setLoading(true);
        await createJupLimitOrder(wallet?.adapter as BaseSignerWalletAdapter, {
          outputMint: tokenB?.address,
          inputMint: tokenA?.address,
          outAmount:
            ((amount * tokenAPrice) / tokenBPrice) * 10 ** tokenB.decimals,
          inAmount: amount * 10 ** tokenA?.decimals,
        });
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }, [wallet?.adapter, tokenA, tokenB, amount, tokenAPrice, tokenBPrice]);

    const handleCalculateAmount = (part: number) => {
      const amount = tokenABalance?.tokenBalance * part;
      setAmount(amount);
    };
    const handleLimitPriceChange = (newAmount: number) => {
      if (newAmount > tokenABalance?.tokenBalance) return;
      setAmount(newAmount);
    };

    useEffect(() => {
      (async () => {
        if (tokenAPrice > 0) return;
        const APrice = await getPrice(tokenA?.symbol ?? "");
        const BPrice = await getPrice(tokenB?.symbol ?? "");
        setTokenAPrice(APrice);
        setTokenBPrice(BPrice);
      })();
    }, [tokenA?.symbol, tokenAPrice, tokenB?.symbol]);

    return (
      <div
        className="h-max  w-full rounded-xl p-5 gap-4 flex flex-col"
        style={{
          boxShadow: "0 0 4px #88d6ff",
        }}
      >
        <Tabs defaultValue="buy" className="w-full">
          <div className="flex flex-col w-full gap-6 mt-6">
            <div className="flex flex-col w-full gap-4">
              <div
                className="flex  gap-2 items-center bg-[#111b2a] p-4 rounded-xl"
                style={{ boxShadow: "0 0 5px rgba(217, 248, 255, 0.5)" }}
              >
                <label className="text-white flex-1 text-xs sm:text-sm">
                  {"You're Selling"}
                  <span className="text-white bg-[#0d111b] text-[10px] px-2 py-1 ml-1 rounded w-fit">
                    {tokenA?.symbol}
                  </span>
                </label>
                <Input
                  aria-label="Limit Price"
                  value={amount}
                  className={`bg-transparent text-white rounded-2xl border-[#d9f8ff50] ${
                    isEXTRASMALL ? "max-w-[120px]" : "max-w-[170px]"
                  }`}
                  onChange={(e) =>
                    handleLimitPriceChange(e.target.value as unknown as number)
                  }
                  max={tokenABalance?.tokenBalance}
                  min={0}
                />
              </div>
              <div
                className="flex gap-6 justify-between items-center bg-[#111b2a] p-4 rounded-xl"
                style={{ boxShadow: "0 0 5px rgba(217, 248, 255, 0.5)" }}
              >
                <label className="text-white text-xs sm:text-sm">
                  sell {tokenA?.symbol} at rate
                  <span className="text-white bg-[#0d111b] text-[10px] px-2 py-1 ml-1 rounded w-fit">
                    {tokenA?.symbol}
                  </span>
                </label>
                <Input
                  aria-label="Amount"
                  value={tokenAPrice}
                  className={`bg-transparent text-white rounded-2xl border-[#d9f8ff50] ${
                    isEXTRASMALL ? "max-w-[120px]" : "max-w-[170px]"
                  }`}
                  type={"number"}
                  onChange={(e) =>
                    setTokenAPrice(e.target.value as unknown as number)
                  }
                  step={market?.tickSize}
                  min={0}
                />
              </div>
              <div
                className="flex gap-6 justify-between items-center bg-[#111b2a] p-4 rounded-xl"
                style={{ boxShadow: "0 0 5px rgba(217, 248, 255, 0.5)" }}
              >
                <label className="text-white text-xs sm:text-sm">
                  {"You're Buying"}
                  <span className="text-white bg-[#0d111b] text-[10px] px-2 py-1 ml-1 rounded w-fit">
                    {tokenB?.symbol}
                  </span>
                </label>

                <Input
                  aria-label="Total"
                  disabled
                  value={parseFloat(
                    ((amount * tokenAPrice) / tokenBPrice).toString()
                  )}
                  className={`bg-transparent text-white rounded-2xl border-[#d9f8ff50] ${
                    isEXTRASMALL ? "max-w-[120px]" : "max-w-[170px]"
                  }`}
                />
              </div>
            </div>
            <div
              className={`flex w-full gap-4 ${
                isEXTRASMALL ? "flex-wrap" : "flex-nowrap"
              }`}
            >
              {parts.map((part, id) => (
                <Button
                  onClick={() => {
                    handleCalculateAmount(part);
                  }}
                  key={id}
                  className="w-full"
                >
                  {part * 100}%
                </Button>
              ))}
            </div>
            <div className="flex w-full gap-4 flex-nowrap">
              <span className="text-[#D9F8FF] text-sm">{tokenA?.symbol}</span>
              <span className="text-[#D9F8FF] text-sm">
                Balance:{" "}
                {formatedNumber(tokenABalance?.tokenBalance, 4, isEXTRASMALL)}
              </span>
            </div>
            <Button onClick={() => getOpenOrder(wallet?.adapter.publicKey)}>
              openOrder
            </Button>
            <Button
              disabled={amount === 0 || tokenAPrice === 0 || loading}
              className={"bg-[#0b9f44]"}
              onClick={handleOrder}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </Tabs>
      </div>
    );
  }
);

JupiterSidebar.displayName = "Sidebar";
export default JupiterSidebar;
