import {
  useSelectAmmTokenModal,
  useTokenListSettingModal,
} from "@/lib/stores/liquidity.store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CloseIcon from "@mui/icons-material/Close";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useCallback } from "react";
import TokenListSettingModal from "@/components/modals/token-list-setting-modal";

const AddAmmTokenModal = () => {
  const { isOpen, onClose } = useSelectAmmTokenModal();
  const { onTokenListSettingOpen } = useTokenListSettingModal();

  const handleCopyTokenAddress = useCallback((tokenAddress: string) => {
    navigator.clipboard.writeText(tokenAddress);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] w-[360px] md:max-w-lg z-[110] rounded-2xl p-0"
        style={{
          boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
          borderColor: "rgba(171,196,255,0.5",
        }}
      >
        <TokenListSettingModal />
        <div
          className={
            "flex flex-row text-white justify-between w-full px-3 pt-4"
          }
        >
          <p>Select a Token</p>
          <div onClick={onClose} className={"cursor-pointer"}>
            <CloseIcon />
          </div>
        </div>
        <div>
          <form action="/search" className="max-w-[480px] w-full px-4">
            <div className="relative flex flex-row">
              <input
                type="text"
                className="w-full h-10 shadow p-4 rounded-full text-white bg-[#19232d] text-xs"
                placeholder="Search name or mint address"
              />
            </div>
          </form>
        </div>
        <p className={"text-white text-xs px-4"}>Popular tokens</p>
        <div className={"flex flex-row justify-between text-sm px-4"}>
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div
                className={
                  "flex flex-row border border-[#757788] rounded-3xl px-2 py-1 text-white items-center gap-1"
                }
              >
                <img
                  className={"w-5 h-5 rounded-full"}
                  src={
                    "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                  }
                />
                <p>RAY</p>
              </div>
            ))}
        </div>
        <div className={"w-full h-[1px] bg-[#757788] "} />
        <div
          className={
            "flex flew-row items-center text-xs text-white w-full justify-between px-5"
          }
        >
          <p>Token</p>
          <p>Balance / Address</p>
        </div>
        <div
          className={"max-h-96 h-96 overflow-scroll overflow-x-hidden -mt-1"}
        >
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <div
                className={
                  "flex flex-row w-full text-amber-50 justify-between p-3"
                }
              >
                <div className={"flex flex-row items-center gap-2 ml-2"}>
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
                  <div className={"flex flex-col justify-start"}>
                    <p className={"text-base"}>RAY</p>
                    <p className={"text-xs"}>Raydium</p>
                  </div>
                </div>
                <div className={"flex flex-col justify-center items-end gap-1"}>
                  {/*<p>0.01</p>*/}
                  <div className={"flex flex-row gap-1 items-center"}>
                    <div
                      className={
                        "border border-amber-950 px-1.5 text-xs cursor-pointer"
                      }
                      onClick={() => handleCopyTokenAddress("Hi Mehran")}
                    >
                      <p>23dfs...fker32</p>
                    </div>
                    <IosShareIcon fontSize={"inherit"} />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className={"w-full h-[1px] bg-[#757788] "} />
        <div
          className={"flex flex-row justify-center text-sm text-white mb-3.5"}
        >
          <div onClick={onTokenListSettingOpen} className={"cursor-pointer"}>
            <p>View Token List</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAmmTokenModal;
