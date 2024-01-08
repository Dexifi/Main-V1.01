import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  data: any;
};

const MyPositions = ({ data }: Props) => {
  const [rangeF, setRangeF] = useState("all");
  const [gdata, setData] = useState<any[]>([]);
  const d_data = {
    title: "List of All of My Positions",
    range_filter: ["All", "Out of Range", "In Range"],
    netvalue: 10000,
    positions: 2,

    headers: [
      "Pool",
      "Protocol",
      "Protocol TVL",
      "Pool Liquidity",
      "Volume",
      "Fee",
      "APR",
    ],
  };

  useEffect(() => {
    gdata.length <= 0 &&
      setTimeout(() => {
        setData([
          {
            address: "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q",
            symbol: "SOL-USDC",
            pool_logos: [
              "/assets/images/raydiumraycoin-1@2x.png",
              "/assets/images/raydiumraycoin-1@2x.png",
            ],
            protocol: "Raydium",
            protocol_sub: "AMM",
            protocol_tvl: 47650000,
            protocol_tvl_icon: "/assets/images/raydiumraycoin-1@2x.png",
            pool_liq: 12650000,
            volume: 2650000,
            fee: 0.5,
            apr: 65.64,
            value: 100000.66,
            lp_tokens: 15354.65,
            your_share: 0.01,
            price: 22.55,
            range_status: "In Range",
            pending: 1000.68,
            lev: 18.18,
            range: {
              min: 18.263,
              max: 23.658,
              currency: {
                first: "USDC",
                second: "SOL",
              },
            },
          },
        ]);
      }, 5000);
  }, [gdata]);

  return (
    <div className="w-full flex flex-wrap justify-between gap-5 my-5 flex-col md:flex-row">
      <div
        className="order-10 md:-order-10 flex flex-col justify-start items-start gap-y-5 flex-1 bg-[#0d111b] rounded-3xl px-5 lg:px-10 py-5 max-w-full"
        style={{ boxShadow: "0 0 4px #88d6ff" }}
      >
        <div className="flex flex-col w-full py-4 gap-4">
          <div className="flex justify-start items-center w-full">
            <h6 className="text-lg md:text-2xl text-[#d9f8ff]">
              {d_data.title}
            </h6>
          </div>
          <div className="flex justify-between items-start xl:items-center gap-4 w-full flex-col lg:flex-row">
            <div className="flex flex-col max-w-md w-full gap-2 text-[#d9f8ff]">
              <span className="text-lg">
                Net Value: ${formatedNumber(d_data.netvalue, 2, false)}
              </span>
              <span className="text-sm">
                Positions: {formatedNumber(d_data.positions, 0, false)}
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-2 sm:gap-4 justify-start xl:justify-end">
              <div className="flex justify-start lg:justify-end w-full items-center gap-2 sm:gap-4 flex-wrap">
                <div className="flex justify-between items-center gap-1 bg-[#D9F8FF10] rounded-full">
                  {d_data.range_filter.map((item, index) => (
                    <Button
                      key={`${item}-${index}--protocol-filter`}
                      className={`flex items-center gap-3 sm:gap-4 z-50 bg-transparent rounded-full text-xs sm:text-sm`}
                      style={{
                        boxShadow:
                          formatedString(item).toLocaleLowerCase() === rangeF
                            ? "0 0 4px #88d6ff"
                            : "none",
                      }}
                      onClick={() => {
                        const value = formatedString(item).toLocaleLowerCase();

                        if (value !== rangeF) {
                          setRangeF(value);
                        }
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table className="w-full flex-1 mt-2 overflow-scroll">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {d_data.headers.map((header, index) => (
                <>
                  <TableHead
                    key={`${formatedString(
                      header.toLocaleLowerCase()
                    )}_${index}`}
                    className="text-sm md:text-md truncate max-w-[110px] pl-0"
                    align="left"
                  >
                    {header}
                  </TableHead>
                </>
              ))}
            </TableRow>
          </TableHeader>
          {gdata.length > 0 ? (
            <TableBody>
              {gdata.slice(0, 60).map((row: any, index) => (
                <TableRow
                  className="hover:bg-transparent border-[#7c7c8d]"
                  key={`${formatedString(
                    row.address.toLocaleLowerCase()
                  )}_${index}`}
                >
                  <TableCell className="font-medium text-left py-2 pl-0 min-w-48">
                    <div className="flex flex-col items-start min-h-12">
                      <span className="text-sm text-[#d9f8ff]">
                        {row.symbol}
                      </span>
                      <div className="flex items-center mt-2 w-max gap-4">
                        {row.pool_logos.map((icon: any, id: number) => (
                          <Image
                            src={icon}
                            alt={`${row.symbol}_logo-icon`}
                            className="aspect-square object-contain w-6 h-6"
                            width={24}
                            height={24}
                            key={id}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-start min-h-12 mt-2">
                      <div
                        className={`flex items-center gap-4 text-sm ${
                          formatedString(
                            row.range_status
                          ).toLocaleLowerCase() === "in_range"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {formatedString(
                          row.range_status
                        ).toLocaleLowerCase() === "in_range" ? (
                          <CheckCircle className="w-4 h-4 aspect-square object-contain" />
                        ) : (
                          <XCircle className="w-4 h-4 aspect-square object-contain" />
                        )}
                        <span>{row.range_status}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                    <div className="flex flex-col items-start min-h-12">
                      <span className="text-sm">{row.protocol}</span>
                      <span className="text-sm">{row.protocol_sub}</span>
                    </div>

                    <div className="flex flex-col items-start min-h-12 mt-2">
                      Value: ${formatedNumber(row.value, 2, true)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-72">
                    <div className="flex flex-col items-start min-h-12">
                      <span className="text-sm">
                        ${formatedNumber(row.protocol_tvl, 2, true)}
                      </span>
                      <span className="text-sm">
                        Token Price Index: $
                        {formatedNumber(row.price, 2, false)}
                      </span>
                    </div>
                    <div className="flex flex-col items-start min-h-12 mt-2">
                      APR: {formatedNumber(row.apr, 2, false)}%
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-72">
                    <div className="flex flex-col items-start min-h-12">
                      <span className="text-sm">
                        ${formatedNumber(row.pool_liq, 2, true)}
                      </span>
                    </div>

                    <div className="flex flex-col items-start min-h-12 mt-2">
                      <div className="flex items-center gap-1">
                        <span>Range:</span>
                        <span>{formatedNumber(row.range.min, 2, false)}</span>
                        <span>-</span>
                        <span>{formatedNumber(row.range.min, 2, false)}</span>
                        <div className="flex items-center gap-1">
                          <span>{row.range.currency.first}</span>
                          <span>per</span>
                          <span>{row.range.currency.second}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                    <div className="flex flex-col items-start min-h-12">
                      <span className="text-sm">
                        ${formatedNumber(row.volume, 2, true)}
                      </span>
                    </div>
                    <div className="flex flex-col items-start min-h-12 mt-2">
                      Pending Yiel: ${formatedNumber(row.pending, 2, true)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                    <div className="flex flex-col items-start min-h-12">
                      <span className="text-sm">
                        ${formatedNumber(row.fee, 2, false)}
                      </span>
                    </div>
                    <div className="flex flex-col items-start min-h-12 mt-2">
                      Lev: x{formatedNumber(row.lev, 2, false)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                    <div className="flex flex-col items-start min-h-12">
                      <Button
                        size="sm"
                        className="max-w-[150px] text-xs rounded-full"
                        style={{
                          boxShadow: "0 0 4px #88d6ff",
                        }}
                      >
                        Create Position
                      </Button>
                    </div>
                    <div className="flex flex-col items-start min-h-12">
                      <Button
                        size="sm"
                        className="max-w-[150px] text-xs rounded-full"
                        style={{
                          boxShadow: "0 0 4px #88d6ff",
                        }}
                      >
                        Manage
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableRow className="hover:bg-transparent border-[#7c7c8d]">
              {d_data.headers.map((header, index) => (
                <TableCell
                  className="font-medium text-left text-[#7c7c8d] py-2 pl-0"
                  key={`${header}_skeleton_${index}`}
                >
                  <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                </TableCell>
              ))}
            </TableRow>
          )}
        </Table>
      </div>
    </div>
  );
};

export default MyPositions;
