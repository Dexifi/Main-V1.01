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
import Image from "next/image";
import { useEffect, useState } from "react";

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
          <h3>{data.title}</h3>
          <span className={data.color}>*</span>
        </div>
        <span>${formatedNumber(NFTValue)}</span>
      </div>
      {/*  */}

      <div className="flex justify-between gap-6 relative flex-col md:flex-row">
        <Table className="w-4/5 sm:w-full flex-1">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="min-w-64" />
              {data.table.header.map((header, index) => (
                <TableHead
                  key={`${formatedString(header.toLocaleLowerCase())}_${index}`}
                  className="text-sm md:text-md truncate max-w-[110px]"
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
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-[#7c7c8d]">
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
                      <Button onClick={() => {}}>Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NFT;
