"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import formatedNumber from "@/lib/numbers";
import { useNFTGallerySendModal } from "@/lib/stores/dashboard";
import formatedString, { removeMiddleString } from "@/lib/string";
import { X } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import { Input } from "../ui/input";
import { useState } from "react";

type Props = {};

const NFTGallerySendModal = (props: Props) => {
  const { isOpen, onClose } = useNFTGallerySendModal();
  const isEXTRASMALL = useMediaQuery("(max-width: 370px)");
  const [form, setForm] = useState({
    address: "",
    amount: 0,
  });

  const data_modal = {
    title: "Send",
    subtitle: "Ustur CSS Tier 1 (CSSLU1)",
    balance: 14941,
    nft_image: "/assets/images/nft.png",
    collection: "Star Atlas",
    description:
      "A Property title for a tier I residential land plot on the surface area of the Ustur Central Space Station. This title was issued under the Council of peace authority during the SAGE Start Sequence Phase II - 2022. Disclaimer: Images are Sogmian District for example only. Final art will vary based on final faction and district selection.",
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110] rounded-2xl p-4 sm:p-5"
        style={{
          boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
          borderColor: "rgba(171,196,255,0.5",
        }}
      >
        <div className="flex justify-between flex-col gap-3">
          <div
            className="flex justify-between items-center py-2 px-4 rounded-full"
            style={{
              boxShadow: "0 0 5px rgba(217, 248, 255, 0.25)",
            }}
          >
            <h6 className="text-sm md:text-lg text-[#d9f8ff]">
              {data_modal.title}
            </h6>

            <h6 className="text-sm md:text-lg text-[#d9f8ff]">
              {data_modal.subtitle}
            </h6>

            <Button
              size="icon"
              className="hover:bg-[#d9f8ff20] transition-all h-6 w-6"
              onClick={onClose}
            >
              <X className="w-4 h-4 aspect-square object-contain" />
            </Button>
          </div>
          <div className="flex items-center w-full justify-center">
            <Image
              src={data_modal.nft_image}
              alt={`${data_modal.subtitle}_${data_modal.collection}_image`}
              width={isEXTRASMALL ? 220 : 320}
              height={isEXTRASMALL ? 220 : 320}
              className="w-1/3 aspect-square object-contain"
            />
          </div>
        </div>

        <div
          className="flex flex-col gap-4 bg-[#0D111B] p-4 rounded-2xl"
          style={{
            boxShadow: "0px 0px 5px 0px rgba(217, 248, 255, 0.50)",
          }}
        >
          <h6 className="text-sm md:text-lg text-[#757788]">
            Fill Address and Amount for Transfer
          </h6>
          <div className="flex items-center gap-4 justify-between">
            <label className="text-sm text-[#7c7c8d] w-max">Address</label>
            <Input
              value={form.address}
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, address: value });
              }}
              type="text"
              className="bg-transparent outline-none text-[#d9f8ff] w-full rounded-xl max-w-xs"
            />
          </div>
          <div className="flex flex-col gap-4 items-end">
            <div className="flex items-center gap-4 justify-between w-full">
              <label className="text-sm text-[#7c7c8d] w-max">Amount</label>
              <Input
                value={form.amount}
                onChange={(e) => {
                  const value = +e.target.value;
                  setForm({ ...form, amount: value });
                }}
                type="number"
                className="bg-transparent outline-none text-[#d9f8ff] w-full rounded-xl max-w-xs"
              />
            </div>
            <Button
              onClick={() => {}}
              className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full md:w-1/2 bg-transparent text-xs md:text-sm"
              style={{
                boxShadow: "0 0 4px #88d6ff",
              }}
            >
              Max
            </Button>
          </div>
        </div>
        <Button
          onClick={() => {}}
          className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-xs md:text-sm"
          style={{
            boxShadow: "0 0 4px #88d6ff",
          }}
        >
          Send
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NFTGallerySendModal;
