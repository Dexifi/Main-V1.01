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
  apr: string;
  apr_icons: string[];
  tvl: number;
  protocol: string;
  protocol_icon: string;
  index_tp: number;
  value: "Normal";
  range: {
    min: number;
    max: number;
    currency: string;
    per: string;
  };
  pending: number;
  deposit_ratio: number;
  type: number;
  status: "In Range";
  pool: {
    currency: string;
    value: number;
  }[];
  leverage: number;
};

const Liquidity = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<DataProps[]>([]);
  const { publicKey } = useWallet();
  const [LiquidityValue, setLiquidityValue] = useState(12500);

  useEffect(() => {
    gdata.length === 0 &&
      setTimeout(() => {
        setData([
          {
            apr: "SOL-USDC",
            apr_icons: [
              "/assets/images/raydiumraycoin-1@2x.png",
              "/assets/images/raydiumraycoin-1@2x.png",
            ],
            tvl: 12000000,
            protocol: "Raydium",
            protocol_icon: "/assets/images/raydiumraycoin-1@2x.png",
            index_tp: 22.654,
            value: "Normal",
            range: {
              min: 18.9231,
              max: 23.6432,
              currency: "USDC",
              per: "SOL",
            },
            pending: 6.15,
            deposit_ratio: 4812.99,
            type: 222.21,
            status: "In Range",
            pool: [
              {
                currency: "SOL",
                value: 45.56,
              },
              {
                currency: "USDC",
                value: 54.44,
              },
            ],
            leverage: 18.18,
          },
        ]);
      }, 5000);
  }, [gdata.length]);

  const data = {
    title: "Liquidity",
    color: "text-[#efd301]",
    table: {
      header: [
        "APR",
        "Protocol",
        "Value",
        "Pending",
        "Deposit Ratio",
        "Type",
        "Pool",
        "Leverage",
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
        <span>${formatedNumber(LiquidityValue)}</span>
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
                      row.apr.toLocaleLowerCase()
                    )}_${index}`}
                  >
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-[#7c7c8d]">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-5 items-center justify-between w-full max-w-36">
                          {row.apr}
                          {!isEXTRASMALL ? (
                            <div className="max-w-9 flex justify-between items-center">
                              {row.apr_icons.map((icon, id) => (
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
                        <div className="flex gap-5 items-center justify-between w-full text-xs">
                          TVL: ${formatedNumber(row.tvl, 0, true)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-sm md:text-md truncate uppercase text-[#7c7c8d] align-top">
                      <div className="flex flex-col gap-3">
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
                        <div className="flex gap-5 items-center justify-between w-full text-xs">
                          Index TP: ${formatedNumber(row.index_tp, 3)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 align-top">
                      <div className="flex flex-col gap-3">
                        <div>{row.value}</div>
                        <div className="flex max-w-36 text-xs">
                          Range: {formatedNumber(row.range.min, 2, true)}-
                          {formatedNumber(row.range.max, 2, true)}{" "}
                          {row.range.currency} per {row.range.per}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 align-top">
                      {formatedNumber(row.pending)}%
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 align-top">
                      ${formatedNumber(row.deposit_ratio, 2, isEXTRASMALL)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 align-top">
                      <div className="flex flex-col gap-3">
                        <div>${formatedNumber(row.type, 2, isEXTRASMALL)}</div>
                        <div className={`flex max-w-36 text-xs`}>
                          Status:{" "}
                          <span
                            className={
                              formatedString(row.status).toLocaleLowerCase() ===
                              "in_range"
                                ? "text-green-500"
                                : "text-muted"
                            }
                          >
                            {row.status}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 align-top">
                      <div className="flex flex-col gap-3">
                        {row.pool.map((pool_item, index) => (
                          <div
                            className="flex items-center"
                            key={`${pool_item.currency}_${index}`}
                          >
                            {pool_item.currency}{" "}
                            {formatedNumber(pool_item.value, 2, isEXTRASMALL)}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2 align-top">
                      x{formatedNumber(row.leverage, 2, isEXTRASMALL)}
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

export default Liquidity;
