import { useAddAmmLiquidityModal } from "@/lib/stores/liquidity.store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CreatePoolModal from "@/components/modals/create-pool-modal";
import { useLiquidity } from "@/applications/Liquidity/store";
import { useAtom } from "jotai";
import { selectedPoolAtom } from "@/components/modals/store";
import formatedNumber from "@/lib/numbers";
import { raydiumActions } from "@/applications/Liquidity/actions";
import { Percent, Token, TokenAmount } from "@raydium-io/raydium-sdk";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";
import { getWalletTokenAccount } from "@/hooks/useLiquidity";
import { connection } from "@/lib/get-connections";
import { debounce } from "lodash";
import Decimal from "decimal.js";
import { toast } from "@/components/ui/use-toast";

const AddAmmLiquidityModal = () => {
  const { isOpen, onClose } = useAddAmmLiquidityModal();
  const [loading, setLoading] = useState(false);
  const inputRefOne = useRef(null);
  const inputRefTwo = useRef(null);
  const [confirmed, setConfirmed] = useState<"indeterminate" | boolean>(false);

  const userTokens = useLiquidity((state) => state.userTokens);
  const tokenPrices = useLiquidity((state) => state.tokenPrices);
  const [selectedPool] = useAtom(selectedPoolAtom);
  const { wallet } = useWallet();
  const [amounts, setAmounts] = useState({
    amountA: 0,
    amountB: 0,
  });
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = useCallback(
    () => setShowMore((prevShowMore) => !prevShowMore),
    []
  );

  const handleFocusBox = useCallback(
    (inputRef: { current: { focus: () => void } | null }) => {
      if (inputRef.current !== null) {
        // @ts-ignore
        inputRef.current.focus();
      }
    },
    []
  );

  const tokenA = useMemo(() => {
    return userTokens.find(
      (token) => token.address === selectedPool?.mintA.address
    );
  }, [selectedPool?.mintA.address, userTokens]);

  const tokenB = useMemo(() => {
    return userTokens.find(
      (token) => token.address === selectedPool?.mintB.address
    );
  }, [selectedPool?.mintB.address, userTokens]);

  const handleAddLiquidity = useCallback(async () => {
    if (
      !selectedPool ||
      !selectedPool?.mintA?.address ||
      !wallet?.adapter.publicKey
    )
      return;
    setLoading(true);

    const baseToken: Token = {
      equals(other: Token): boolean {
        return false;
      },
      symbol: selectedPool?.mintA.symbol,
      name: selectedPool?.mintA.name,
      decimals: selectedPool?.mintA.decimals,
      mint: new PublicKey(selectedPool.mintA.address),
      programId: new PublicKey(selectedPool?.mintA.programId),
    };

    const quoteToken: Token = {
      equals(other: Token): boolean {
        return false;
      },
      symbol: selectedPool?.mintB.symbol,
      name: selectedPool?.mintB.name,
      decimals: selectedPool?.mintB.decimals,
      mint: new PublicKey(selectedPool.mintB.address),
      programId: new PublicKey(selectedPool?.mintB.programId),
    };
    const walletAccounts = await getWalletTokenAccount(
      connection,
      wallet.adapter.publicKey
    );
    try {
      const tx = await raydiumActions.addAmmLiquidity({
        wallet: wallet?.adapter as BaseSignerWalletAdapter,
        inputTokenAmount: new TokenAmount(
          baseToken,
          new Decimal(
            amounts.amountA * 10 ** selectedPool.mintA.decimals
          ).toFixed(0)
        ),
        quoteToken: quoteToken,
        slippage: new Percent(0, 100),
        targetPool: selectedPool?.id ?? "",
        walletTokenAccounts: walletAccounts,
      });
      setLoading(false);
    } catch (e) {
      toast({
        title: "Transaction failed",
        description: "Transaction has failed",
        variant: "destructive",
      });
      console.error(e);
      setLoading(false);
    }
  }, [amounts.amountA, selectedPool, wallet?.adapter]);

  useEffect(() => {
    selectedPool && setLoading(false);
  }, [selectedPool]);

  const handleUpdateAmountWithPercentage = (
    mint: "A" | "B",
    percent: number
  ) => {
    const userToken = mint === "A" ? tokenA : tokenB;
    if (!userToken) return;
    const amount = (percent / 100) * (userToken?.balance ?? 0);
    if (mint === "A") {
      setAmounts((prev) => ({ ...prev, amountA: amount }));
    } else {
      setAmounts((prev) => ({ ...prev, amountB: amount }));
    }
    updateSecondAmount(mint, amount);
  };

  const updateSecondAmount = debounce((mint: "A" | "B", newAmount: number) => {
    if (!selectedPool) return;
    setLoading(true);
    const targetToken = mint === "A" ? selectedPool.mintA : selectedPool.mintB;
    const token: Token = {
      equals(other: Token): boolean {
        return false;
      },
      symbol: targetToken.symbol,
      name: targetToken.name,
      decimals: targetToken.decimals,
      mint: new PublicKey(targetToken.address),
      programId: new PublicKey(targetToken.programId),
    };
    const tokenAmount = new TokenAmount(
      token,
      parseInt((newAmount * 10 ** token.decimals).toString())
    );
    raydiumActions
      .computeAnotherAmount(
        token,
        selectedPool.id,
        tokenAmount,
        new Percent(1, 100)
      )
      .then((res) => {
        setAmounts((prev) => ({
          ...prev,
          [mint === "A" ? "amountB" : "amountA"]:
            res.maxAnotherAmount.numerator.toNumber() /
            10 ** selectedPool[mint === "A" ? "mintB" : "mintA"].decimals,
        }));
      });
    setLoading(false);
  }, 1000);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110] rounded-2xl p-4 sm:p-5"
        style={{
          boxShadow: "0 0 8px 1px rgba(171,196,255,0.5)",
          borderColor: "rgba(171,196,255,0.5",
        }}
      >
        {/*  first Box */}
        <CreatePoolModal />
        <p className="text-white font-medium text-lg">Add liquidity</p>
        <div
          className={
            "p-3 bg-[#19232d] rounded-3xl px-4 flex flex-col gap-2 mt-1"
          }
          onClick={() => handleFocusBox(inputRefOne)}
        >
          <div className={"flex flex-row text-white justify-end"}>
            <div
              className={"flex flex-row text-xs cursor-pointer"}
              onClick={() => console.log("click")}
            >
              <p>Balance:</p>
              {!tokenA?.balance ? (
                <p>-</p>
              ) : (
                <p>{formatedNumber(tokenA?.balance, 4)}</p>
              )}
            </div>
          </div>
          <div
            className={"text-white flex flex-row justify-between items-center"}
          >
            <div className={"flex flex-row gap-2 items-center"}>
              <div className={"flex flex-row gap-2 items-center"}>
                <div>
                  <div
                    className={
                      "bg-white h-8 w-8 flex flex-row justify-center items-center rounded-full"
                    }
                  >
                    <img
                      className={"w-6 h-6 rounded-full bg-gray-600"}
                      src={
                        selectedPool?.mintA.logoURI
                          ? selectedPool?.mintA.logoURI
                          : "/unknown.svg"
                      }
                    />
                  </div>
                </div>
                <p className={"text-base"}>
                  {selectedPool?.mintA.symbol
                    ? selectedPool?.mintA.symbol
                    : selectedPool?.mintA.address.slice(0, 4)}
                </p>
              </div>
              <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
              <button
                className={
                  "bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6 text-xs"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateAmountWithPercentage("A", 100);
                }}
              >
                Max
              </button>
              <button
                className={
                  "bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6 text-xs"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateAmountWithPercentage("A", 50);
                }}
              >
                Half
              </button>
            </div>
            <input
              className={
                "bg-[#19232d] h-5 w-1/3 focus:outline-none font-bold text-right"
              }
              type={"number"}
              id={"box-1"}
              ref={inputRefOne}
              value={amounts.amountA}
              onChange={(e) => {
                updateSecondAmount("A", parseFloat(e.target.value));

                setAmounts((prev) => ({
                  ...prev,
                  amountA: parseFloat(e.target.value),
                }));
              }}
            />
          </div>
          <div className={"flex flex-row text-white justify-end text-xs"}>
            <p>
              ${" "}
              {formatedNumber(
                amounts.amountA *
                  tokenPrices[selectedPool?.mintA.address ?? ""],
                4
              )}
            </p>
          </div>
        </div>

        <div
          className={"p-3 bg-[#19232d] rounded-3xl px-4 flex flex-col gap-2"}
          onClick={() => handleFocusBox(inputRefTwo)}
        >
          <div className={"flex flex-row text-white justify-end"}>
            <div
              className={"flex flex-row text-xs cursor-pointer"}
              onClick={() => console.log("click")}
            >
              <p>Balance:</p>
              {!tokenB?.balance ? (
                <p>-</p>
              ) : (
                <p>{formatedNumber(tokenB?.balance, 4)}</p>
              )}
            </div>
          </div>
          <div
            className={"text-white flex flex-row justify-between items-center"}
          >
            <div className={"flex flex-row gap-2 items-center"}>
              <div className={"flex flex-row items-center gap-2"}>
                <div
                  className={
                    "bg-white h-8 w-8 flex flex-row justify-center items-center rounded-full"
                  }
                >
                  <img
                    className={"w-6 h-6 rounded-full bg-gray-600"}
                    src={
                      selectedPool?.mintB.logoURI
                        ? selectedPool?.mintB.logoURI
                        : "/unknown.svg"
                    }
                  />
                </div>
              </div>
              <p className={"text-base"}>
                {selectedPool?.mintB.symbol
                  ? selectedPool?.mintB.symbol
                  : selectedPool?.mintB.address.slice(0, 4)}
              </p>
              <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
              <button
                className={
                  "bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6 text-xs"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateAmountWithPercentage("B", 100);
                }}
              >
                Max
              </button>
              <button
                className={
                  "bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6 text-xs"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateAmountWithPercentage("B", 50);
                }}
              >
                Half
              </button>
            </div>
            <input
              ref={inputRefTwo}
              className={
                "bg-[#19232d] h-5 w-1/3 font-bold text-right focus:outline-none"
              }
              type={"number"}
              id={"box-2"}
              value={amounts.amountB}
              onChange={(e) => {
                updateSecondAmount("B", parseFloat(e.target.value));
                setAmounts((prev) => ({
                  ...prev,
                  amountB: parseFloat(e.target.value),
                }));
              }}
            />
          </div>
          <div className={"flex flex-row text-white justify-end text-xs"}>
            <p>
              ${" "}
              {formatedNumber(
                amounts.amountB *
                  tokenPrices[selectedPool?.mintB.address ?? ""],
                4
              )}
            </p>
          </div>
        </div>
        {/*  Third Box */}

        <div
          className={
            "p-3 rounded-3xl flex flex-col gap-1 text-xs text-white border border-[#757788]"
          }
        >
          <div className={"flex flex-row w-full justify-between"}>
            <p>Base</p>
            <p>
              {selectedPool?.mintA.symbol
                ? selectedPool?.mintA.symbol
                : selectedPool?.mintA.address.slice(0, 4)}
            </p>
          </div>
          <div className={"flex flex-row w-full justify-between"}>
            <div className={"flex flex-row gap-1"}>
              <p>Pool liquidity</p>
              <p>
                (
                {selectedPool?.mintA.symbol
                  ? selectedPool?.mintA.symbol
                  : selectedPool?.mintA.address.slice(0, 4)}
                )
              </p>
            </div>
            {!selectedPool?.mintAmountB ? (
              <p>-</p>
            ) : (
              <div className={"flex flex-row gap-1"}>
                <p>{formatedNumber(selectedPool?.mintAmountB ?? 0, 4)} </p>
                <p>
                  {selectedPool?.mintA.symbol
                    ? selectedPool?.mintA.symbol
                    : selectedPool?.mintA.address.slice(0, 4)}
                </p>
              </div>
            )}
          </div>
          <div className={"flex flex-row w-full justify-between"}>
            <div className={"flex flex-row gap-1"}>
              <p>Pool liquidity</p>
              <p>
                (
                {selectedPool?.mintB.symbol
                  ? selectedPool?.mintB.symbol
                  : selectedPool?.mintB.address.slice(0, 4)}
                )
              </p>
            </div>
            {!selectedPool?.mintAmountB ? (
              <p>-</p>
            ) : (
              <div className={"flex flex-row gap-1"}>
                <p>{formatedNumber(selectedPool?.mintAmountB ?? 0, 4)} </p>
                <p>
                  {selectedPool?.mintB.symbol
                    ? selectedPool?.mintB.symbol
                    : selectedPool?.mintB.address.slice(0, 4)}
                </p>
              </div>
            )}
          </div>
          <div className={"flex flex-row w-full justify-between"}>
            <div className={"flex flex-row gap-1"}>
              <p>LP supply</p>
            </div>
            {!selectedPool?.lpAmount ? (
              <p>-</p>
            ) : (
              <div className={"flex flex-row gap-1"}>
                <p>{formatedNumber(selectedPool?.lpAmount ?? 0, 4)} </p>
                <p>LP</p>
              </div>
            )}
          </div>

          {showMore && (
            <>
              <div className={"flex flex-row justify-between"}>
                <p>Addresses</p>
                <p
                  className={"text-[#3b82f6] cursor-pointer"}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      selectedPool?.mintA.address ?? ""
                    );
                    alert("Address copied to clipboard");
                  }}
                >
                  {selectedPool?.mintA.address.slice(0, 4) +
                    "..." +
                    selectedPool?.mintA.address.slice(-4)}
                </p>
              </div>
            </>
          )}
          <div
            className={"flex flex-row w-full cursor-pointer items-center"}
            onClick={handleShowMore}
          >
            {showMore ? " Show Less" : "Show More"}
            {showMore ? (
              <ExpandLessIcon sx={{ fontSize: 16 }} />
            ) : (
              <ExpandMoreIcon sx={{ fontSize: 16 }} />
            )}
          </div>
        </div>
        {/*  Fourth box */}
        <div className={"p-3 bg-[#19232d] rounded-3xl text-xs text-white"}>
          <p>
            I have read Raydiums Liquidity Guide and understand the risks
            involved with providing liquidity and impermanent loss.
          </p>
          <div className={"flex flex-col gap-1 mt-2"}>
            <div className={"flex flex-row gap-2 items-center"}>
              <Checkbox.Root
                checked={confirmed}
                onCheckedChange={setConfirmed}
                className="flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-[#0d111b] "
                id="c1"
              >
                <Checkbox.Indicator className="text-sm">
                  {confirmed === true && (
                    <CheckIcon style={{ color: "white" }} size={18} />
                  )}
                </Checkbox.Indicator>
              </Checkbox.Root>
              <i>Confirm</i>
            </div>
          </div>
        </div>
        <Button
          disabled={
            !confirmed ||
            loading ||
            amounts.amountA === 0 ||
            amounts.amountB === 0
          }
          onClick={handleAddLiquidity}
        >
          {loading ? (
            <div className={"flex flex-row gap-2 items-center"}>
              <p>loading</p>
            </div>
          ) : amounts.amountA < 0 && amounts.amountB < 0 ? (
            <div className={"flex flex-row gap-2 items-center"}>
              <p>Enter an amount</p>
            </div>
          ) : confirmed ? (
            <div className={"flex flex-row gap-2 items-center"}>
              <p>Add Liquidity</p>
            </div>
          ) : (
            <div className={"flex flex-row gap-2 items-center"}>
              <p className="text-sm">
                please confirm the Raydium Liquidity Guide
              </p>
            </div>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddAmmLiquidityModal;
