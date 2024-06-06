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
import { toast } from "@/components/ui/use-toast";
import formatedNumber from "@/lib/numbers";
import formatedString, { removeMiddleString } from "@/lib/string";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  isEXTRASMALL: boolean;
};

type DataProps = {
  market: string;
  market_icons: string[];
  platform: string;
  platform_icon: string;
  account: string;
  balance: number;
  value: number;
  id: string;
};

const Farm = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<DataProps[]>([]);

  useEffect(() => {
    gdata.length === 0 &&
      setTimeout(() => {
        setData([
          {
            market: "STAKE(STAKE4)",
            market_icons: [
              "/assets/images/raydiumraycoin-1@2x.png",
              "/assets/images/raydiumraycoin-1@2x.png",
            ],
            platform: "Serum",
            platform_icon: "/assets/images/raydiumraycoin-1@2x.png",
            account: "0xcDbb88F82b687FC2246ae5A731Cbba198E050a58",
            balance: 0.52,
            value: 0,
            id: "12345678",
          },
        ]);
      }, 5000);
  }, [gdata.length]);

  const data = {
    title: "Open Token Accounts",
    table: {
      header: ["Asset", "Account", "Type", "Balance", "Value", "Action"],
    },
  };

  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-5 lg:px-10 py-5"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <div className="text-lg md:text-2xl truncate flex items-center gap-5 text-[#D9F8FF]">
        <div className="flex justify-between w-full flex-col sm:flex-row gap-4">
          <div className="flex flex-col justify-start gap-3">
            <h3 className="w-max">{data.title}</h3>
            <div className="flex flex-row items-center justify-between w-full gap-4 md:gap-10 text-[#D9F8FF]">
              <span className="text-xs sm:text-sm w-max truncate">
                {Math.floor(Math.random() * (50 - 2 + 1) + 2)} open order
                account found
              </span>{" "}
              <span className="text-xl w-max truncate">
                $
                {formatedNumber(
                  Math.floor(Math.random() * (2 - 1 + 1) + 2),
                  2,
                  isEXTRASMALL
                )}
              </span>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap mt-1">
            <Button
              size="sm"
              className="text-xs shadow-[0px_0px_5px_#d9f8ff] border rounded-3xl"
            >
              Close Selected Accounts
            </Button>
            <Button
              size="sm"
              className="text-xs shadow-[0px_0px_5px_#d9f8ff] border rounded-3xl"
            >
              Close All Accounts
            </Button>
          </div>
        </div>
      </div>
      {/*  */}

      <div className="flex justify-between gap-6 relative flex-col md:flex-row">
        <Table className="w-4/5 sm:w-full flex-1">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {data.table.header.map((header, index) => (
                <TableHead
                  key={`${formatedString(header.toLocaleLowerCase())}_${index}`}
                  className="text-sm md:text-md truncate max-w-[110px] text-[#D9F8FF]"
                  align="left"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {gdata.length <= 0 ? (
              <>
                <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                  {data.table.header.map((header, index) => (
                    <TableCell
                      className="font-medium text-left text-[#7c7c8d] py-2"
                      key={`${header}_skeleton_${index}`}
                    >
                      <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                    </TableCell>
                  ))}
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
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-[#7c7c8d] pt-1">
                      <div className={"flex flex-row items-center gap-2"}>
                        {row.market}
                        <img
                          className={"w-6 h-6 rounded-full ml-6"}
                          src={
                            "https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png"
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-[#7c7c8d] pt-1">
                      <div className="flex items-center justify-between w-full underline text-[#D9F8FF]">
                        <div
                          className="flex gap-5 items-center justify-between w-full cursor-pointer truncate max-w-36 underline"
                          onClick={() => {
                            navigator.clipboard
                              .writeText(row.account)
                              .then((r) => {});
                            toast({
                              title: "Added to clipboard",
                            });
                          }}
                        >
                          {removeMiddleString(row.account)}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-white pt-1">
                      <p className={"text-xs text-[#7C7C8D]"}>
                        Assoc. Token Acc
                      </p>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 pt-1">
                      $ {formatedNumber(row.balance, 2, isEXTRASMALL)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 pt-1">
                      $ {formatedNumber(row.value, 2, isEXTRASMALL)}
                    </TableCell>

                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 pt-1">
                      <Button
                        onClick={() => {}}
                        className="shadow-[0px_0px_5px_#d9f8ff] border rounded-3xl h-6"
                      >
                        Close Account
                      </Button>
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

export default Farm;
