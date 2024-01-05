import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSettingsModal } from "@/lib/stores/settings.store";
import { X } from "lucide-react";
import { useState } from "react";
import formatedString from "@/lib/string";
import formatedNumber from "@/lib/numbers";
import { Input } from "@/components/ui/input";

type Props = {};

const SettingsModal = (props: Props) => {
  const { isOpen, onClose } = useSettingsModal();
  const [explorer, setExplorer] = useState("solscan");
  const [slippage, setSlippage] = useState(0.1);
  const [tiriton, setTiriton] = useState({
    type: "Connected",
    custom: "https://",
  });

  const settings_modal = {
    title: "Explorer Set",
    title_actions: ["Solscan", "SolanaFM", "Explorer"],
    subtitle: "Slippage",
    subtitle_actions: [0.1, 0.5, 1],
    rpc_title: "RPC Tiriton",
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent
        className="bg-[#0d111b] max-w-sm z-[110]"
        style={{ boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)" }}
      >
        <div className="flex justify-between flex-col gap-3">
          <div className="flex justify-between items-center">
            <h6 className="text-lg text-[#d9f8ff]">{settings_modal.title}</h6>
            <Button
              size="icon"
              className="rounded-full hover:bg-[#d9f8ff20] transition-all"
              onClick={onClose}
            >
              <X className="w-6 h-6 aspect-square object-contain" />
            </Button>
          </div>
          <div className="flex justify-between items-center">
            {settings_modal.title_actions.map((action, index) => (
              <Button
                className={`rounded-full hover:bg-[#d9f8ff20] transition-colors text-[#d9f8ff] ${
                  formatedString(action.toLocaleLowerCase()) === explorer
                    ? "bg-[#25313f] border border-solid border-[#d9f8ff]"
                    : "bg-[#0d111b]"
                }`}
                key={`${formatedString(action.toLocaleLowerCase())}_${index}`}
                onClick={() =>
                  setExplorer(formatedString(action.toLocaleLowerCase()))
                }
              >
                {action}
              </Button>
            ))}
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#727382] rounded-full" />
        {/*  */}
        <div className="flex justify-between flex-col gap-3">
          <div className="flex justify-between items-center">
            <h6 className="text-lg text-[#d9f8ff]">
              {settings_modal.subtitle}
            </h6>
          </div>
          <div className="flex justify-between items-center">
            {settings_modal.subtitle_actions.map((action, index) => (
              <Button
                className={`rounded-full hover:bg-[#d9f8ff20] transition-colors text-[#d9f8ff] ${
                  +formatedNumber(action, 1) === slippage
                    ? "bg-[#25313f] border border-solid border-[#d9f8ff]"
                    : "bg-[#0d111b]"
                }`}
                key={`${formatedNumber(action)}_${index}`}
                onClick={() => setSlippage(+formatedNumber(action, 1))}
              >
                {formatedNumber(action, 1)}%
              </Button>
            ))}
          </div>
          <div className="flex justify-start items-center gap-3">
            <h6 className="text-lg text-[#d9f8ff]">Custom:</h6>
            <div className="flex items-center gap-2">
              <Input
                className="bg-transparent rounded-full max-w-32 text-white"
                value={slippage}
                onChange={(e) => {}}
              />
              <h6 className="text-lg text-[#d9f8ff]">%</h6>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#727382] rounded-full" />
        {/*  */}
        <div className="flex justify-between flex-col gap-3">
          <div className="flex justify-between items-center">
            <h6 className="text-lg text-[#d9f8ff]">
              {settings_modal.rpc_title}{" "}
              <span
                className={`${
                  tiriton.type.toLocaleLowerCase() === "connected"
                    ? "text-[#88e8ad]"
                    : "text-red-600"
                } font-medium`}
              >
                {tiriton.type}
              </span>
            </h6>
          </div>

          <div className="flex justify-start gap-3 flex-col">
            <h6 className="text-lg text-[#d9f8ff]">Custom:</h6>
            <div className="flex items-center gap-2">
              <Input
                className="bg-transparent rounded-full flex-1 text-white h-10"
                value={tiriton.custom}
                placeholder="https://"
                onChange={(e) =>
                  setTiriton({ ...tiriton, custom: e.target.value })
                }
              />
              <Button>Switch</Button>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingsModal;
