import {
  useAddAmmLiquidityModal,
  useCreatePoolModal,
  usePoolSearchModal,
  useSelectAmmTokenModal,
} from "@/lib/stores/liquidity.store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useCallback, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import * as Checkbox from "@radix-ui/react-checkbox";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TokenListSettingModal from "@/components/modals/token-list-setting-modal";
import CreatePoolModal from "@/components/modals/create-pool-modal";

const AddAmmLiquidityModal = () => {
  const { isOpen, onClose } = useAddAmmLiquidityModal();
  const [loading, setLoading] = useState(false);
  const { onPoolSearchOpen } = usePoolSearchModal();
  const { onSelectAmmTokenOpen } = useSelectAmmTokenModal();
  const { onCreatePoolOpen } = useCreatePoolModal();
  const inputRefOne = useRef(null);
  const inputRefTwo = useRef(null);

  const [showMore, setShowMore] = useState(false);
  const handleChangeCrypto = useCallback(() => {}, []);

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

  const handleMaxAmount = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  }, []);
  const handleHalfAmount = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  }, []);

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
        <div
          className={
            "p-3 bg-[#19232d] rounded-3xl px-4 flex flex-col gap-2 mt-3"
          }
          onClick={() => handleFocusBox(inputRefOne)}
        >
          <div className={"flex flex-row text-white justify-end"}>
            <div
              className={"flex flex-row text-xs cursor-pointer"}
              onClick={() => console.log("click")}
            >
              <p>Balance:</p>
              {loading ? <p>-</p> : <p>0.943241321</p>}
            </div>
          </div>
          <div
            className={"text-white flex flex-row justify-between items-center"}
          >
            <div className={"flex flex-row gap-2 items-center"}>
              <div
                className={"flex flex-row gap-2 items-center cursor-pointer"}
                onClick={onSelectAmmTokenOpen}
              >
                <div>
                  <div
                    className={
                      "bg-white h-8 w-8 flex flex-row justify-center items-center rounded-full"
                    }
                  >
                    <img
                      className={"w-6 h-6 rounded-full"}
                      src={
                        "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                      }
                    />
                  </div>
                </div>
                <p className={"text-base"}>SOL</p>
                <ExpandMoreIcon />
              </div>
              <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
              <button
                className={
                  "bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6 text-xs"
                }
                onClick={(e) => handleMaxAmount(e)}
              >
                Max
              </button>
              <button
                className={
                  "bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6 text-xs"
                }
                onClick={(e) => handleHalfAmount(e)}
              >
                Half
              </button>
            </div>
            <input
              className={"bg-[#19232d] h-5 w-1/3 focus:outline-none"}
              type={"number"}
              id={"box-1"}
              ref={inputRefOne}
            />
          </div>
          <div className={"flex flex-row text-white justify-end text-xs"}>
            <p>$3.74</p>
          </div>
        </div>
        {/*  Between Boxes */}
        <div
          className={
            "flex flex-row text-white items-center justify-between px-6 text-sm"
          }
        >
          <div className={"flex flex-row gap-2 items-center"}>
            <AddIcon />
            {!loading && (
              <>
                <div className={"flex flex-row gap-1"}>
                  <p>1</p>
                  <p>USDC</p>
                </div>
                <p>≈</p>
                <div className={"flex flex-row gap-1"}>
                  <p>0.007402</p>
                  <p>SOL</p>
                </div>
                <div onClick={handleChangeCrypto} className={"cursor-pointer"}>
                  <SwapHorizIcon sx={{ fontSize: 16 }} />
                </div>
              </>
            )}
          </div>
          <div className={"flex flex-row gap-4 items-center "}>
            <div
              className={"bg-[#19232d] rounded-full p-1 cursor-pointer"}
              onClick={onPoolSearchOpen}
            >
              <SearchIcon />
            </div>
            <p>O</p>
          </div>
        </div>
        {/*  Second Box */}
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
              {loading ? <p>-</p> : <p>0.943241321</p>}
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
                    className={"w-6 h-6 rounded-full"}
                    src={
                      "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                    }
                  />
                </div>
              </div>
              <p className={"text-base"}>SOL</p>
              <ExpandMoreIcon />
              <div className="border-r border-[rgba(171,196,255,0.5)] self-stretch" />
              <button
                className={
                  "bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6 text-xs"
                }
                onClick={(e) => handleMaxAmount(e)}
              >
                Max
              </button>
              <button
                className={
                  "bg-[#0d111b] text-[#abc4ff] px-1.5 rounded-sm h-6 text-xs"
                }
                onClick={(e) => handleHalfAmount(e)}
              >
                Half
              </button>
            </div>
            <input
              ref={inputRefTwo}
              className={"bg-[#19232d] h-5 w-1/3 focus:outline-none"}
              type={"number"}
              id={"box-2"}
            />
          </div>
          <div className={"flex flex-row text-white justify-end text-xs"}>
            <p>$3.74</p>
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
            <p>SOL</p>
          </div>
          <div className={"flex flex-row w-full justify-between"}>
            <p>Max Amount</p>
            {loading ? (
              <p>-</p>
            ) : (
              <div className={"flex flex-row gap-1"}>
                <p>3.781081 </p>
                <p>USDC</p>
              </div>
            )}
          </div>
          <div className={"flex flex-row w-full justify-between"}>
            <div className={"flex flex-row gap-1"}>
              <p>Pool liquidity</p>
              <p>(SOL)</p>
            </div>
            {loading ? (
              <p>-</p>
            ) : (
              <div className={"flex flex-row gap-1"}>
                <p>32.781081 </p>
                <p>SOL</p>
              </div>
            )}
          </div>
          <div className={"flex flex-row w-full justify-between"}>
            <div className={"flex flex-row gap-1"}>
              <p>Pool liquidity</p>
              <p>(USDC)</p>
            </div>
            {loading ? (
              <p>-</p>
            ) : (
              <div className={"flex flex-row gap-1"}>
                <p>3.7231,81081 </p>
                <p>USDC</p>
              </div>
            )}
          </div>
          <div className={"flex flex-row w-full justify-between"}>
            <p>LP supply</p>
          </div>
          {showMore && (
            <>
              <div className={"flex flex-row"}>
                <p>Addresses</p>
              </div>
              <div className={"flex flex-row w-full justify-between"}>
                <p>Slippage Tolerance</p>
                <div
                  className={"flex flex-row bg-[#19232d] rounded-3xl px-0.5"}
                >
                  <input
                    className={"bg-[#19232d] w-6 mx-1 text-white px-1 text-xs"}
                    type={"number"}
                  />
                  <p className={"text-white text-xs mr-0.5"}>%</p>
                </div>
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
                className="flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-[#0d111b] "
                id="c1"
              >
                <Checkbox.Indicator className="text-sm">
                  <CheckIcon style={{ color: "white" }} size={18} />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <i>Confirm</i>
            </div>
            <div className={"flex flex-row gap-2 items-center"}>
              <Checkbox.Root
                className=" hover:bg-red-600 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-[#0d111b] "
                id="c1"
              >
                <Checkbox.Indicator className="text-sm">
                  <CheckIcon style={{ color: "white" }} size={18} />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <i>Do not warn again for this pool</i>
            </div>
          </div>
        </div>
        <Button>Enter an amount</Button>
        <p className={"text-white mt-8"}>Your liquidity</p>
        <div className={"text-white rounded-3xl bg-[#19232d] p-4 text-xs"}>
          <p>
            If you staked your LP tokens in a farm, unstake them to see them
            here
          </p>
        </div>
        <p className={"text-white mt-4"}>Create Pool</p>
        <div
          className={"rounded-3xl bg-[#19232d] p-4 flex flex-row text-white"}
        >
          <p className={"w-2/3 text-xs"}>
            Create a liquidity pool on Raydium that can be traded on the swap
            interface. Read the guide before attempting.
          </p>
          <div className={"w-1/3 flex flex-row justify-center items-center"}>
            <button
              className={"bg-[#0d111b] p-3 rounded-3xl"}
              onClick={onCreatePoolOpen}
            >
              <AddIcon sx={{ fontSize: 20, mr: 1 }} />
              Create Pool
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAmmLiquidityModal;
