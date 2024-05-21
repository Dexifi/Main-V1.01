import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import formatedNumber from "@/lib/numbers";
import formatedString, { removeMiddleString } from "@/lib/string";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckIcon, ChevronFirst, X } from "lucide-react";
import Image from "next/image";
import * as Checkbox from "@radix-ui/react-checkbox";

type Props = {
  isEXTRASMALL: boolean;
};

type DataProps = {
  id: string;
  name: string;
  mint: string;
  collection: string;
  balance: number;
  nft_supply: number;
  value: number;
  price: number;
};

const NFT = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<DataProps[]>([]);
  const { publicKey } = useWallet();
  const [NFTValue, setNFTValue] = useState(12500);
  const { toast } = useToast();

  const [detailModal, setDetailModal] = useState(false);

  const [burnModal, setBurnModal] = useState(false);

  const [sendModal, setSendModal] = useState(false);

  useEffect(() => {
    gdata.length === 0 &&
      setTimeout(() => {
        setData([
          {
            id: "123456789",
            name: "Ustur CSS Tier 1 (CSSLU1)",
            mint: "0xcDbb88F82b687FC2246ae5A731Cbba198E050a58",
            collection: "Star Atlas",
            balance: 1,
            nft_supply: 136,
            value: 4812.99,
            price: 4812.99,
          },
        ]);
      }, 5000);
  }, [gdata.length]);

  const data = {
    title: "NFT",
    color: "text-[#7000FF]",
    table: {
      header: ["Mint", "Collection", "Balance", "NFT Supply", "Value", "Price"],
    },
  };

  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-5 lg:px-10 py-5"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <div className="text-lg md:text-2xl truncate flex items-center gap-5 text-[#D9F8FF]">
        <div className="flex">
          <h3 className={"mr-2"}>{data.title}</h3>
          <span className={data.color}>*</span>
        </div>
        <span>${formatedNumber(NFTValue)}</span>
      </div>
      {/*  */}

      <div className="flex justify-between gap-6 relative flex-col md:flex-row">
        <Table className="w-4/5 sm:w-full flex-1 text-base">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="min-w-64" />
              {data.table.header.map((header, index) => (
                <TableHead
                  key={`${formatedString(header.toLocaleLowerCase())}_${index}`}
                  className="text-sm md:text-md truncate max-w-[110px] text-[#D9F8FF]"
                  align="left"
                >
                  {header}
                </TableHead>
              ))}
              <TableHead className="min-w-36" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {gdata.length <= 0 ? (
              <>
                <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                  <TableCell>
                    <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                  </TableCell>
                  {data.table.header.map((header, index) => (
                    <TableCell
                      className="font-medium text-left text-[#7c7c8d] py-2"
                      key={`${header}_skeleton_${index}`}
                    >
                      <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                {gdata.map((row, index) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d]"
                    key={`${formatedString(
                      row.id.toLocaleLowerCase()
                    )}_${index}`}
                  >
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-[#7c7c8d] pl-0">
                      {row.name}
                    </TableCell>
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-white">
                      <div
                        className="flex gap-5 items-center justify-between w-full cursor-pointer truncate max-w-36"
                        onClick={() => {
                          navigator.clipboard.writeText(row.mint);
                          toast({
                            title: "Added to clipboard",
                          });
                        }}
                      >
                        {removeMiddleString(row.mint)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {row.collection}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {formatedNumber(row.balance, 0, true)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {formatedNumber(row.nft_supply, 0, true)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      ${formatedNumber(row.value, 2, isEXTRASMALL)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      ${formatedNumber(row.price, 2, isEXTRASMALL)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      <Button
                        size="sm"
                        className="hover:bg-[#7c7c8d80] max-h-6 text-[14px] rounded-full w-full"
                        onClick={() => setDetailModal(true)}
                        style={{ boxShadow: "0 0 4px 1px #d9f8ff" }}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <AlertDialog
        open={detailModal}
        onOpenChange={() => setDetailModal(!detailModal)}
      >
        <AlertDialogContent
          className="border-none bg-[#0d111b] rounded-3xl md:px-8"
          onPointerDown={(event) => setDetailModal(false)}
          style={{
            boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
            borderRadius: 24,
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className="flex justify-between items-center gap-5 p-5 text-[#d9f8ff] bg-[#0d111b55] px-5 rounded-full h-12"
              style={{
                boxShadow: "0 0 5px #d9f8ff",
              }}
            >
              <p className="text-sm">Ustur CSS Tier 1 (CSSLU1)</p>

              <Button
                size="icon"
                className={"bg-[#0d111b55] rounded-[50%]"}
                onClick={() => setDetailModal(false)}
              >
                <X className="w-6 h-6 aspect-square object-contain" />
              </Button>
            </AlertDialogTitle>
            <div className={"flex-row justify-self-center mx-auto"}>
              <Image
                alt="NFT Image"
                className="w-[340px] h-[190px] relative my-12"
                src="https://fakeimg.pl/340x340"
                width={340}
                height={340}
              />
            </div>
          </AlertDialogHeader>

          <div className="flex flex-row w-full">
            <div className={"w-full"}>
              {manageNftItem.map((item, index) => (
                <p className="text-sm text-sky-100" key={index}>
                  {item}
                </p>
              ))}
            </div>
            <div className={"flex flex-col items-end w-full"}>
              <p className="text-sm text-gray-500">1</p>
              <p className="text-sm text-gray-500">CSSLU1</p>
              <p className="text-sm text-gray-500">View Original</p>
              <p className="text-sm text-gray-500">167</p>
              <p className="text-sm text-gray-500">Star Atlas</p>
              <p className="text-sm text-sky-100">BVJE...VQ1V</p>
              <p className="text-sm text-sky-100">BVJE...VQ1V</p>
              <p className="text-sm text-gray-500">Primary-MarketMutable</p>
              <p className="text-sm text-gray-500">0%</p>
            </div>
          </div>
          <div className={"mt-2"}>
            <p className={"text-gray-500 text-sm"}>Description</p>
            <p className={"text-gray-500 text-sm"}>
              Property title for a tier I residential land plot on the surface
              area of the Ustur Central Space Station. This title was issued
              under the Council of peace authority during the SAGE Start
              Sequence Phase II - 2022. Disclaimer: Images are Sogmian District
              for example only. Final art will vary based on final faction and
              district selection.
            </p>
          </div>
          <div className={"flex flex-row gap-x-4 mt-4 "}>
            <Button
              className={
                "text-[#d9f8ff] bg-[#0d111b55] px-5 rounded-full w-full"
              }
              style={{ boxShadow: "0 0 5px #d9f8ff" }}
              onClick={() => {
                setSendModal(true);
                setDetailModal(false);
              }}
            >
              Send
            </Button>
            <Button
              className={
                "text-[#d9f8ff] bg-[#0d111b55] px-5 rounded-full w-full"
              }
              style={{ boxShadow: "0 0 5px #d9f8ff" }}
              onClick={() => {
                setBurnModal(true);
                setDetailModal(false);
              }}
            >
              Burn
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/*  =================================== Burn Modal ================================== */}

      <AlertDialog
        open={burnModal}
        onOpenChange={() => setBurnModal(!burnModal)}
      >
        <AlertDialogContent
          className="border-none bg-[#0d111b] rounded-3xl h-max md:px-8"
          onPointerDown={(event) => setBurnModal(false)}
          style={{
            boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
            borderRadius: 24,
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className="flex justify-between items-center gap-5 p-5 text-[#d9f8ff] bg-[#0d111b55] rounded-full h-12"
              style={{
                boxShadow: "0 0 5px #d9f8ff",
              }}
            >
              <p className="text-sm text-red-700">Burn</p>
              <p className="text-sm">Ustur CSS Tier 1 (CSSLU1)</p>
              <Button
                size="icon"
                className={"bg-[#0d111b55] rounded-[50%]"}
                onClick={() => setBurnModal(false)}
              >
                <X className="w-6 h-6 aspect-square object-contain" />
              </Button>
            </AlertDialogTitle>
            <div className={"flex-row justify-self-center mx-auto"}>
              <Image
                alt="NFT Image"
                className="w-[300px] h-[190px] relative my-12"
                src="https://fakeimg.pl/340x340"
                width={340}
                height={340}
              />
            </div>
          </AlertDialogHeader>
          <div
            className="text-gray-500 bg-[#0d111b55] rounded-[25px] p-4"
            style={{
              boxShadow: "0 0 5px #d9f8ff",
            }}
          >
            <p className={"text-sm font-semibold"}>
              This action will permanently destroy and remove these tokens from
              your wallet.
            </p>
            <div className={"flex flex-row mt-4 font-medium"}>
              <div
                className={"flex flex-row w-full justify-between font-semibold"}
              >
                <p className={"text-gray-500 text-sm"}>Token</p>
                <p className={"text-gray-500 text-sm"}>
                  Ustur CSS Tier 1 (CSSLU1)
                </p>
              </div>
            </div>
            <div
              className={
                "flex flex-row w-full justify-between mt-1 font-semibold"
              }
            >
              <p className={"text-gray-500 text-sm"}>Rebate</p>
              <div className={"flex flex-row gap-1"}>
                <p className={"text-green-300 text-sm "}>+0.0020392</p>
                <p className={"text-green-300 text-sm"}>SOL</p>
              </div>
            </div>
            <div
              className={
                "flex flex-row w-full justify-between mt-1 font-semibold"
              }
            >
              <p className={"text-gray-500 text-sm"}>Network Fee</p>
              <div className={"flex flex-row gap-1"}>
                <p className={"text-gray-500 text-sm"}>0.000005</p>
                <p className={"text-gray-500 text-sm"}>SOL</p>
              </div>
            </div>
            <div
              className={
                "bg-red-700 bg-opacity-25 mt-4 rounded-lg shadow relative"
              }
            >
              <form>
                <div className="flex items-center p-3">
                  <Checkbox.Root
                    className=" hover:bg-red-600 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-red-600 "
                    id="c1"
                  >
                    <Checkbox.Indicator className="text-sm">
                      <CheckIcon style={{ color: "white" }} size={18} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label className="text-sm ml-3 font-medium" htmlFor="c1">
                    I understand this cannot be undone
                  </label>
                </div>
              </form>
            </div>
          </div>
          <Button
            className={
              "text-[#d9f8ff] bg-[#0d111b55] px-5 rounded-full w-full mt-2"
            }
            style={{ boxShadow: "0 0 5px #d9f8ff" }}
          >
            Send
          </Button>
        </AlertDialogContent>
      </AlertDialog>

      {/*  ========================================= Send nft modal ============================================= */}
      <AlertDialog
        open={sendModal}
        onOpenChange={() => setSendModal(!sendModal)}
      >
        <AlertDialogContent
          className="border-none bg-[#0d111b] rounded-3xl h-max md:px-8"
          onPointerDown={(event) => setSendModal(false)}
          style={{
            boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
            borderRadius: 24,
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className="flex justify-between items-center gap-5 p-5 text-[#d9f8ff] bg-[#0d111b55] rounded-full h-12"
              style={{
                boxShadow: "0 0 5px #d9f8ff",
              }}
            >
              <p className="text-sm text-white">Send</p>
              <p className="text-sm">Ustur CSS Tier 1 (CSSLU1)</p>
              <Button
                size="icon"
                className={"bg-[#0d111b55] rounded-[50%]"}
                onClick={() => setSendModal(false)}
              >
                <X className="w-6 h-6 aspect-square object-contain" />
              </Button>
            </AlertDialogTitle>
            <div className={"flex-row justify-self-center mx-auto"}>
              <Image
                alt="NFT Image"
                className="w-[300px] h-[190px] relative my-12"
                src="https://fakeimg.pl/340x340"
                width={340}
                height={340}
              />
            </div>
          </AlertDialogHeader>
          <div
            className="text-gray-500 bg-[#0d111b55] rounded-[25px] p-4"
            style={{
              boxShadow: "0 0 5px #d9f8ff",
            }}
          >
            <p className={"text-sm font-medium"}>
              Fill Address and Amount for Transfer
            </p>

            <div
              className={
                "flex flex-row items-center w-full justify-between gap-5 mt-3"
              }
            >
              <label
                className="text-gray-500 text-sm font-medium"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full bg-[#0d111b55] text-[#d9f8ff] rounded-3xl px-3 py-2 mt-1 border border-sky-100 border-opacity-50 "
                placeholder="Enter Address"
              />
            </div>
            <div
              className={
                "flex flex-row w-full justify-between items-center mt-2"
              }
            >
              <label
                className="text-gray-500 text-sm font-medium"
                htmlFor="address"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="w-2/5 bg-[#0d111b55] text-[#d9f8ff] rounded-3xl py-2 mt-1 border border-sky-100 border-opacity-50 text-center "
                placeholder="Amount"
              />
            </div>
            <div className={"flex flex-row w-full justify-end mt-3"}>
              <Button
                style={{ boxShadow: "0 0 5px #d9f8ff" }}
                className={
                  "bg-slate-800 rounded-3xl shadow px-6 h-8 text-white font-bold"
                }
              >
                Max
              </Button>
            </div>
          </div>
          <Button
            className={
              "text-[#d9f8ff] bg-[#0d111b55] px-5 rounded-full w-full mt-2"
            }
            style={{ boxShadow: "0 0 5px #d9f8ff" }}
          >
            Send
          </Button>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NFT;

const manageNftItem = [
  "Balance",
  "Symbol",
  "Image",
  "Current Supply",
  "Collection",
  "Mint",
  "Freeze Authority",
  "Status",
  "Royalty",
];
