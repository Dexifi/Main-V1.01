import {
  useAddAmmLiquidityModal,
  usePoolSearchModal,
} from "@/lib/stores/liquidity.store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CloseIcon from "@mui/icons-material/Close";
import { Bug } from "lucide-react";
import { Button } from "@/components/ui/button";

const PoolSearchModal = () => {
  const { isOpen, onClose } = usePoolSearchModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] w-[360px] z-[110] rounded-2xl p-4 sm:p-5"
        style={{
          boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
          borderColor: "rgba(171,196,255,0.5",
        }}
      >
        <div
          className={
            "flex flex-row text-white w-full justify-between items-center"
          }
        >
          <p>Pool Search</p>
          <div onClick={onClose} className={"cursor-pointer"}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </div>
        </div>
        <div className={"text-white rounded-sm bg-[#19232d] p-4 text-xs pt-2"}>
          <p>AMM ID, OpenBook or Serum market ID</p>
          <input
            type={"text"}
            className={"bg-[#19232d] h-6 mt-2 p-1 w-full rounded-sm"}
          />
        </div>
        <Button>Search</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PoolSearchModal;
