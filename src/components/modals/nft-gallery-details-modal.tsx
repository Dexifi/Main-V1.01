"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import formatedNumber from "@/lib/numbers";
import formatedString, { removeMiddleString } from "@/lib/string";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  useNFTGalleryBurnModal,
  useNFTGalleryModal,
  useNFTGallerySendModal,
} from "@/lib/stores/dashboard";
import { useMediaQuery } from "usehooks-ts";

type Props = {};

const NFTGalleryDetailsModal = (props: Props) => {
  const { isOpen, onClose } = useNFTGalleryModal();
  const isEXTRASMALL = useMediaQuery("(max-width: 370px)");

  const { onNFTGalleryBurnOpen } = useNFTGalleryBurnModal();
  const { onNFTGallerySendOpen } = useNFTGallerySendModal();

  const data_modal = {
    title: "Ustur CSS Tier 1 (CSSLU1)",
    balance: 14941,
    body: [
      {
        title: "Balance",
        value: 1,
      },
      {
        title: "Symbol",
        text: "CSSLU1",
      },
      {
        title: "Image",
        text: "View Original",
      },
      {
        title: "Current Supply",
        value: 123,
      },
      {
        title: "Collection",
        text: "Star Atlas",
      },
      {
        title: "Mint",
        text: removeMiddleString("0xcdbb88f82b687fc2246ae5a731cbba198e050a58"),
      },
      {
        title: "Freeze Authority",
        text: removeMiddleString("0xcdbb88f82b687fc2246ae5a731cbba198e050a58"),
      },
      {
        title: "Status",
        text: "Primary-MarketMutable",
      },
      {
        title: "Royalty",
        value: 123,
        currency: "%",
      },
    ],
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
              alt={`${data_modal.title}_${data_modal.collection}_image`}
              width={isEXTRASMALL ? 220 : 320}
              height={isEXTRASMALL ? 220 : 320}
              className="w-1/3 aspect-square object-contain"
            />
          </div>
        </div>
        <Table className="w-full flex-1">
          <TableBody>
            {data_modal.body.map((row: any, index: number) => (
              <TableRow
                className="hover:bg-transparent border-none"
                key={`${formatedString(
                  row.title.toLocaleLowerCase()
                )}_${index}`}
              >
                <TableCell
                  className={`font-medium text-left text-[#7c7c8d] text-xs  p-0 pb-1 sm:text-sm font-['Helvetica']`}
                >
                  {row.title}
                </TableCell>
                <TableCell className="font-medium text-left text-[#7c7c8d] p-0 pb-1 text-xs sm:text-sm font-['Helvetica']">
                  {row.value && (
                    <span>
                      {typeof row.value === "number"
                        ? `${formatedNumber(row.value, 0, false)}`
                        : "0"}
                    </span>
                  )}
                  {row.currency && <span className="ml-1">{row.currency}</span>}
                  {row.text && <span>{row.text}</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-col gap-2">
          <div className="flex text-xs sm:text-sm font-semibold text-[#7C7C8D] font-['DM Sans']">
            Description
          </div>
          <div className="flex text-xs sm:text-sm font-semibold text-[#7C7C8D] font-['DM Sans']">
            {data_modal.description}
          </div>
        </div>

        <div className="flex gap-4 flex-wrap md:flex-nowrap w-full">
          <Button
            onClick={() => {
              onNFTGallerySendOpen();
              onClose();
            }}
            className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-xs md:text-sm"
            style={{
              boxShadow: "0 0 4px #88d6ff",
            }}
          >
            Send
          </Button>
          <Button
            onClick={() => {
              onNFTGalleryBurnOpen();
              onClose();
            }}
            className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-xs md:text-sm"
            style={{
              boxShadow: "0 0 4px #88d6ff",
            }}
          >
            Burn
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NFTGalleryDetailsModal;
