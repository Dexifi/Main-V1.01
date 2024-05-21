"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMemo, useState } from "react";

import { useRemoveLiquidityModal } from "@/lib/stores/liquidity.store";
import CloseIcon from "@mui/icons-material/Close";
import { Slider } from "@mui/material";
import { useAtom } from "jotai";
import {
  selectedPoolAtom,
  selectedPositionAtom,
  selectedPositionRowAtom,
} from "@/components/modals/store";
import { useLiquidity } from "@/applications/Liquidity/store";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Clmm,
  ClmmPoolInfo,
  fetchMultipleMintInfos,
} from "@raydium-io/raydium-sdk";
import { connection } from "@/lib/get-connections";
import BN from "bn.js";
import { PublicKey } from "@solana/web3.js";
import { debounce } from "lodash";
import formatedNumber from "@/lib/numbers";
import { raydiumActions } from "@/applications/Liquidity/actions";
import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";
import { getWalletTokenAccount } from "@/hooks/useLiquidity";
import Decimal from "decimal.js";

type Props = {};

const RemoveLiquidityModal = (props: Props) => {
  const { isOpen, onClose } = useRemoveLiquidityModal();
  const [amount, setAmount] = useState({
    amountA: 0,
    amountB: 0,
  });
  const [selectedPool] = useAtom(selectedPoolAtom);
  const [position] = useAtom(selectedPositionAtom);
  const [row] = useAtom(selectedPositionRowAtom);
  const userTokens = useLiquidity((state) => state.userTokens);
  const tokenPrices = useLiquidity((state) => state.tokenPrices);
  const { wallet } = useWallet();
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const tokenAName = useMemo(
    () =>
      selectedPool?.mintA.symbol
        ? selectedPool?.mintA.symbol
        : selectedPool?.mintA.address.slice(0, 4),
    [selectedPool]
  );
  const tokenBName = useMemo(
    () =>
      selectedPool?.mintB.symbol
        ? selectedPool?.mintB.symbol
        : selectedPool?.mintB.address.slice(0, 4),
    [selectedPool]
  );

  const handleAmountFromPercent = debounce(async (percent: number) => {
    if (!selectedPool || !position || !row) return;
    setLoading(true);

    const liq = new BN(position.liquidity.toNumber() * (percent / 100));
    const { amountA, amountB } = Clmm.getAmountsFromLiquidity({
      amountAddFee: false,
      epochInfo: await connection.getEpochInfo(),
      slippage: 0,
      poolInfo: row?.state,
      liquidity: liq,
      tickUpper: position?.tickUpper,
      tickLower: position?.tickLower,
      add: true,
      token2022Infos: await fetchMultipleMintInfos({
        connection,
        mints: [
          new PublicKey(selectedPool.mintA.address),
          new PublicKey(selectedPool.mintB.address),
        ],
      }),
    });

    setAmount({
      amountA:
        amountA.amount.toNumber() / 10 ** (selectedPool?.mintA.decimals ?? 0),
      amountB:
        amountB.amount.toNumber() / 10 ** (selectedPool?.mintB.decimals ?? 0),
    });
    setLoading(false);
  }, 500);

  const handleUpdateAmount = async (value: string, isA: boolean) => {
    setAmount((amount) => ({
      ...amount,
      [isA ? "amountA" : "amountB"]: parseFloat(value),
    }));

    if (!selectedPool || !position || !row) return;
    setLoading(true);
    const amount = parseFloat(value);
    const liq = new BN(
      amount *
        10 ** (isA ? selectedPool.mintA.decimals : selectedPool.mintB.decimals)
    );

    const { amountA, amountB } = Clmm.getLiquidityAmountOutFromAmountIn({
      poolInfo: row?.state,
      slippage: 0,
      inputA: isA,
      tickUpper: position.tickUpper,
      tickLower: position.tickLower,
      amount: liq,
      add: true,
      amountHasFee: true,
      token2022Infos: await fetchMultipleMintInfos({
        connection,
        mints: [
          new PublicKey(selectedPool.mintA.address),
          new PublicKey(selectedPool.mintB.address),
        ],
      }),
      epochInfo: await connection.getEpochInfo(),
    });

    setAmount({
      amountA:
        amountA.amount.toNumber() / 10 ** (selectedPool?.mintA.decimals ?? 0),
      amountB:
        amountB.amount.toNumber() / 10 ** (selectedPool?.mintB.decimals ?? 0),
    });
    setLoading(false);
  };

  const positionYield = useMemo(() => {
    const amountA =
      ((position?.tokenFeeAmountA.toNumber() ?? 0) /
        10 ** (selectedPool?.mintA.decimals ?? 0)) *
      tokenPrices[selectedPool?.mintA.address ?? ""];
    const amountB =
      ((position?.tokenFeeAmountB.toNumber() ?? 0) /
        10 ** (selectedPool?.mintB.decimals ?? 0)) *
      tokenPrices[selectedPool?.mintB.address ?? ""];
    return formatedNumber(amountA + amountB);
  }, [position, selectedPool, tokenPrices]);

  const handleRemoveLiquidity = async () => {
    if (
      !selectedPool ||
      !position ||
      !row ||
      !wallet ||
      !wallet.adapter.publicKey
    )
      return;
    const walletAccounts = await getWalletTokenAccount(
      connection,
      wallet.adapter.publicKey
    );
    const tx = await raydiumActions.removeClmmPosition({
      poolInfo: row.state,
      position: position,
      wallet: wallet?.adapter as BaseSignerWalletAdapter,
      walletTokenAccounts: walletAccounts,
      inputTokenAmount: new BN(
        new Decimal(
          amount.amountA * 10 ** (selectedPool?.mintA.decimals ?? 0)
        ).toFixed(0)
      ),
      inputTokenMint: "mintA",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110] rounded-2xl p-4 sm:p-5"
        style={{
          boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
          borderColor: "rgba(171,196,255,0.5",
        }}
      >
        <div className={"text-white"}>
          <div className={"flex flex-row gap-1 w-full justify-between"}>
            <div className={"flex flex-row gap-1"}>
              <p>Remove Liquidity from</p>
              <div className={"flex flex-row"}>
                <p>{`${tokenAName}-${tokenBName}`}</p>
              </div>
            </div>
            <div onClick={onClose}>
              <CloseIcon />
            </div>
          </div>
        </div>
        {/* First Box */}
        <div
          className={
            "text-white border rounded-3xl p-3 bg-[#19232d] border-[#757788]"
          }
        >
          <div className={"flex flex-row justify-between w-full"}>
            <p>Base</p>
            <div className={"flex flex-row mt-1"}>
              <p>Deposited:</p>
              <p className={"ml-1"}>
                {(position?.amountA.toNumber() ?? 0) /
                  10 ** (selectedPool?.mintA.decimals ?? 0)}
              </p>
            </div>
          </div>
          <div
            className={"flex flex-row mt-2 w-full justify-between items-center"}
          >
            <div className={"flex flex-row items-center gap-2"}>
              <div
                className={
                  "bg-white h-8 w-8 flex flex-row justify-center items-center rounded-full"
                }
              >
                <img
                  className={"w-6 h-6 rounded-full"}
                  src={selectedPool?.mintA.logoURI}
                />
              </div>

              <p>{tokenAName}</p>
              <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
              <button
                onClick={() => {
                  setPercent(100);
                  handleUpdateAmount(
                    (
                      (position?.amountA.toNumber() ?? 0) /
                      10 ** (selectedPool?.mintA.decimals ?? 0)
                    ).toString(),
                    true
                  );
                }}
                className={"bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6"}
              >
                Max
              </button>
            </div>
            <input
              className={"bg-[#19232d] text-right !border-0 outline-0 h-5"}
              value={amount.amountA}
              onChange={(e) => handleUpdateAmount(e.target.value, true)}
              type={"number"}
            />
          </div>
          <div className={"flex flex-row mt-2 justify-end"}>{`$${formatedNumber(
            amount.amountA * tokenPrices[selectedPool?.mintA.address ?? ""]
          )}`}</div>
        </div>
        {/* Second Box */}
        <div
          className={
            "text-white border rounded-3xl p-3 bg-[#19232d] border-[#757788]"
          }
        >
          <div className={"flex flex-row justify-between w-full"}>
            <p>Qoute</p>
            <div className={"flex flex-row mt-1"}>
              <p>Deposited:</p>
              <p className={"ml-1"}>
                {(position?.amountB.toNumber() ?? 0) /
                  10 ** (selectedPool?.mintB.decimals ?? 0)}
              </p>
            </div>
          </div>
          <div
            className={"flex flex-row mt-2 w-full justify-between items-center"}
          >
            <div className={"flex flex-row items-center gap-2"}>
              <div
                className={
                  "bg-white h-8 w-8 flex flex-row justify-center items-center rounded-full"
                }
              >
                <img
                  className={"w-6 h-6 rounded-full"}
                  src={selectedPool?.mintB.logoURI}
                />
              </div>

              <p>{tokenBName}</p>
              <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
              <button
                onClick={() => {
                  setPercent(100);
                  handleUpdateAmount(
                    (
                      (position?.amountA.toNumber() ?? 0) /
                      10 ** (selectedPool?.mintA.decimals ?? 0)
                    ).toString(),
                    false
                  );
                }}
                className={"bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6"}
              >
                Max
              </button>
            </div>
            <input
              value={amount.amountB}
              onChange={(e) => handleUpdateAmount(e.target.value, false)}
              className={"bg-[#19232d] text-right !border-0 outline-0 h-5"}
              type={"number"}
            />
          </div>
          <div className={"flex flex-row mt-2 justify-end"}>
            {`$${formatedNumber(
              amount.amountB * tokenPrices[selectedPool?.mintB.address ?? ""]
            )}`}
          </div>
        </div>
        {/*Third box*/}
        <div className={"border p-3 rounded-3xl border-[#757788]"}>
          <div className={"flex flex-row justify-between items-center"}>
            <div className={"flex flex-row text-white gap-2 items-center"}>
              <p>Amount</p>
              <button
                onClick={() => {
                  setPercent(100);
                  handleAmountFromPercent(100);
                }}
                className={"bg-[#19232d] text-[#abc4ff] px-1.5 rounded-sm h-6 "}
              >
                Max
              </button>
              <button
                onClick={() => {
                  setPercent(75);
                  handleAmountFromPercent(75);
                }}
                className={"bg-[#19232d] text-[#abc4ff] px-1.5 rounded-sm h-6 "}
              >
                75%
              </button>
              <button
                onClick={() => {
                  setPercent(50);
                  handleAmountFromPercent(50);
                }}
                className={"bg-[#19232d] text-[#abc4ff] px-1.5 rounded-sm h-6"}
              >
                50%
              </button>
              <button
                onClick={() => {
                  setPercent(25);
                  handleAmountFromPercent(25);
                }}
                className={"bg-[#19232d] text-[#abc4ff] px-1.5 rounded-sm h-6"}
              >
                25%
              </button>
            </div>
            <p className={"text-white"}>{percent}%</p>
          </div>
          <Slider
            value={percent}
            onChange={(_, value) => setPercent(value as number)}
            onChangeCommitted={async (_, value) => {
              await handleAmountFromPercent(value as number);
            }}
            className={"mt-3"}
            color={"info"}
          />
        </div>
        {/* Last Box */}
        <div className={"border rounded-3xl p-3 text-white border-[#757788]"}>
          <p>Pending Yield</p>
          <div className={"flex flex-row justify-end"}>
            <p>${positionYield}</p>
          </div>
          <p>Minimum Received</p>
          <div
            className={"w-full flex flex-row justify-between mt-2 items-center"}
          >
            <div className={"flex flex-row gap-3 items-center"}>
              <div
                className={
                  "bg-white h-8 w-8 flex flex-row justify-center items-center rounded-full"
                }
              >
                <img
                  className={"w-6 h-6 rounded-full"}
                  src={selectedPool?.mintA.logoURI}
                />
              </div>
              <p>{tokenAName}</p>
            </div>
            <p>{amount.amountA}</p>
          </div>
          <div
            className={"w-full flex flex-row justify-between mt-2 items-center"}
          >
            <div className={"flex flex-row gap-3 items-center"}>
              <div
                className={
                  "bg-white h-8 w-8 flex flex-row justify-center items-center rounded-full"
                }
              >
                <img
                  className={"w-6 h-6 rounded-full"}
                  src={selectedPool?.mintB.logoURI}
                />
              </div>
              <p>{tokenBName}</p>
            </div>
            <p>{amount.amountB}</p>
          </div>
        </div>
        <button
          disabled={loading}
          onClick={handleRemoveLiquidity}
          className={"h-12 rounded-md text-white bg-[#0b1938]"}
        >
          {loading ? "Loading" : "Withdraw Liquidity"}
        </button>
        <button
          onClick={onClose}
          className={"bg-[#0D111B] h-12 rounded-3xl text-white"}
        >
          Cancel
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveLiquidityModal;
