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
import formatedNumber from "@/lib/numbers";
import formatedString from "@/lib/string";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useStaking from "@/hooks/useStaking";
import { connection } from "@/lib/get-connections";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  isEXTRASMALL: boolean;
};

type DataProps = {
  name: string;
  icon: string;
  amount: number;
  value: number;
  apy: number;
  pending_revard: number;
  pending_revardD: number;
};

const Staking = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<DataProps[]>([]);
  const { publicKey } = useWallet();
  const { push } = useRouter();
  const { userDeposit, totalDeposit } = useStaking(connection, publicKey);
  useEffect(() => {
    gdata.length === 0 &&
      setTimeout(() => {
        setData([
          {
            name: "Atlas",
            icon: "/assets/images/raydiumraycoin-1@2x.png",
            amount: 100,
            value: 20000,
            apy: 14.45,
            pending_revard: 22.4666,
            pending_revardD: 0.5456,
          },
          {
            name: "Atlas",
            icon: "/assets/images/raydiumraycoin-1@2x.png",
            amount: 100,
            value: 20000,
            apy: 14.45,
            pending_revard: 22.4666,
            pending_revardD: 0.5456,
          },
        ]);
      }, 5000);
  }, [gdata.length]);

  const data = {
    title: "Staking",
    color: "text-[#00b127]",
    table: {
      header: [
        "Token",
        "Amount",
        "Value",
        "APY",
        "Pending Reward",
        "Pending Reward $",
      ],
    },
  };
  if (!totalDeposit) return <></>;
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
        <span>${formatedNumber(totalDeposit)}</span>
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
              <TableHead />
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

                  <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                    <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                {userDeposit.map((row, index) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d]"
                    key={`${formatedString(
                      row.token!.name.toLocaleLowerCase()
                    )}_${index}`}
                  >
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase flex justify-between gap-x-5 items-center">
                      {row.token?.name}
                      {!isEXTRASMALL ? (
                        <Image
                          src={row.token?.logoURI ?? ""}
                          alt={`${row.token?.name}_logo-icon`}
                          width={24}
                          height={24}
                        />
                      ) : null}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {formatedNumber(row.stakeAmount, 2, isEXTRASMALL)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      $
                      {formatedNumber(
                        row.stakeAmount * row.lpPrice,
                        2,
                        isEXTRASMALL
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {formatedNumber(row.apy, 2, isEXTRASMALL)}%
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {row.lpToken}{" "}
                      {formatedNumber(
                        row.pendingReward * row.lpPrice,
                        isEXTRASMALL ? 2 : 6
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 uppercase">
                      ${formatedNumber(row.pendingReward, isEXTRASMALL ? 2 : 4)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 uppercase">
                      <Link href={"/stake"} prefetch>
                        <Button
                          size="sm"
                          className="hover:bg-[#7c7c8d80] max-h-8 text-[14px] rounded-full"
                          style={{ boxShadow: "0 0 4px 1px #d9f8ff" }}
                        >
                          Claim Pending
                        </Button>
                      </Link>
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

export default Staking;
