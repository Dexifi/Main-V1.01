"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useTradeModal } from "@/lib/stores/trade.store";
import { X } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Input } from "../ui/input";
import { useCallback, useState } from "react";

type Props = {};
const TradeImportMarketModal = (props: Props) => {
  const isEXTRASMALL = useMediaQuery("(max-width: 720px)");
  const {
    isImportMarketOpen,
    onImportMarketClose,
    marketID: mi,
    setMarketID: setMI,
  } = useTradeModal();
  const [marketID, setMarketID] = useState<string>("");

  const swap_modal = {
    title: "Import markets List",
  };
  const handleAdd = useCallback(() => {
    if (!marketID) return;
    setMI(marketID);
    onImportMarketClose();
  }, [marketID, onImportMarketClose, setMI]);

  return (
    <Dialog open={isImportMarketOpen} onOpenChange={onImportMarketClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110]"
        style={{ boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)" }}
      >
        <div className="flex justify-between flex-col gap-3">
          <div className="flex justify-between items-center">
            <h6 className="text-lg text-[#d9f8ff]">{swap_modal.title}</h6>
            <Button
              size="icon"
              className="rounded-full hover:bg-[#d9f8ff20] transition-all"
              onClick={onImportMarketClose}
            >
              <X className="w-6 h-6 aspect-square object-contain" />
            </Button>
          </div>
        </div>

        <Input
          value={marketID}
          onChange={(e) => {
            setMarketID(e.target.value);
          }}
          placeholder="Market ID"
          className="bg-slate-900 outline-none text-[#d9f8ff]"
        />

        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <Input
            placeholder="Quote Label"
            className="bg-slate-900 outline-none text-[#d9f8ff]"
            disabled
            readOnly
          />
          <Input
            placeholder="Base Label"
            className="bg-slate-900 outline-none text-[#d9f8ff]"
            disabled
            required
          />
        </div>

        <Button
          disabled={!marketID}
          className="rounded-full hover:bg-[#d9f8ff20] transition-all"
          onClick={handleAdd}
        >
          Add Market
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TradeImportMarketModal;
