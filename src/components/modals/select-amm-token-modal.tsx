import {
  usePoolSearchModal,
  useSelectAmmTokenModal,
} from "@/lib/stores/liquidity.store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
const AddAmmTokenModal = () => {
  const { isOpen, onClose } = useSelectAmmTokenModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] w-[360px] md:max-w-lg z-[110] rounded-2xl p-4 sm:p-5"
        style={{ boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)" }}
      >
        <div className={"flex flex-row text-white justify-between w-full"}>
          <p>Select a Token</p>
          <CloseIcon />
        </div>
        <div>
          <form action="/search" className="max-w-[480px] w-full">
            <div className="relative flex flex-row">
              <input
                type="text"
                className="w-full h-10 shadow p-4 rounded-full text-white bg-[#19232d] text-xs"
                placeholder="Search name or mint address"
              />
            </div>
          </form>
        </div>
        <p className={"text-white text-xs"}>Popular tokens</p>
        <div className={"flex flex-row justify-between text-sm"}>
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
            "flex flew-row items-center text-xs text-white w-full justify-between"
          }
        >
          <p>Token</p>
          <p>Balance / Address</p>
        </div>
        <div className={"max-h-96 bg-blue-800"}>
          <p>fdssssssssssssssssssssss</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAmmTokenModal;
