import { Key, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import formatedNumber from "@/lib/numbers";

type OrderBookProps = {
  isEXTRASMALL: boolean;
  data: any;
  bids: { price: number; size: number; side: "buy" | "sell" }[];
  asks: any;
};
const OrderBook = ({ data, isEXTRASMALL, bids, asks }: OrderBookProps) => {
  const tabsDATA = ["All", "Buy", "Sell"];
  const [tab, setTab] = useState("all");
  return (
    <div
      className="h-max w-full rounded-xl p-5 gap-4 flex flex-col"
      style={{
        boxShadow: "0 0 4px #88d6ff",
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(119, 186, 234, 0.2), transparent ), radial-gradient( 50% 50% at 50% 50%, rgba(251, 0, 196, 0) 3.49%, rgba(119, 186, 234, 0) 7.6%, rgba(253, 0, 197, 0) 10.46%, rgba(119, 186, 234, 0) 14.46%, rgba(255, 0, 199, 0) 18.56%, rgba(3, 0, 3, 0) 19.53%, transparent 79.82%, rgba(246, 0, 192, 0) 81.08%, rgba(119, 186, 234, 0) 84.04%, rgba(247, 0, 193, 0) 86.61%, rgba(119, 186, 234, 0) 91.01%, rgba(249, 0, 194, 0) 95.16%, rgba(119, 186, 234, 0) 98.6% )",
      }}
    >
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full">
          <div className="flex gap-5 sm:gap-5 justify-between w-full items-center">
            <h3 className="text-sm sm:text-lg md:text-base text-[#757788]">
              Order Book
            </h3>
            <div
              className={`flex gap-2 ${
                isEXTRASMALL ? "flex-1 justify-between" : ""
              }`}
            >
              <div className={"bg-[#0D111B] rounded-full"}>
                {tabsDATA.map((tab_item, id) => (
                  <TabsTrigger
                    value={tab_item.toLocaleLowerCase()}
                    key={`${tab_item}_${id}`}
                    className="bg-[#0D111B] mx-0.5 data-[state='active']:bg-[#d9f8ff10] data-[state='active']:border-[#d9f8ff] rounded-full shadow-[0px_0px_5px_0px_#D9F8FF]"
                    style={{
                      border:
                        tab_item.toLocaleLowerCase() === tab
                          ? "1px solid #d9f8ff10"
                          : "transparent",
                      boxShadow:
                        tab_item.toLocaleLowerCase() === tab
                          ? "0 0 5px #d9f8ff"
                          : "none",
                    }}
                    onClick={() => setTab(tab_item.toLocaleLowerCase())}
                  >
                    {tab_item}
                  </TabsTrigger>
                ))}
              </div>
            </div>
          </div>
        </TabsList>
        <div className={"mt-3 border border-[#757788] rounded-xl px-3 py-2"}>
          <TabsContent value={"all"} className={"text-white"}>
            <div className={"flex flex-col gap-2"}>
              <div
                className={
                  "flex flex-row justify-between text-[#757788] font-medium"
                }
              >
                <p>Size</p>
                <p>Price</p>
              </div>

              {bids.slice(0, 6).map((bid, index) => (
                <div
                  key={index}
                  className={
                    "flex flex-row justify-between font-medium text-[#88E8AD] text-sm"
                  }
                >
                  <p> {formatedNumber(bid.size, 2, isEXTRASMALL)}</p>
                  <p> {formatedNumber(bid.price, 2, isEXTRASMALL)}</p>
                </div>
              ))}
              <div className={"border border-dotted w-full"} />
              {asks
                .slice(0, 6)
                .map(
                  (
                    asks: { size: number; price: number },
                    index: Key | null | undefined
                  ) => (
                    <div
                      key={index}
                      className={
                        "flex flex-row justify-between font-medium text-[#BA0000] text-sm"
                      }
                    >
                      <p> {formatedNumber(asks.size, 2, isEXTRASMALL)}</p>
                      <p> {formatedNumber(asks.price, 2, isEXTRASMALL)}</p>
                    </div>
                  )
                )}
            </div>
          </TabsContent>
          <TabsContent value={"buy"} className={"text-[#88E8AD]"}>
            <div className={"flex flex-col gap-2"}>
              <div
                className={
                  "flex flex-row justify-between text-[#757788] font-medium"
                }
              >
                <p>Size</p>
                <p>Price</p>
              </div>
              {bids.slice(0, 12).map((bid, index) => (
                <div
                  key={index}
                  className={
                    "flex flex-row justify-between font-medium text-[#88E8AD] text-sm"
                  }
                >
                  <p> {formatedNumber(bid.size, 2, isEXTRASMALL)}</p>
                  <p> {formatedNumber(bid.price, 2, isEXTRASMALL)}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value={"sell"} className={"text-[#88E8AD]"}>
            <div className={"flex flex-col gap-2"}>
              <div
                className={
                  "flex flex-row justify-between text-[#757788] font-medium"
                }
              >
                <p>Size</p>
                <p>Price</p>
              </div>

              {asks
                .slice(0, 12)
                .map(
                  (
                    asks: { size: number; price: number },
                    index: Key | null | undefined
                  ) => (
                    <div
                      key={index}
                      className={
                        "flex flex-row justify-between font-medium text-[#BA0000] text-sm"
                      }
                    >
                      <p> {formatedNumber(asks.size, 2, isEXTRASMALL)}</p>
                      <p> {formatedNumber(asks.price, 2, isEXTRASMALL)}</p>
                    </div>
                  )
                )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default OrderBook;
