import { SwapModal } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { connection } from "@/lib/get-connections";
import formatedNumber from "@/lib/numbers";
import { removeMiddleString } from "@/lib/string";
import { TOKEN_LIST_URL } from "@jup-ag/core";
import { useWallet } from "@solana/wallet-adapter-react";
import { ChevronsDown, ChevronsUpDown } from "lucide-react";
import { VersionedTransaction } from "@solana/web3.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useAtom } from "jotai";
import { tokenAtom, TokenType } from "@/stores/tokens";
import useWalletBalance from "@/hooks/useWalletBalance";
import { swapAtom, swapModalAtom } from "@/stores/swap";
import { createJupiterApiClient } from "@jup-ag/api";
import { getPrice } from "@/data/price";
import { CircularProgress, Skeleton } from "@mui/material";
import { debounce } from "lodash";

type Props = {
  isEXTRASMALL: boolean;
};
type SwapActionsProps = {
  onToggle: () => void;
  onRate: (value: number) => void;
};

type SwapInfoProps = {
  data: {
    sign?: "less" | "mass";
    title: string;
    value: number;
    currency?: string;
    text?: string;
  }[];
  isEXTRASMALL: boolean;
};

type SwapBlockProps = {
  title: string;
  isEXTRASMALL: boolean;
  balance: number;
  amount: number;
  loading?: boolean;
  onAmountUpdate: (value: number) => void;
  token?: Partial<TokenType>;
  disabled?: boolean;
  onShowModal: () => void;
};

const SwapBlock = ({
  title,
  isEXTRASMALL,
  token,
  balance,
  onAmountUpdate,
  amount,
  loading,
  onShowModal,
  disabled,
}: SwapBlockProps) => {
  const handleChangeAmount = useCallback(
    (e: number) => {
      onAmountUpdate(e);
    },
    [onAmountUpdate]
  );
  const localAmount = useRef(amount);
  useEffect(() => {
    if (amount !== localAmount.current) {
      const t = amount;
      localAmount.current = amount;
      handleChangeAmount(amount);
    }
  }, [amount, handleChangeAmount]);
  if (!token) return <></>;
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h6 className="text-sm text-[#d9f8ff] truncate" key={title}>
          {title}
        </h6>
        <div className="text-sm flex gap-2 items-center">
          Balance: {formatedNumber(+balance, 6, isEXTRASMALL)}
          <span>{token?.symbol}</span>
        </div>
      </div>
      <div className="flex justify-between items-center w-full gap-4 p-3 md:p-5 bg-[#0d111b40] rounded-lg">
        <Button
          className="rounded-full flex gap-3 md:gap-6 justify-between items-center flex-1 md:min-w-[170px]"
          onClick={onShowModal}
          style={{
            boxShadow: "0 0 5px rgba(217, 248, 255, 0.25)",
          }}
        >
          <img
            src={
              token.logoURI ? token.logoURI : "/assets/images/solana-1@2x.png"
            }
            alt="solana_icons"
            width={24}
            height={24}
            className="max-h-5 aspect-square object-contain"
          />
          <div className="text-sm">{token.symbol}</div>
          <ChevronsDown className="w-5 h-5 min-w-[1.25rem] aspect-square object-contain text-[#d9f8ff50] hidden md:flex" />
        </Button>
        {loading ? (
          <Skeleton
            sx={{
              width: { md: 140, xs: 80 },
              transform: "scale(1)",
              height: "36px !important",
              background: "--primary-gradient",
              border: "1px solid",
            }}
          />
        ) : (
          <Input
            disabled={disabled}
            type="number"
            required
            className="h-9 bg-[#0d111b] max-w-[80px] md:max-w-[140px] rounded-lg"
            value={amount}
            color="#ff0"
            onChange={(e) => {
              handleChangeAmount(Number(e.target.value));
            }}
          />
        )}
      </div>
    </>
  );
};

const SwapInfo = ({ data, isEXTRASMALL }: SwapInfoProps) => {
  const isSmall = useMediaQuery("(max-width: 660px)");
  return (
    <div className="bg-[#0d111b] flex flex-col p-5 rounded-md gap-3">
      <div className="text-[#757788] font-medium text-center">More info</div>
      <div className="w-full h-[1px] bg-[#757788] rounded-md" />
      <div className="flex flex-col w-full gap-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-nowrap justify-between items-center"
          >
            <span className="flex-1 text-sm font-medium text-[#d9f8ff]">
              {item.title}
            </span>
            <span className="flex gap-2 items-start md:items-end text-sm w-max text-end">
              {item.sign && (
                <>{item.sign === "less" ? <> &lt;</> : <>&gt;</>}</>
              )}
              {item.sign ? (
                <>{formatedNumber(item.value, 1, isEXTRASMALL)}&#37;</>
              ) : (
                formatedNumber(item.value, isSmall ? 2 : 6, isEXTRASMALL)
              )}
              {item.currency ? <> {item.currency}</> : null}
              {item.text ? <> {item.text}</> : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SwapActions = ({ onToggle, onRate }: SwapActionsProps) => {
  const proccents = [0.25, 0.5, 0.75, 1];
  return (
    <div className="flex justify-between items-center gap-4 flex-wrap">
      <Button
        size="icon"
        className="hover:bg-[#75778810] transition-all"
        onClick={onToggle}
      >
        <ChevronsUpDown className="w-4 sm:w-6 h-4 sm:h-6 aspect-square object-contain" />
      </Button>

      <div className="flex gap-2 items-center">
        {proccents.map((value, index) => (
          <Button
            size="sm"
            key={`${value}-proccent-${index}-button`}
            className="h-10 hover:bg-[#75778810] transition-all"
            onClick={() => onRate(value)}
          >
            <span className="text-xs sm:text-sm text-muted truncate">
              {value * 100}%
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

const SwapTitle = () => (
  <div
    className="flex justify-between items-center bg-[#111b2a] rounded-lg px-7 gap-5"
    style={{
      boxShadow: "0 0 5px #d9f8ff",
    }}
  >
    <h3 className="text-sm sm:text-lg md:text-xl xl:text-4xl uppercase relative font-['Syne'] text-[#d9f8ff] py-5">
      Swap with the best route
    </h3>
    <img
      src="/assets/images/swap_icon.png"
      alt="swap icon \ arrows"
      width={64}
      height={64}
      className="hidden md:flex aspect-square object-contain"
    />
  </div>
);

const jupiterQuoteApi = createJupiterApiClient();

const IndexSwap = ({ isEXTRASMALL }: Props) => {
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [amount, setAmount] = useState(0);
  const [, setTokenList] = useAtom(tokenAtom);
  const [swapData, setSwapData] = useAtom(swapAtom);
  const { publicKey, wallet, signTransaction, sendTransaction } = useWallet();
  const { tokens: userWalletTokens, refetch } = useWalletBalance(
    connection,
    publicKey
  );
  const [, updateModal] = useAtom(swapModalAtom);

  const { toast } = useToast();

  const handleRouters = useCallback(
    async (e: number) => {
      if (
        !swapData ||
        !swapData.firstToken?.address ||
        !swapData.firstToken.decimals ||
        !swapData.secondToken?.decimals ||
        !swapData.secondToken ||
        !swapData.secondToken?.address
      )
        return;
      try {
        setIsFetching(true);
        const quoteResponse = await jupiterQuoteApi.quoteGet({
          inputMint: swapData.firstToken.address,
          outputMint: swapData.secondToken.address,
          amount: Number((e * 10 ** swapData.firstToken.decimals).toFixed(0)),
        });
        setSwapData((e) => ({
          ...e,
          quoteResponse,
          secondAmount:
            Number(quoteResponse.outAmount) /
            10 ** (swapData?.secondToken?.decimals ?? 0),
        }));
        swapInformation[0].value = Math.ceil(
          Number(quoteResponse.priceImpactPct)
        );
        swapInformation[1].currency = swapData.secondToken.symbol;
        swapInformation[1].value = Number(
          (Number(quoteResponse.outAmount) -
            (quoteResponse.slippageBps / 1000) *
              Number(quoteResponse.outAmount)) /
            10 ** swapData.secondToken.decimals
        );
        setIsFetching(false);
      } catch (error) {
        console.error(error);
        setIsFetching(false);
        setSwapData((e) => ({
          ...e,
          quoteResponse: undefined,
          secondAmount: 0,
        }));
      }
    },
    [setSwapData, swapData]
  );
  const debouncedHandleRouters = useCallback(debounce(handleRouters, 500), [
    handleRouters,
  ]);

  const makeSwap = async () => {
    if (
      !swapData ||
      !swapData.firstToken ||
      !swapData.secondToken ||
      !signTransaction ||
      !publicKey ||
      !swapData.firstToken.address ||
      !swapData.secondToken.address ||
      !swapData.quoteResponse
    )
      return;

    try {
      const { swapTransaction } = await jupiterQuoteApi.swapPost({
        swapRequest: {
          quoteResponse: swapData.quoteResponse,
          userPublicKey: publicKey.toBase58(),
        },
      });
      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const d = await signTransaction(transaction);
      const rawTransaction = d.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        maxRetries: 2,
        skipPreflight: true,
      });
      console.log("confirm start:", txid);
      const confirmation = await connection.confirmTransaction(txid);
      console.log("confirm ends:", confirmation);

      // await connection.confirmTransaction(txid);
      toast({
        title: "Transaction sent",
        description: "Transaction has been sent to the network",
        link: `https://solscan.io/tx/${txid}`,
        color: "green",
      });
      await refetch();
      updateSwapBalance();
    } catch (e: unknown) {
      toast({
        title: "Error while swapping:",
        // @ts-ignore
        description: e.message,
        color: "red",
        variant: "destructive",
      });
    }
  };

  const handleChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };

  const calculatePrice = useCallback(async () => {
    if (
      swapData.firstToken &&
      swapData.secondToken &&
      swapData.firstToken.address &&
      swapData.secondToken.address
    ) {
      const firstP = (await getPrice(swapData.firstToken.address)) ?? 0;
      const secondP = (await getPrice(swapData.secondToken.address)) ?? 0;
      setSwapData((e) => ({
        ...e,
        firstToken: {
          ...e.firstToken,
          price: firstP,
        },
        secondToken: {
          ...e.secondToken,
          price: secondP,
        },
      }));
    }
  }, [setSwapData, swapData.firstToken, swapData.secondToken]);

  const handleOpenModal = useCallback(
    (value: "first" | "second") => {
      updateModal({
        open: true,
        type: value,
      });
    },
    [updateModal]
  );
  // update the user balance
  const updateSwapBalance = useCallback(() => {
    const isFirstExist = userWalletTokens.findIndex(
      (e) => e.address === swapData.firstToken?.address
    );
    const isSecondExist = userWalletTokens.findIndex(
      (e) => e.address === swapData.secondToken?.address
    );
    if (isFirstExist > -1) {
      setSwapData((e) => ({
        ...e,
        firstUserBalance: userWalletTokens[isFirstExist].amount,
      }));
    } else {
      setSwapData((e) => ({
        ...e,
        firstUserBalance: 0,
      }));
    }
    if (isSecondExist > -1) {
      setSwapData((e) => ({
        ...e,
        secondUserBalance: userWalletTokens[isSecondExist].amount,
      }));
    } else {
      setSwapData((e) => ({
        ...e,
        secondUserBalance: 0,
      }));
    }
  }, [setSwapData, swapData, userWalletTokens]);

  const prevFirstToken = useRef(swapData.firstToken?.address);
  const prevSecondToken = useRef(swapData.secondToken?.address);
  useEffect(() => {
    // Check if firstToken or secondToken has changed
    if (
      prevFirstToken.current !== swapData.firstToken?.address ||
      prevSecondToken.current !== swapData.secondToken?.address
    ) {
      updateSwapBalance();
      calculatePrice();
      swapData.firstAmount && handleRouters(swapData.firstAmount);
      // Update the previous values
      prevFirstToken.current = swapData.firstToken?.address;
      prevSecondToken.current = swapData.secondToken?.address;
    }
  }, [
    calculatePrice,
    setSwapData,
    swapData,
    swapData.firstToken,
    swapData.secondToken,
    updateSwapBalance,
    userWalletTokens,
  ]);

  useEffect(() => {
    if (loading && userWalletTokens.length > 0) {
      (async () => {
        setLoading(false);
        const tokens: TokenType[] = await (
          await fetch(TOKEN_LIST_URL["mainnet-beta"])
        ).json();
        console.log(tokens, TOKEN_LIST_URL["mainnet-beta"]);
        if (tokens) {
          setTokenList(tokens);
          const solana = tokens.find((t: any) => t.symbol === "SOL");
          const USDC = tokens.find((t: any) => t.symbol === "USDC");

          if (solana && USDC) {
            setSwapData((e) => ({
              firstToken: solana,
              secondToken: USDC,
              firstUserBalance: 0,
              secondUserBalance: 0,
              secondAmount: 0,
              firstAmount: 0,
            }));
            updateSwapBalance();
          }
        }
      })();
    }
  }, [
    loading,
    setSwapData,
    setTokenList,
    swapData,
    updateSwapBalance,
    userWalletTokens.length,
  ]);

  useEffect(() => {
    const updateWalletInterval = setInterval(async () => {
      refetch();
      updateSwapBalance();
    }, 50000);

    return () => {
      clearInterval(updateWalletInterval);
    };
  }, [refetch]);

  return (
    <>
      {swapData.firstToken && swapData.secondToken ? (
        <div className="z-50 static p-5 flex flex-col gap-5 items-center justify-center">
          <SwapTitle />
          <div
            className={`${
              isEXTRASMALL ? "max-w-[300px]" : "max-w-xs"
            } md:max-w-md w-full flex flex-col rounded-3xl p-6 text-[#757788] gap-4 min-h-[740px]`}
            style={{
              boxShadow: "0 0 5px #d9f8ff",
            }}
          >
            {/* background */}
            <div className="max-w-md w-full bg-[#111b2a] opacity-75 blur-sm" />
            {/* background */}
            <SwapBlock
              title="You’re Paying"
              isEXTRASMALL={isEXTRASMALL}
              token={swapData.firstToken}
              onShowModal={() => handleOpenModal("first")}
              amount={swapData.firstAmount}
              balance={swapData.firstUserBalance}
              onAmountUpdate={(e) => {
                setSwapData((b) => ({
                  ...b,
                  firstAmount: e,
                }));
                debouncedHandleRouters(e);
              }}
            />

            <SwapActions
              onToggle={() => {
                setSwapData((e) => ({
                  ...e,
                  firstToken: e.secondToken,
                  secondToken: e.firstToken,
                }));
                updateSwapBalance();
              }}
              onRate={(value: number) =>
                setSwapData((b) => ({
                  ...b,
                  firstAmount: b.firstUserBalance
                    ? b.firstUserBalance * value
                    : 0,
                }))
              }
            />

            <SwapBlock
              title="To Receive"
              isEXTRASMALL={isEXTRASMALL}
              token={swapData.secondToken}
              onShowModal={() => handleOpenModal("second")}
              amount={swapData.secondAmount}
              balance={swapData.secondUserBalance}
              disabled
              loading={isFetching}
              onAmountUpdate={(e) => {
                setSwapData((b) => ({
                  ...b,
                  secondAmount: e,
                }));
              }}
            />

            <div className="flex flex-col gap-2">
              <div className="text-[#757788] text-xs flex gap-2 w-full items-center relative">
                <img
                  src="/assets/icons/main/green_dot.svg"
                  alt="green dot / main"
                  width={4}
                  height={4}
                />
                <p>{swapData.firstToken.symbol}</p>
                <p>&asymp;</p>
                <p>
                  {formatedNumber(
                    (swapData.firstToken.price ?? 0) /
                      (swapData.secondToken.price ?? 0),
                    4,
                    isEXTRASMALL
                  )}{" "}
                  {swapData.secondToken.symbol}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[#757788] text-xs flex gap-2 w-full items-center relative">
                <div className="w-1 h-1" />
                <p>{swapData.secondToken.symbol}</p>
                <p>&asymp;</p>
                <p>
                  {formatedNumber(
                    (swapData.secondToken.price ?? 0) /
                      (swapData.firstToken.price ?? 0),
                    4,
                    isEXTRASMALL
                  )}{" "}
                  {swapData.firstToken.symbol}
                </p>
              </div>
            </div>

            <SwapInfo data={swapInformation} isEXTRASMALL={isEXTRASMALL} />

            <div className="flex justify-between items-center gap-4">
              <div
                key={`${swapData.firstToken.address}_address-info`}
                className="w-full md:w-1/2 flex gap-4 items-center"
              >
                <img
                  src={swapData.firstToken.logoURI}
                  alt={`${swapData.firstToken.symbol}-logo / main`}
                  width={24}
                  height={24}
                  className="aspect-square w-6 h-6 object-contain"
                />
                <div className="flex flex-col truncate gap-1">
                  <span className="text-xs md:text-sm">
                    {swapData.firstToken.symbol} $
                    {formatedNumber(
                      swapData.firstToken.price ?? 0,
                      4,
                      isEXTRASMALL
                    )}
                  </span>
                  <span
                    className="text-xs md:text-sm cursor-pointer border-b border-solid border-[#d9f8ff60] w-max"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        swapData.firstToken?.address ?? ""
                      );
                      toast({
                        title: "Added to clipboard",
                      });
                    }}
                  >
                    {removeMiddleString(swapData.firstToken.address ?? "")}
                  </span>
                </div>
              </div>
              <div
                key={`${swapData.secondToken.address}_address-info`}
                className="w-full md:w-1/2 flex gap-4 items-center"
              >
                <img
                  src={swapData.secondToken.logoURI}
                  alt={`${swapData.secondToken.symbol}-logo / main`}
                  width={24}
                  height={24}
                  className="aspect-square w-6 h-6 object-contain"
                />
                <div className="flex flex-col truncate gap-1">
                  <span className="text-xs md:text-sm">
                    {swapData.secondToken.symbol} $
                    {formatedNumber(
                      swapData.secondToken.price ?? 0,
                      4,
                      isEXTRASMALL
                    )}
                  </span>
                  <span
                    className="text-xs md:text-sm cursor-pointer border-b border-solid border-[#d9f8ff60] w-max"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        swapData.secondToken?.address ?? ""
                      );
                      toast({
                        title: "Added to clipboard",
                      });
                    }}
                  >
                    {removeMiddleString(swapData.secondToken.address ?? "")}
                  </span>
                </div>
              </div>
            </div>

            <Button onClick={makeSwap} disabled={!publicKey}>
              {loading || isFetching ? "Loading..." : "Swap"}
            </Button>
          </div>
        </div>
      ) : (
        <CircularProgress
          sx={{
            position: "absolute",
            color: "#fff",
            top: "50%",
            left: "50%",
          }}
        />
      )}
      <SwapModal />
    </>
  );
};

export default IndexSwap;

// TODO make dynamic
let swapInformation: SwapInfoProps["data"] = [
  {
    title: "Price Impact",
    value: 0,
    sign: "less",
  },
  {
    title: "Minimum Received",
    value: 0,
    currency: "SOL",
  },
  {
    title: "Transaction Fee",
    value: 0.005,
    currency: "SOL",
  },
];
