import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import formatedNumber from "@/lib/numbers";
import { SelectedMarketType } from "@/types/market";
import { Token } from "@/types/token";
import { ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import { getPrice } from "@/data/price";
import { TradeState } from "@/applications/Trade/store";
import { Market } from "@mehranml/openbook";

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
  handlePlaceOrder: () => void;
  availableSide: Array<"buy" | "sell">;
  market: Market;
};
const Sidebar = memo(
  ({
    isEXTRASMALL,
    selectedMarket,
    form,
    availableSide,
    setForm,
    userBalance,
    market,
    handlePlaceOrder,
  }: SidebarProps) => {
    const tabsDATA = ["Buy", "Sell"];
    const parts = [0.25, 0.5, 0.75, 1];
    console.log(availableSide);
    const tokenABalance = useMemo(
      () =>
        userBalance.find(
          (token) => token.mintAddress === selectedMarket?.tokenA?.address
        ),
      [userBalance, selectedMarket]
    );

    const tokenBBalance = useMemo(
      () =>
        userBalance.find(
          (token) => token.mintAddress === selectedMarket?.tokenB?.address
        ),
      [userBalance, selectedMarket]
    );

    const handleCalculateAmount = useCallback(
      async (part: number) => {
        if (selectedMarket && tokenABalance && tokenBBalance) {
          const tokenAPrice = selectedMarket.tokenAPrice;
          const tokenBPrice = selectedMarket.tokenBPrice;
          if (form.tab === "buy" && tokenAPrice && tokenBPrice) {
            setForm({
              ...form,
              userChanged: true,
              amount: tokenBBalance.amount
                ? Number(
                    formatedNumber(
                      (tokenBBalance.amount * part * tokenBPrice) / tokenAPrice,
                      6
                    )
                  )
                : 0,
            });
          } else {
            setForm({
              ...form,
              userChanged: true,
              amount: tokenABalance?.amount ? tokenABalance.amount * part : 0,
            });
          }
        }
      },
      [selectedMarket, form, setForm, tokenBBalance, tokenABalance]
    );

    const updateAmount = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        setForm({ ...form, userChanged: true, amount: value });
      },
      [form, setForm]
    );

    return (
      <div
        className="h-max  w-full rounded-xl p-5 gap-4 flex flex-col"
        style={{
          boxShadow: "0 0 4px #88d6ff",
        }}
      >
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="w-full">
            <div className="flex gap-3 sm:gap-5 justify-between w-full items-center">
              <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
                Limit Order
              </h3>
              <div className="flex gap-2">
                {tabsDATA.map((tab_item, id) => (
                  <TabsTrigger
                    value={tab_item.toLocaleLowerCase()}
                    key={`${tab_item}_${id}`}
                    className="bg-[#d9f8ff10] data-[state='active']:bg-[#d9f8ff10] data-[state='active']:border-[#d9f8ff] rounded-full"
                    style={{
                      border:
                        tab_item.toLocaleLowerCase() === form.tab
                          ? "1px solid #d9f8ff10"
                          : "transparent",
                      boxShadow:
                        tab_item.toLocaleLowerCase() === form.tab
                          ? "0 0 5px #d9f8ff"
                          : "none",
                    }}
                    onClick={() =>
                      setForm({ ...form, tab: tab_item.toLocaleLowerCase() })
                    }
                  >
                    {tab_item}
                  </TabsTrigger>
                ))}
              </div>
            </div>
          </TabsList>
          {tabsDATA.map((tab_item, id) => (
            <TabsContent
              value={tab_item.toLocaleLowerCase()}
              key={`${tab_item}_${id}--content`}
            >
              <div className="flex flex-col w-full gap-6 mt-6">
                <div className="flex flex-col w-full gap-4">
                  <div
                    className="flex  gap-2 items-center bg-[#111b2a] p-4 rounded-xl"
                    style={{ boxShadow: "0 0 5px rgba(217, 248, 255, 0.5)" }}
                  >
                    <label className="text-white flex-1 text-xs sm:text-sm">
                      Limit Price
                      <span className="text-white bg-[#0d111b] text-[10px] px-2 py-1 ml-1 rounded w-fit">
                        {selectedMarket?.tokenB?.symbol}
                      </span>
                    </label>
                    <Input
                      aria-label="Limit Price"
                      value={form.limit_price}
                      className={`bg-transparent text-white rounded-2xl border-[#d9f8ff50] ${
                        isEXTRASMALL ? "max-w-[120px]" : "max-w-[170px]"
                      }`}
                      onChange={(e) => {
                        const value = +e.target.value;
                        if (value > 100000) {
                          setForm({
                            ...form,
                            userChanged: true,
                            limit_price: 100000,
                          });
                        } else if (value < 0) {
                          setForm({
                            ...form,
                            userChanged: true,
                            limit_price: 0,
                          });
                        } else if (Number.isNaN(value)) {
                          setForm({
                            ...form,
                            userChanged: true,
                            limit_price: 0,
                          });
                        } else {
                          setForm({
                            ...form,
                            userChanged: true,
                            limit_price: value,
                          });
                        }
                      }}
                      max={100000}
                      min={0}
                    />
                  </div>
                  <div
                    className="flex gap-6 justify-between items-center bg-[#111b2a] p-4 rounded-xl"
                    style={{ boxShadow: "0 0 5px rgba(217, 248, 255, 0.5)" }}
                  >
                    <label className="text-white text-xs sm:text-sm">
                      Amount
                      <span className="text-white bg-[#0d111b] text-[10px] px-2 py-1 ml-1 rounded w-fit">
                        {selectedMarket?.tokenA?.symbol}
                      </span>
                    </label>
                    <Input
                      aria-label="Amount"
                      value={form.amount}
                      className={`bg-transparent text-white rounded-2xl border-[#d9f8ff50] ${
                        isEXTRASMALL ? "max-w-[120px]" : "max-w-[170px]"
                      }`}
                      type={"number"}
                      onChange={updateAmount}
                      min={0}
                    />
                  </div>
                  <div
                    className="flex gap-6 justify-between items-center bg-[#111b2a] p-4 rounded-xl"
                    style={{ boxShadow: "0 0 5px rgba(217, 248, 255, 0.5)" }}
                  >
                    <label className="text-white text-xs sm:text-sm">
                      Total
                    </label>
                    <Input
                      aria-label="Total"
                      disabled
                      value={
                        !!form.amount && !!form.limit_price
                          ? form.limit_price * form.amount
                          : 0
                      }
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
                  <span className="text-[#D9F8FF] text-sm">
                    {tab_item.toLocaleLowerCase() === "buy"
                      ? selectedMarket?.tokenB?.symbol
                      : selectedMarket?.tokenA?.symbol}
                  </span>
                  <span className="text-[#D9F8FF] text-sm">
                    Balance:{" "}
                    {formatedNumber(
                      tab_item.toLocaleLowerCase() === "buy"
                        ? tokenBBalance?.amount
                        : tokenABalance?.amount,
                      4,
                      isEXTRASMALL
                    )}
                  </span>
                </div>

                <Button
                  disabled={
                    form.amount === 0 ||
                    form.limit_price === 0 ||
                    !availableSide.includes(
                      tab_item.toLocaleLowerCase() as "buy" | "sell"
                    )
                  }
                  className={
                    tab_item.toLocaleLowerCase() === "buy"
                      ? "bg-[#0b9f44]"
                      : "bg-[#FF005C]"
                  }
                  onClick={handlePlaceOrder}
                >{`${tab_item} ${selectedMarket?.tokenA?.symbol}`}</Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";
export default Sidebar;
