"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMemo, useState } from "react";

import {
  useRemoveAmmLiquidityModal,
  useRemoveLiquidityModal,
} from "@/lib/stores/liquidity.store";
import CloseIcon from "@mui/icons-material/Close";
import { Slider } from "@mui/material";
import { useAtom } from "jotai";
import {
  selectedDepositAtom,
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
  Liquidity,
  Token,
  TokenAmount,
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

const RemoveAmmLiquidityModal = (props: Props) => {
  const { isOpen, onClose } = useRemoveAmmLiquidityModal();
  const [amount, setAmount] = useState({
    amountA: 0,
    amountB: 0,
  });
  const [selectedPool] = useAtom(selectedPoolAtom);
  const [selectedDeposit] = useAtom(selectedDepositAtom);
  const [row] = useAtom(selectedPositionRowAtom);
  const { wallet } = useWallet();
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedLPShare, setSelectedLPShare] = useState(0);
  const userShare =
    (selectedDeposit?.amount ?? 0) /
    10 ** (selectedPool?.lpMint?.decimals ?? 0);

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
    setLoading(true);
    setSelectedLPShare((userShare / 100) * percent);
    setLoading(false);
  }, 500);

  const handleRemoveLiquidity = async () => {
    if (
      !selectedPool ||
      !selectedPool.lpMint ||
      !wallet ||
      !wallet.adapter.publicKey
    )
      return;
    const walletTokenAccounts = await getWalletTokenAccount(
      connection,
      wallet.adapter.publicKey
    );

    const lpToken: Token = {
      mint: new PublicKey(selectedPool.lpMint?.address ?? ""),
      programId: new PublicKey(selectedPool.lpMint?.programId ?? ""),
      decimals: selectedPool.lpMint?.decimals ?? 0,
      symbol: selectedPool.lpMint?.symbol ?? "",
      name: selectedPool.lpMint?.name ?? "",
      equals(other: Token): boolean {
        return false;
      },
    };
    const removeLpTokenAmount = new TokenAmount(
      lpToken,
      new BN(
        new Decimal(
          selectedLPShare * 10 ** (selectedPool.lpMint.decimals ?? 0)
        ).toFixed(0)
      )
    );
    await raydiumActions.removeAmmLiquidity({
      wallet: wallet.adapter as BaseSignerWalletAdapter,
      targetPool: selectedPool.id,
      removeLpTokenAmount,
      walletTokenAccounts,
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
        <div className={"border p-3 px-5  rounded-3xl border-[#757788]"}>
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
          <div className={"mt-3 w-full"}>
            <Slider
              value={percent}
              onChange={(_, value) => setPercent(value as number)}
              onChangeCommitted={async (_, value) => {
                await handleAmountFromPercent(value as number);
              }}
              color={"info"}
            />
          </div>
          <p className="text-white">
            max LP token available: {formatedNumber(userShare, 10)}
          </p>
        </div>
        {/* Last Box */}
        <div
          className={
            "border rounded-3xl p-5 justify-between text-white flex flex-row border-[#757788]"
          }
        >
          <p>Minimum Received</p>
          <p>
            {formatedNumber(selectedLPShare * (selectedPool?.lpPrice ?? 0))} $
          </p>
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

export default RemoveAmmLiquidityModal;
