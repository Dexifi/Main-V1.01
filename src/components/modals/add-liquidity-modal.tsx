"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useAddLiquidityModal } from "@/lib/stores/liquidity.store";
import { useAtom } from "jotai";
import CloseIcon from "@mui/icons-material/Close";
import {
  selectedPoolAtom,
  selectedPositionAtom,
  selectedPositionRowAtom,
} from "@/components/modals/store";
import BN from "bn.js";
import formatedNumber from "@/lib/numbers";
import { useLiquidity } from "@/applications/Liquidity/store";
import { raydiumActions } from "@/applications/Liquidity/actions";
import { useWallet } from "@solana/wallet-adapter-react";
import { debounce, isNumber } from "lodash";
import { connection } from "@/lib/get-connections";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { getWalletTokenAccount } from "@/hooks/useLiquidity";
import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";

type Props = {};

const AddLiquidityModal = (props: Props) => {
  const { isOpen, onClose } = useAddLiquidityModal();
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
  const handleMaximizeAmount = async (token?: string) => {
    if (!token) return;
    const balance = userTokens.find((e) => e.address === token)?.balance;
    if (!balance) return;
    setAmount((prev) => ({
      ...prev,
      [token === selectedPool?.mintA.address ? "amountA" : "amountB"]: balance,
    }));
    await updateInputs(balance, token === selectedPool?.mintA.address);
  };
  const updateInputs = debounce(async (amountN: number, isMintA?: boolean) => {
    if (!row?.state || !position || !wallet?.adapter.publicKey) return;
    const data = await raydiumActions.calculateAmounts(
      row.state,
      position,

      new BN(
        amountN *
          10 ** (isMintA ? row.state.mintA.decimals : row.state.mintB.decimals)
      ),
      isMintA ? "mintA" : "mintB",
      0.01
    );

    setAmount({
      amountA: data.amountA.amount.toNumber() / 10 ** row.state.mintA.decimals,
      amountB: data.amountB.amount.toNumber() / 10 ** row.state.mintB.decimals,
    });
  }, 1500);

  const handleAddLiquidity = async () => {
    if (!row?.state || !position || !wallet?.adapter.publicKey) return;
    const walletAccounts = await getWalletTokenAccount(
      connection,
      wallet.adapter.publicKey
    );
    await raydiumActions.addClmmLiquidity({
      poolInfo: row.state,
      position,
      inputTokenAmount: new BN(
        amount.amountA * 10 ** (row.state.mintA.decimals ?? 0)
      ),
      inputTokenMint: "mintA",
      walletTokenAccounts: walletAccounts,
      wallet: wallet.adapter as BaseSignerWalletAdapter,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] z-[110] rounded-xl p-6"
        style={{
          boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
          borderColor: "rgba(171,196,255,0.5",
        }}
      >
        <div className={"flex flex-col"}>
          {/*Header */}
          <div className={"flex flex-row justify-between"}>
            <p className={"text-white text-xl font-bold"}>
              {`Add liquidity to ${
                selectedPool?.mintA.symbol
                  ? selectedPool?.mintA.symbol
                  : selectedPool?.mintA.address.slice(0, 4)
              } - ${
                selectedPool?.mintB.symbol
                  ? selectedPool?.mintB.symbol
                  : selectedPool?.mintB.address.slice(0, 4)
              }`}
            </p>
            <button>
              <CloseIcon color={"inherit"} style={{ color: "white" }} />
            </button>
          </div>
          {/*First Box */}
          <div
            className={
              "flex flex-col border mt-6 p-3 rounded-sm gap-1 border-[#757788]"
            }
          >
            {/*Box Header*/}
            <p className={"text-sky-500 font-bold text-base"}>My Position</p>
            {/*Row One*/}
            <div className={"flex flex-row justify-between"}>
              <div className={"flex flex-row gap-2"}>
                <div className={"flex flex-row"}>
                  <div
                    className={
                      "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                    }
                  >
                    <img
                      alt={"icon"}
                      className={"w-4 h-4 rounded-full"}
                      src={selectedPool?.mintA.logoURI}
                    />
                  </div>
                </div>
                <p className={"text-sky-700 font-bold"}>
                  {selectedPool?.mintA.symbol
                    ? selectedPool?.mintA.symbol
                    : selectedPool?.mintA.address.slice(0, 4)}
                </p>
              </div>
              <div className="flex flex-row gap-1">
                <p className={"text-white"}>
                  {(
                    (position?.amountA.toNumber() ?? 0) /
                    10 ** (selectedPool?.mintA.decimals ?? 0)
                  ).toFixed(4)}
                </p>
                <p className={"text-white"}>
                  {selectedPool?.mintA.symbol
                    ? selectedPool?.mintA.symbol
                    : selectedPool?.mintA.address.slice(0, 4)}
                </p>
              </div>
            </div>
            {/*Row Two*/}
            <div className={"flex flex-row justify-between"}>
              <div className={"flex flex-row gap-1"}>
                <div className={"flex flex-row"}>
                  <div
                    className={
                      "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                    }
                  >
                    <img
                      alt={"icon"}
                      className={"w-4 h-4 rounded-full"}
                      src={selectedPool?.mintB.logoURI}
                    />
                  </div>
                </div>
                <p className={"text-sky-700 font-bold"}>
                  {selectedPool?.mintB.symbol
                    ? selectedPool?.mintB.symbol
                    : selectedPool?.mintB.address.slice(0, 4)}
                </p>
              </div>
              <div className={"flex flex-row gap-1"}>
                <p className={"text-white"}>
                  {(
                    (position?.amountB.toNumber() ?? 0) /
                    10 ** (selectedPool?.mintB.decimals ?? 0)
                  ).toFixed(4)}
                </p>
                <p className={"text-white"}>
                  {selectedPool?.mintB.symbol
                    ? selectedPool?.mintB.symbol
                    : selectedPool?.mintB.address.slice(0, 4)}
                </p>
              </div>
            </div>
          </div>
          {/*Second Box */}
          <div
            className={
              "flex flex-col border mt-6 p-3 rounded-xl gap-3 border-[#757788]"
            }
          >
            {/*  Header */}
            <div className={"flex flex-row justify-between items-start"}>
              <p className={"text-sky-500 font-bold text-base"}>
                Selected Range
              </p>
              <div className={"flex flex-row items-end"}>
                <p className={"text-sky-700 text-xs font-bold mr-2"}>
                  current Price
                </p>
                <div className={"flex flex-row text-sm gap-1"}>
                  <p className={"text-white"}>
                    {formatedNumber(row?.state.currentPrice.toNumber() ?? 0)}
                  </p>
                  <p className={"text-white"}>per</p>
                  <p className={"text-white"}>
                    {selectedPool?.mintA.symbol
                      ? selectedPool?.mintA.symbol
                      : selectedPool?.mintA.address.slice(0, 4)}
                  </p>
                </div>
              </div>
            </div>
            {/*  Box Section */}
            <div className={"flex flex-row justify-between gap-4"}>
              <div
                className={
                  "flex flex-col border py-3 px-4 w-full items-center gap-3 rounded-sm border-[#757788]"
                }
              >
                <p className={"text-sky-500 font-semibold text-base"}>
                  Min Price
                </p>
                <p className={"text-white text-xl"}>
                  {formatedNumber(position?.priceLower.toNumber() ?? 0)}
                </p>
                <div
                  className={
                    "flex flex-row gap-1 text-xs text-sky-700 font-semibold"
                  }
                >
                  <p>
                    {selectedPool?.mintA.symbol
                      ? selectedPool?.mintA.symbol
                      : selectedPool?.mintA.address.slice(0, 4)}
                  </p>
                  <p>per</p>
                  <p>
                    {selectedPool?.mintB.symbol
                      ? selectedPool?.mintB.symbol
                      : selectedPool?.mintB.address.slice(0, 4)}
                  </p>
                </div>
              </div>
              <div
                className={
                  "flex flex-col border py-3 px-4 w-full items-center gap-3 rounded-sm border-[#757788]"
                }
              >
                <p className={"text-sky-500 font-semibold text-base"}>
                  Max Price
                </p>
                <p className={"text-white text-xl"}>
                  {formatedNumber(position?.priceUpper.toNumber() ?? 0)}
                </p>
                <div
                  className={
                    "flex flex-row gap-1 text-xs text-sky-700 font-semibold"
                  }
                >
                  <p>
                    {selectedPool?.mintA.symbol
                      ? selectedPool?.mintA.symbol
                      : selectedPool?.mintA.address.slice(0, 4)}
                  </p>
                  <p>per</p>
                  <p>
                    {selectedPool?.mintB.symbol
                      ? selectedPool?.mintB.symbol
                      : selectedPool?.mintB.address.slice(0, 4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*  Third box*/}
          <div
            className={"flex flex-col bg-[#071233]  mt-4 rounded-xl p-4 gap-2"}
          >
            <div className={"flex flex-row justify-between"}>
              <p className={"text-sky-700 font-semibold text-sm"}>Amount</p>
              <div
                className={
                  "flex flex-row gap-1 text-sky-700 font-semibold text-sm"
                }
              >
                <p>Balance:</p>
                <p>
                  {userTokens.find(
                    (e) => e.address === selectedPool?.mintA.address
                  )?.balance ?? 0}
                </p>
              </div>
            </div>
            <div className={"flex flex-row justify-between"}>
              <div
                className={
                  "flex flex-row text-sky-500 font-semibold text-base items-center gap-2"
                }
              >
                <div className={"flex flex-row"}>
                  <div
                    className={
                      "bg-[#abc4ff] h-7 w-7 flex flex-row justify-center items-center rounded-full"
                    }
                  >
                    <img
                      alt={"icon"}
                      className={"w-6 h-6 rounded-full"}
                      src={selectedPool?.mintA.logoURI}
                    />
                  </div>
                </div>
                <p>
                  {selectedPool?.mintA.symbol
                    ? selectedPool?.mintA.symbol
                    : selectedPool?.mintA.address.slice(0, 4)}
                </p>
                <div className="w-[1px] h-7 bg-white bg-opacity-40"></div>
                {/* Right divider */}
                <Button
                  size={"sm"}
                  className={"bg-white bg-opacity-10 h-7"}
                  onClick={() =>
                    handleMaximizeAmount(selectedPool?.mintA.address)
                  }
                >
                  Max
                </Button>
              </div>
              <div className={"flex flex-col items-end"}>
                <input
                  className={
                    "bg-[#071233] text-white text-right py-1 outline-0 border-0 px-0"
                  }
                  autoFocus={false}
                  value={amount.amountA}
                  onChange={(e) => {
                    setAmount((prev) => ({
                      ...prev,
                      amountA: e.target.value as unknown as number,
                    }));
                    updateInputs(e.target.value as unknown as number, true);
                  }}
                />
                <div
                  className={
                    "flex flex-row mt-1 text-sky-700 font-semibold text-sm"
                  }
                >
                  <p>$</p>
                  <p>
                    {(
                      amount.amountA *
                      tokenPrices[selectedPool?.mintA.address ?? ""]
                    ).toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*  Fourth Box*/}
          <div
            className={"flex flex-col bg-[#071233] mt-4 rounded-xl p-4 gap-2"}
          >
            <div className={"flex flex-row justify-between"}>
              <p className={"text-sky-700 font-semibold text-sm"}>Amount</p>
              <div
                className={
                  "flex flex-row gap-1 text-sky-700 font-semibold text-sm"
                }
              >
                <p>Balance:</p>
                <p>
                  {userTokens.find(
                    (e) => e.address === selectedPool?.mintB.address
                  )?.balance ?? 0}
                </p>
              </div>
            </div>
            <div className={"flex flex-row justify-between"}>
              <div
                className={
                  "flex flex-row text-sky-500 font-semibold text-base items-center gap-2"
                }
              >
                <div
                  className={
                    "bg-[#abc4ff] h-7 w-7 flex flex-row justify-center items-center rounded-full"
                  }
                >
                  <img
                    alt={"icon"}
                    className={"w-6 h-6 rounded-full"}
                    src={selectedPool?.mintB.logoURI}
                  />
                </div>
                <p>
                  {selectedPool?.mintB.symbol
                    ? selectedPool?.mintB.symbol
                    : selectedPool?.mintB.address.slice(0, 4)}
                </p>
                <div className="w-[1px] h-7 bg-white bg-opacity-40"></div>
                {/* Right divider */}
                <Button
                  size={"sm"}
                  className={"bg-white bg-opacity-10 h-7"}
                  onClick={() => {
                    handleMaximizeAmount(selectedPool?.mintB.address);
                  }}
                >
                  Max
                </Button>
              </div>
              <div className={"flex flex-col items-end"}>
                <input
                  className="bg-[#071233] text-white text-right py-1 outline-0 border-0 px-0"
                  autoFocus={false}
                  value={amount.amountB}
                  onChange={(e) => {
                    setAmount((prev) => ({
                      ...prev,
                      amountB: parseInt(e.target.value),
                    }));
                    updateInputs(parseInt(e.target.value), false);
                  }}
                />
                <div
                  className={
                    "flex flex-row mt-1 text-sky-700 font-semibold text-sm"
                  }
                >
                  <p>$</p>
                  <p>
                    {(
                      amount.amountB *
                      tokenPrices[selectedPool?.mintB.address ?? ""]
                    ).toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={"flex flex-col bg-[#071233] mt-4 p-3 gap-1 rounded-xl"}
          >
            <div className="flex flex-row justify-between text-white">
              <div className="flex flex-row gap-1">
                <p>
                  {selectedPool?.mintA.symbol
                    ? selectedPool?.mintA.symbol
                    : selectedPool?.mintA.address.slice(0, 4)}
                </p>
                <div
                  className={
                    "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                  }
                >
                  <img
                    alt={"icon"}
                    className={"w-4 h-4 rounded-full"}
                    src={selectedPool?.mintA.logoURI}
                  />
                </div>
              </div>
              <p>{formatedNumber(amount.amountA)}</p>
            </div>
            <div className="flex flex-row justify-between text-white">
              <div className="flex flex-row gap-1">
                <p>
                  {selectedPool?.mintB.symbol
                    ? selectedPool?.mintB.symbol
                    : selectedPool?.mintB.address.slice(0, 4)}
                </p>
                <div
                  className={
                    "bg-[#abc4ff] h-5 w-5 flex flex-row justify-center items-center rounded-full"
                  }
                >
                  <img
                    alt={"icon"}
                    className={"w-4 h-4 rounded-full"}
                    src={selectedPool?.mintB.logoURI}
                  />
                </div>
              </div>
              <p>{formatedNumber(amount.amountB)}</p>
            </div>
            <div className="flex flex-row justify-between text-sky-500 font-semibold mt-1">
              <p>Total Deposit</p>
              <div className="flex flex-row gap-1">
                <p>$</p>
                <p>
                  {(
                    amount.amountA *
                      tokenPrices[selectedPool?.mintA.address ?? ""] +
                    amount.amountB *
                      tokenPrices[selectedPool?.mintB.address ?? ""]
                  ).toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={handleAddLiquidity} size="lg">
          Add liquidity
        </Button>
        <Button className={"bg-transparent"}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddLiquidityModal;
