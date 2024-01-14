"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import formatedNumber from "@/lib/numbers";
import { useNFTGalleryBurnModal } from "@/lib/stores/dashboard";
import formatedString, { removeMiddleString } from "@/lib/string";
import { X } from "lucide-react";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import { Checkbox } from "../ui/checkbox";

type Props = {};

const NFTGalleryBurnModal = (props: Props) => {
  const { isOpen, onClose } = useNFTGalleryBurnModal();
  const isEXTRASMALL = useMediaQuery("(max-width: 370px)");

  const data_modal = {
    title: "Burn",
    subtitle: "Ustur CSS Tier 1 (CSSLU1)",
    balance: 14941,
    body: [
      {
        title: "Token",
        text: "Ustur CSS Tier 1 (CSSLU1)",
      },
      {
        title: "Rebate",
        value: 0.00203945,
        currency: "SOL",
        f_currency: "+",
      },
      {
        title: "Network Fee",
        value: 0.000005,
        currency: "SOL",
      },
    ],
    name: "Ustur CSS Tier 1 (CSSLU1)",
    nft_image: "/assets/images/nft.png",
    collection: "Star Atlas",
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-[#0d111b] max-w-xs md:max-w-lg z-[110] rounded-2xl p-4 sm:p-5"
        style={{ boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)" }}
      >
        <div className="flex justify-between flex-col gap-3">
          <div
            className="flex justify-between items-center py-2 px-4 rounded-full"
            style={{
              boxShadow: "0 0 5px rgba(217, 248, 255, 0.25)",
            }}
          >
            <h6 className="text-sm md:text-lg text-red-500">
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
              alt={`${data_modal.name}_${data_modal.collection}_image`}
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
            This action will permanently destroy and remove these tokens from
            your wallet.
          </h6>
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
                    className={`font-medium text-left text-[#7c7c8d] p-0 pb-1 text-xs  sm:text-sm font-['Helvetica']`}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell className="font-medium text-left text-[#7c7c8d] p-0 pb-1 text-xs sm:text-sm font-['Helvetica']">
                    <div
                      className={`flex items-center ${
                        row.f_currency
                          ? row.f_currency === "+"
                            ? "text-green-500"
                            : "text-red-500"
                          : "text-[#7c7c8d] "
                      }`}
                    >
                      {row.f_currency && (
                        <span className="mr-1">{row.f_currency}</span>
                      )}
                      {row.value && (
                        <span>
                          {typeof row.value === "number"
                            ? `${formatedNumber(row.value, 6, false)}`
                            : "0"}
                        </span>
                      )}
                      {row.currency && (
                        <span className="ml-1">{row.currency}</span>
                      )}
                      {row.text && <span>{row.text}</span>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center gap-4 bg-[#ff000025] text-[#7C7C8D] py-4 px-6 rounded-xl">
            <Checkbox
              id="terms"
              className="border-red-100 data-[state=checked]:bg-red-500"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I understand this cannot be undone
            </label>
          </div>
        </div>

        <Button
          onClick={() => {}}
          className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-xs md:text-sm"
          style={{
            boxShadow: "0 0 4px #88d6ff",
          }}
        >
          Burn
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NFTGalleryBurnModal;
