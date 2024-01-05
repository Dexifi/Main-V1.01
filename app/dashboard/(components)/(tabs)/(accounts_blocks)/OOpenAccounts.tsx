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
            market: "SOL/USDC",
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
    title: "Open Order Accounts",
    table: {
      header: ["Asset", "Platform", "Account", "Balance", "Value", "Action"],
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
            <div className="flex justify-between w-full gap-4 md:gap-10">
              <span className="text-xs sm:text-sm w-max text-[#7c7c8d] truncate">
                {Math.floor(Math.random() * (50 - 2 + 1) + 2)} open order
                account found
              </span>{" "}
              <span className="text-xs sm:text-sm w-max text-[#7c7c8d] truncate">
                $
                {formatedNumber(
                  Math.floor(Math.random() * (2 - 1 + 1) + 2),
                  2,
                  isEXTRASMALL
                )}
              </span>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button size="sm" className="text-xs">
              Close Selected Accounts
            </Button>
            <Button size="sm" className="text-xs">
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
                  className="text-sm md:text-md truncate max-w-[110px]"
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
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-[#7c7c8d]">
                      <div className="flex gap-5 items-center justify-between w-full max-w-36">
                        {row.market}
                        {!isEXTRASMALL ? (
                          <div className="max-w-9 hidden md:flex justify-between items-center">
                            {row.market_icons.map((icon, id) => (
                              <Image
                                key={`${icon}_logo-icon_${id}`}
                                src={icon}
                                alt={`${icon}_logo-icon_${id}`}
                                width={24}
                                height={24}
                              />
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-[#7c7c8d]">
                      <div className="flex gap-5 items-center justify-between w-full">
                        {row.platform}
                        {!isEXTRASMALL ? (
                          <Image
                            src={row.platform_icon}
                            alt={`${row.platform}_logo-icon`}
                            className="hidden md:flex"
                            width={24}
                            height={24}
                          />
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-white">
                      <div
                        className="flex gap-5 items-center justify-between w-full cursor-pointer truncate max-w-36"
                        onClick={() => {
                          navigator.clipboard.writeText(row.account);
                          toast({
                            title: "Added to clipboard",
                          });
                        }}
                      >
                        {removeMiddleString(row.account)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      ${formatedNumber(row.balance, 2, isEXTRASMALL)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      ${formatedNumber(row.value, 2, isEXTRASMALL)}
                    </TableCell>

                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      <Button onClick={() => {}} className="rounded-full">
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
