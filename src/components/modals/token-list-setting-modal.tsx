import {
  useSelectAmmTokenModal,
  useTokenListSettingModal,
} from "@/lib/stores/liquidity.store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Switch } from "@mui/material";
import { useRouter } from "next/navigation";
const TokenListSettingModal = () => {
  const { isOpen, onClose } = useTokenListSettingModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] w-[360px] md:max-w-lg z-[110] rounded-2xl p-4 min-h-[700px]"
        style={{
          boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
          borderColor: "rgba(171,196,255,0.5",
        }}
      >
        <div className={"flex-1"}>
          <div className={"flex flex-row text-white justify-between"}>
            <div onClick={onClose} className={"cursor-pointer"}>
              <ArrowBackIosIcon sx={{ fontSize: 18 }} />
            </div>
            <p className={"font-semibold"}>Token List Setting</p>
            <div />
          </div>
          <div
            className={
              "flex flex-row text-white mt-14 text-sm justify-between px-3"
            }
          >
            <div>
              <p>Solana Token List</p>
              <p>32493 tokens</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div
            className={
              "flex flex-row text-white text-sm justify-between mt-6 px-3"
            }
          >
            <div>
              <p>User Added Token List</p>
              <p>2 tokens</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div
            className={
              "flex flex-row text-white text-sm justify-between mt-6 px-3"
            }
          >
            <div>
              <p>Raydium Token List</p>
              <p>245 tokens</p>
            </div>
            <Switch />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenListSettingModal;
