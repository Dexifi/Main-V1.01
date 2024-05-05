import { useCreatePoolModal } from "@/lib/stores/liquidity.store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@/components/ui/button";
const CreatePoolModal = () => {
  const { isOpen, onClose } = useCreatePoolModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110] rounded-2xl p-4 sm:p-5"
        style={{ boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)" }}
      >
        <div className={"text-white"}>
          <ArrowBackIosIcon sx={{ fontSize: 24 }} />
        </div>
        <div className={"text-white p-4 mt-4"}>
          <div className={"flex flex-row items-center gap-2"}>
            <div
              className={
                "rounded-full bg-[#19232d] w-6 h-6 flex flex-row justify-center items-center"
              }
            >
              <p className={"font-bold"}>1</p>
            </div>
            <p>Import OpenBook Market ID</p>
          </div>
          <div className={"w-0.5 h-4 bg-[#757788] ml-2.5 my-2"} />
          <div className={"flex flex-row items-center gap-2"}>
            <div
              className={
                "rounded-full bg-[#19232d] w-6 h-6 flex flex-row justify-center items-center"
              }
            >
              <p className={"font-bold"}>2</p>
            </div>
            <p>Price & Initial Liquidity</p>
          </div>
          <div className={"w-0.5 h-4 bg-[#757788] ml-2.5 my-2"} />
          <div className={"flex flex-row items-center gap-2"}>
            <div
              className={
                "rounded-full bg-[#19232d] w-6 h-6 flex flex-row justify-center items-center"
              }
            >
              <p className={"font-bold"}>3</p>
            </div>
            <p>Pool Created</p>
          </div>
        </div>
        <div className={"text-sm text-white text-center px-8 mt-8"}>
          <p>
            This tool is for advaned users. Before attempting to create a new
            liquidity pool, we suggest going through this detailed guide
          </p>
        </div>
        <div className={"bg-[#19232d] rounded-3xl p-4 text-white text-sm mt-4"}>
          <p>OpenBook Market ID:</p>
          <input className={"bg-[#19232d] w-full mt-3 h-7"} />
        </div>
        <Button className={"mt-4"}>Confirm</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePoolModal;
