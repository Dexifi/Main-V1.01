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

type Props = {
  isEXTRASMALL: boolean;
};

type DataProps = {
  token: string;
  icon: string;
  protocol: string;
  protocol_icon: string;
  pool: string;
  pool_tvl: number;
  supplied_apr: number;
  borrowed_apr: number;
  ratio: number;
};

const Lending = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<DataProps[]>([]);
  const { publicKey } = useWallet();
  const [lendValue, setLendValue] = useState(12500);

  useEffect(() => {
    gdata.length === 0 &&
      setTimeout(() => {
        setData([
          {
            token: "SOL",
            icon: "/assets/images/raydiumraycoin-1@2x.png",
            protocol: "Solend",
            protocol_icon: "/assets/images/raydiumraycoin-1@2x.png",
            pool: "Turbo SOL",
            pool_tvl: 17000000,
            supplied_apr: 283.22,
            borrowed_apr: 0,
            ratio: 60.01,
          },
        ]);
      }, 5000);
  }, [gdata.length]);

  const data = {
    title: "Lending",
    color: "text-[#00ffec]",
    table: {
      header: [
        "Token",
        "Protocol",
        "Pool",
        "Pool TVL",
        "Supplied(APR)",
        "Borrowed(APR)",
        "Ratio",
      ],
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
        <span>${formatedNumber(lendValue)}</span>
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
                      row.token.toLocaleLowerCase()
                    )}_${index}`}
                  >
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase">
                      <div className="flex gap-5 items-center justify-between w-full">
                        {row.token}
                        {!isEXTRASMALL ? (
                          <Image
                            src={row.icon}
                            alt={`${row.token}_logo-icon`}
                            width={24}
                            height={24}
                          />
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase">
                      <div className="flex gap-5 items-center justify-between w-full">
                        {row.protocol}
                        {!isEXTRASMALL ? (
                          <Image
                            src={row.protocol_icon}
                            alt={`${row.protocol}_logo-icon`}
                            width={24}
                            height={24}
                          />
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {row.pool}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      ${formatedNumber(row.pool_tvl, 2, true)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {formatedNumber(row.supplied_apr)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {formatedNumber(row.borrowed_apr)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {formatedNumber(row.ratio)}%
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

export default Lending;
