import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatedNumber from "@/lib/numbers";
import formatedString from "@/lib/string";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useState } from "react";
import useFarm from "@/hooks/useFarm";
import { connection } from "@/lib/get-connections";
import { useDashboard } from "@/applications/Dashboard/store";

type Props = {
  isEXTRASMALL: boolean;
};

const data = {
  title: "Farm",
  color: "text-[#ba0000]",
  table: {
    header: [
      "Pool",
      "Protocol",
      "LP",
      "Value",
      "APR",
      "Reward",
      "Pending Reward",
      "Pending Reward $",
    ],
  },
};

const Farm = ({ isEXTRASMALL }: Props) => {
  const {
    farms,
    netWorth: { totalFarm },
  } = useDashboard();

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
        <span>${formatedNumber(totalFarm)}</span>
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
            {farms.length <= 0 ? (
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
                {farms?.map((row, index) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d]"
                    key={`${formatedString(
                      row.poolName.toLocaleLowerCase()
                    )}_${index}`}
                  >
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-[#7c7c8d]">
                      <div className="flex gap-5 items-center justify-between w-full max-w-36">
                        {row.poolName}
                        {!isEXTRASMALL ? (
                          <div className="max-w-9 flex justify-between items-center">
                            {row.poolIcon.map((icon, id) => (
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
                        {row.protocol}
                        {!isEXTRASMALL ? (
                          <Image
                            src={row.protocolIcon}
                            alt={`${row.protocol}_logo-icon`}
                            width={24}
                            height={24}
                          />
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {formatedNumber(row.lpAmount, 4, isEXTRASMALL)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      ${formatedNumber(row.value)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {formatedNumber(row.apr, 2, isEXTRASMALL)}%
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {row.rewards.map((reward, id) => (
                        <div
                          key={id}
                          className="flex gap-5 items-center justify-between w-full"
                        >
                          {reward.currency}
                          {!isEXTRASMALL ? (
                            <Image
                              src={reward.icon}
                              alt={`${reward.currency}_logo-icon`}
                              width={24}
                              height={24}
                            />
                          ) : null}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {formatedNumber(row.rewardAmount, 6, isEXTRASMALL)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      ${formatedNumber(row.pendingReward, 2, isEXTRASMALL)}
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
