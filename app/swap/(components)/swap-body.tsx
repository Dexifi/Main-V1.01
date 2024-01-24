import { SwapModal } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { connection } from "@/lib/get-connections";
import { getPrice, getTokenBalanceFromWallet } from "@/lib/get-wallet";
import formatedNumber from "@/lib/numbers";
import { useSwapModal } from "@/lib/stores/swap.store";
import { removeMiddleString } from "@/lib/string";
import { Jupiter, TOKEN_LIST_URL, getPlatformFeeAccounts } from "@jup-ag/core";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmRawTransaction,
} from "@solana/web3.js";
import { ChevronsDown, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

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
    currency: string;
    text?: string;
  }[];
  isEXTRASMALL: boolean;
};

type SwapBlockProps = {
  title: string;
  onUpdate: (e: any) => void;
  onModal: () => void;
  value: number;
  isEXTRASMALL: boolean;
  balance: string;
  data: {
    address: string;
    chainId: number;
    decimals: number;
    balance?: number;
    extensions: {
      coingeckoId: string;
    };
    logoURI: string;
    name: string;
    price: number;
    symbol: string;
    tags: string[];
  };
};

const SwapBlock = ({
  title,
  onUpdate,
  onModal,
  balance,
  value,
  data,
  isEXTRASMALL,
}: SwapBlockProps) => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h6 className="text-sm text-[#d9f8ff] truncate" key={title}>
          {title}
        </h6>
        <div className="text-sm flex gap-2 items-center">
          Balance: {formatedNumber(+balance, 2, isEXTRASMALL)}
          <span>{data.symbol}</span>
        </div>
      </div>
      <div className="flex justify-between items-center w-full gap-4 p-3 md:p-5 bg-[#0d111b40] rounded-lg">
        <Button
          className="rounded-full flex gap-3 md:gap-6 justify-between items-center flex-1 md:min-w-[170px]"
          onClick={onModal}
          style={{
            boxShadow: "0 0 5px rgba(217, 248, 255, 0.25)",
          }}
        >
          <Image
            src={data.logoURI ? data.logoURI : "/assets/images/solana-1@2x.png"}
            alt="solana_icons"
            width={24}
            height={24}
            className="max-h-5 aspect-square object-contain"
          />
          <div className="text-sm">{data.symbol}</div>
          <ChevronsDown className="w-5 h-5 min-w-[1.25rem] aspect-square object-contain text-[#d9f8ff50] hidden md:flex" />
        </Button>
        <Input
          type="number"
          placeholder="0.00"
          required
          className="h-9 bg-[#0d111b] max-w-[80px] md:max-w-[140px] rounded-lg"
          value={value}
          min={0.01}
          max={4000}
          color="#ff0"
          onChange={onUpdate}
        />
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
    <Image
      src="/assets/images/swap_icon.png"
      alt="swap icon \ arrows"
      width={64}
      height={64}
      className="hidden md:flex aspect-square object-contain"
    />
  </div>
);
const IndexSwap = ({ isEXTRASMALL }: Props) => {
  const [tokenList, setTokenList] = useState<any>([]);
  const [firstToken, setFirstToken] = useState<any>(null);
  const [secondToken, setSecondToken] = useState<any>(null);
  const [fetched, setFetched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [secondAmount, setSecondAmount] = useState(0);

  const { publicKey, wallet } = useWallet();
  useEffect(() => {
    if (!fetched) {
      (async () => {
        const tokens = await (
          await fetch(TOKEN_LIST_URL["mainnet-beta"])
        ).json();
        setTokenList(tokens);
        const solana = tokens.find((t: any) => t.symbol === "SOL");
        solana.price = await getPrice("SOL");
        setFirstToken(solana);
        const USDC = tokens.find((t: any) => t.symbol === "USDC");
        USDC.price = await getPrice("USDC");
        setSecondToken(USDC);
        setFetched(true);
      })();
    }
  }, []);
  const fetchTokensWithWallet = async () => {
    const tokens = tokenList;
    if (publicKey === null) {
      return false;
    }
    const walletTokens = await getTokenBalanceFromWallet(publicKey);
    walletTokens.map((item: any) => {
      tokens.forEach(async (token: any) => {
        if (
          "parsed" in item.account.data &&
          item.account.data.parsed.info.mint === token.address
        ) {
          token.balance = item.account.data.parsed.info.tokenAmount.uiAmount;
          token.price = await getPrice(token.symbol);
        }
      });
    });
    const solanaToken = tokens.find((token: any) => token.symbol === "SOL");
    solanaToken.balance =
      (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL;
    setTokenList(tokens);
  };

  useEffect(() => {
    if (publicKey && fetched) fetchTokensWithWallet();
  }, [publicKey, fetched]);

  const { toast } = useToast();
  const makeSwap = async () => {
    try {
      const platformFeeAndAccounts = {
        feeBps: 50,
        feeAccounts: await getPlatformFeeAccounts(
          connection,
          new PublicKey("BUX7s2ef2htTGb2KKoPHWkmzxPj4nTWMWRgs5CSbQxf9") // The platform fee account owner
        ),
      };
      //  Load Jupiter
      const jupiter = await Jupiter.load({
        connection,
        cluster: "mainnet-beta",
        // @ts-ignore
        user: publicKey, // or public key
        platformFeeAndAccounts,
      });
      const routes = await jupiter.computeRoutes({
        inputMint: new PublicKey(firstToken.address),
        outputMint: new PublicKey(secondToken.address),
        // @ts-ignore
        amount: JSBI.BigInt(parseInt(amount * 10 ** firstToken.decimals)), // 1000000 => 1 USDC if inputToken.address is USDC mint.
        slippageBps: 1, // 1 bps = 0.01%.
        // forceFetch (optional) => to force fetching routes and not use the cache.
        // intermediateTokens => if provided will only find routes that use the intermediate tokens.
        // feeBps => the extra fee in BPS you want to charge on top of this swap.
        // onlyDirectRoutes =>  Only show single hop routes.
        // swapMode => "ExactIn" | "ExactOut" Defaults to "ExactIn"  "ExactOut" is to support use cases like payments when you want an exact output amount.
        // enforceSingleTx =>  Only show routes where only one single transaction is used to perform the Jupiter swap.
      });
      const { swapTransaction, addressLookupTableAccounts } =
        await jupiter.exchange({
          routeInfo: routes.routesInfos[0],
        });
      // @ts-ignore
      var message = TransactionMessage.decompile(Transaction.message, {
        addressLookupTableAccounts: addressLookupTableAccounts,
      });

      // decompile transaction message and add transfer instruction
      // @ts-ignore
      message = TransactionMessage.decompile(swapTransaction.message, {
        addressLookupTableAccounts: addressLookupTableAccounts,
      });

      // create your instruction and add it to message.instructions
      // @ts-ignore
      const instruction = message.instructions.push(instruction); // add your own instruction here

      // compile the message and update the swapTransaction
      // @ts-ignore
      swapTransaction.message = message.compileToV0Message(
        addressLookupTableAccounts
      );
      // @ts-ignore
      swapTransaction.sign([wallet.payer]);
      // Execute the transaction
      const rawTransaction = swapTransaction.serialize();
      const txid = await sendAndConfirmRawTransaction(
        connection,
        // @ts-ignore
        rawTransaction,
        {
          skipPreflight: true,
          commitment: "confirmed",
          maxRetries: 2,
        }
      );
      console.log(`https://solscan.io/tx/${txid}`);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    firstToken && amount && setSecondAmount(amount * firstToken.price);
  }, [amount, firstToken, secondToken]);

  useEffect(() => {
    firstToken && secondAmount && setAmount(secondAmount / firstToken.price);
  }, [secondAmount, firstToken, secondToken]);

  const { onOpen } = useSwapModal();

  const [data, setData] = useState({
    paying: {
      you: 0,
      recive: 0,
    },
    information: [
      {
        title: "Price Impact",
        value: 0.1,
        sign: "less",
      },
      {
        title: "Minimum Received",
        value: 0.190275191,
        currency: "SOL",
      },
      {
        title: "Transaction Fee",
        value: 0.000005,
        currency: "SOL",
      },
      {
        title: "Deposit",
        value: 0.00203928,
        currency: "SOL",
        text: "for 1 ATA account",
      },
    ],
  });
  return (
    <>
      {firstToken && secondToken ? (
        <div className="z-50 static p-5 flex flex-col gap-5 items-center">
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
              data={firstToken}
              isEXTRASMALL={isEXTRASMALL}
              value={data.paying.you}
              balance={"0"}
              onModal={() => {
                console.log("click!");
                onOpen();
              }}
              onUpdate={(e) =>
                setData({
                  ...data,
                  paying: {
                    ...data.paying,
                    you:
                      +e.target.value.slice(0, 4) > 4000
                        ? 4000
                        : +e.target.value.slice(0, 4),
                  },
                })
              }
            />

            <SwapActions
              onToggle={() => {
                setSecondToken(firstToken);
                setFirstToken(secondToken);
              }}
              onRate={(value: number) =>
                setAmount(
                  firstToken.balance
                    ? +formatedNumber(
                        firstToken.balance * value,
                        2,
                        isEXTRASMALL
                      )
                    : +formatedNumber(0 * value, 2, isEXTRASMALL)
                )
              }
            />

            <SwapBlock
              title="To Receive"
              balance={"0"}
              data={secondToken}
              onModal={() => {
                console.log("click! SECOND");
                onOpen();
              }}
              value={data.paying.recive}
              isEXTRASMALL={isEXTRASMALL}
              onUpdate={(e) => {
                setData({
                  ...data,
                  paying: {
                    ...data.paying,
                    recive:
                      +e.target.value.slice(0, 4) > 4000
                        ? 4000
                        : +e.target.value.slice(0, 4),
                  },
                });
              }}
            />

            <div className="flex flex-col gap-2">
              <div className="text-[#757788] text-xs flex gap-2 w-full items-center relative">
                <Image
                  src="/assets/icons/main/green_dot.svg"
                  alt="green dot / main"
                  width={4}
                  height={4}
                />
                <p>{firstToken.symbol}</p>
                <p>&asymp;</p>
                <p>
                  {formatedNumber(firstToken.price, 4, isEXTRASMALL)}{" "}
                  {firstToken.symbol}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[#757788] text-xs flex gap-2 w-full items-center relative">
                <div className="w-1 h-1" />
                <p>{secondToken.symbol}</p>
                <p>&asymp;</p>
                <p>
                  {formatedNumber(secondToken.price, 4, isEXTRASMALL)}{" "}
                  {secondToken.symbol}
                </p>
              </div>
            </div>

            {/* @ts-ignore */}
            <SwapInfo data={data.information} isEXTRASMALL={isEXTRASMALL} />

            <div className="flex justify-between items-center gap-4">
              <div
                key={`${firstToken.address}_address-info`}
                className="w-full md:w-1/2 flex gap-4 items-center"
              >
                <Image
                  src={firstToken.logoURI}
                  alt={`${firstToken.symbol}-logo / main`}
                  width={24}
                  height={24}
                  className="aspect-square w-6 h-6 object-contain"
                />
                <div className="flex flex-col truncate gap-1">
                  <span className="text-xs md:text-sm">
                    {firstToken.symbol} $
                    {formatedNumber(firstToken.price, 4, isEXTRASMALL)}
                  </span>
                  <span
                    className="text-xs md:text-sm cursor-pointer border-b border-solid border-[#d9f8ff60] w-max"
                    onClick={() => {
                      navigator.clipboard.writeText(firstToken.address);
                      toast({
                        title: "Added to clipboard",
                      });
                    }}
                  >
                    {removeMiddleString(firstToken.address)}
                  </span>
                </div>
              </div>
              <div
                key={`${secondToken.address}_address-info`}
                className="w-full md:w-1/2 flex gap-4 items-center"
              >
                <Image
                  src={secondToken.logoURI}
                  alt={`${secondToken.symbol}-logo / main`}
                  width={24}
                  height={24}
                  className="aspect-square w-6 h-6 object-contain"
                />
                <div className="flex flex-col truncate gap-1">
                  <span className="text-xs md:text-sm">
                    {secondToken.symbol} $
                    {formatedNumber(secondToken.price, 4, isEXTRASMALL)}
                  </span>
                  <span
                    className="text-xs md:text-sm cursor-pointer border-b border-solid border-[#d9f8ff60] w-max"
                    onClick={() => {
                      navigator.clipboard.writeText(secondToken.address);
                      toast({
                        title: "Added to clipboard",
                      });
                    }}
                  >
                    {removeMiddleString(secondToken.address)}
                  </span>
                </div>
              </div>
            </div>

            <Button onClick={makeSwap} disabled={!publicKey}>
              Swap
            </Button>
          </div>
        </div>
      ) : null}
      <SwapModal
        tokens={tokenList}
        setToken={setSecondToken}
        firstToken={firstToken}
        secondToken={secondToken}
      />
    </>
  );
};

export default IndexSwap;
