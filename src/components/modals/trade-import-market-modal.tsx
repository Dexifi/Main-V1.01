"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useTradeModal } from "@/lib/stores/trade.store";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { memo, useCallback, useEffect, useState } from "react";
import {
  getMarket,
  getMarketBAF,
  getMarketDetails,
} from "@/applications/Trade";
import { Market } from "@mehranml/openbook";
import { connection } from "@/lib/get-connections";
import { OPENBOOK_PROGRAM_ID } from "@/applications/Trade/config";
import { PublicKey } from "@solana/web3.js";
import { findToken } from "@/lib/get-wallet";

const TradeImportMarketModal = memo(() => {
  const { isImportMarketOpen, onImportMarketClose } = useTradeModal();
  const [newMarket, setNewMarket] = useState<Market | null>(null);

  const [marketID, setMarketID] = useState<string>("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const swap_modal = {
    title: "Import markets List",
  };
  const handleLoad = useCallback(async () => {
    setLoading(true);
    if (!marketID) return;

    const m_id = new PublicKey(marketID);
    const market = await Market.load(connection, m_id, {}, OPENBOOK_PROGRAM_ID);
    const tokenA = await findToken(market.baseMintAddress.toBase58());
    const tokenB = await findToken(market.quoteMintAddress.toBase58());
    if (tokenA && tokenB) {
      setTokens([tokenA?.symbol || "", tokenB?.symbol || ""]);
    }
    setNewMarket(market);
    setLoading(false);
  }, [marketID]);

  const handleAdd = useCallback(async () => {
    setLoading(true);
    if (!marketID) return;
    await getMarket(marketID);
    await getMarketBAF(newMarket);
    await getMarketDetails(newMarket);
    // await getTokens(publicKey?.toBase58() || "");
    setLoading(false);
    onImportMarketClose();
  }, [marketID, newMarket, onImportMarketClose]);

  useEffect(() => {
    return () => {
      setTokens([]);
      setMarketID("");
      setLoading(false);
    };
  }, []);

  return (
    <Dialog open={isImportMarketOpen} onOpenChange={onImportMarketClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110]"
        style={{
          boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
          borderColor: "rgba(171,196,255,0.5",
        }}
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
            value={tokens[0]}
          />
          <Input
            placeholder="Base Label"
            className="bg-slate-900 outline-none text-[#d9f8ff]"
            disabled
            required
            value={tokens[1]}
          />
        </div>

        {tokens.length > 0 ? (
          <Button
            disabled={!marketID || loading}
            className="rounded-full hover:bg-[#d9f8ff20] transition-all"
            onClick={handleAdd}
          >
            Add Market
          </Button>
        ) : (
          <Button
            disabled={!marketID || loading}
            className="rounded-full hover:bg-[#d9f8ff20] transition-all"
            onClick={handleLoad}
          >
            Load Market
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
});
TradeImportMarketModal.displayName = "TradeImportMarketModal";
export default TradeImportMarketModal;
