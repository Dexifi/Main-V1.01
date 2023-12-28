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
  type: string;
  market: string;
  market_icons: string[];
  state: "Long" | "Short";
  shoulder: number;
  size: number;
  size_currency: "SOL";
  size_dollars: number;
  entry: number;
  index: number;
  p_and_l: number;
  p_and_l_procent: number;
  p_and_l_state: "positive" | "negative";
  liq_price: number;
};

const Trading = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<DataProps[]>([]);
  const { publicKey } = useWallet();
  const [lendValue, setLendValue] = useState(12500);

  useEffect(() => {
    gdata.length === 0 &&
      setTimeout(() => {
        setData([
          {
            type: "Position",
            market: "SOL-PERP",
            market_icons: [
              "/assets/images/raydiumraycoin-1@2x.png",
              "/assets/images/raydiumraycoin-1@2x.png",
            ],
            state: "Long",
            shoulder: 2.2,
            size: 0.9,
            size_currency: "SOL",
            size_dollars: 20.45,
            entry: 22.653,
            index: 22.753,
            p_and_l: 0.08,
            p_and_l_procent: 0.01,
            p_and_l_state: "positive",
            liq_price: 10.81,
          },
        ]);
      }, 5000);
  }, [gdata.length]);

  const data = {
    title: "Trading",
    color: "text-[#C95901]",
    table: {
      header: ["Type", "Market", "Size", "Entry / Index"],
      name: "Drift",
      icon: "/assets/images/raydiumraycoin-1@2x.png",
      balance: 111.24,
      currency: "USDC",
    },
  };

  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-5 lg:px-10 py-5 gap-5 flex flex-col"
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

      <div className="flex justify-between gap-6 relative flex-col md:flex-row bg-[#30425630] p-5 rounded-2xl">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-5 border-b border-solid border-muted h-12">
            {data.table.name}

            {!isEXTRASMALL ? (
              <Image
                src={data.table.icon}
                alt={`${data.table.name}_logo-icon`}
                className="w-6 aspect-square object-contain"
                width={24}
                height={24}
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex text-sm w-max text-left truncate">
              Balance:
            </div>
            <div className="flex text-sm w-max text-left truncate">
              ${formatedNumber(data.table.balance, 2, isEXTRASMALL)}{" "}
              {data.table.currency}
            </div>
          </div>
        </div>
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
                      row.market.toLocaleLowerCase()
                    )}_${index}`}
                  >
                    <TableCell
                      className="font-medium text-left text-[#7c7c8d] py-3 align-top"
                      width={180}
                    >
                      {row.type}
                    </TableCell>
                    <TableCell
                      className="font-medium text-left text-sm md:text-md truncate align-top"
                      align="left"
                      width={220}
                    >
                      <div className="flex justify-between w-full">
                        <div className="flex flex-col gap-3">
                          <h6 className="font-medium text-left text-[#7c7c8d] uppercase">
                            {row.market}
                          </h6>
                          {!isEXTRASMALL ? (
                            <div className="flex justify-between items-center">
                              {row.market_icons.map((icon, id) => (
                                <Image
                                  src={icon}
                                  alt={`${icon}_logo-icon`}
                                  className="aspect-square object-contain w-9"
                                  width={36}
                                  height={36}
                                  key={id}
                                />
                              ))}
                            </div>
                          ) : null}
                        </div>
                        <div className="flex flex-col rounded-md overflow-hidden">
                          <div
                            className={`bg-[#141414] p-2 ${
                              row.state.toLocaleLowerCase() === "long"
                                ? "text-[#00b127]"
                                : "text-[#F2893B]"
                            }  truncate text-sm`}
                          >
                            {row.state}
                          </div>
                          <div
                            className={`bg-[#141414] p-2 text-[#0066FF] truncate text-sm`}
                          >
                            X{row.shoulder}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] align-top"
                      align="left"
                    >
                      <div className="flex flex-col gap-3 justify-between w-full">
                        <h6>
                          ${formatedNumber(row.size, 2)} {row.size_currency}
                        </h6>
                        <h6>
                          ${formatedNumber(row.size_dollars, 2, isEXTRASMALL)}
                        </h6>
                      </div>
                    </TableCell>
                    <TableCell
                      className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] align-top"
                      align="left"
                    >
                      <div className="flex flex-col gap-3 justify-between w-full">
                        <h6>${formatedNumber(row.entry, 2, isEXTRASMALL)}</h6>
                        <h6>${formatedNumber(row.index, 2, isEXTRASMALL)}</h6>
                      </div>
                    </TableCell>
                    <TableCell
                      className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d] align-top"
                      align="left"
                    >
                      <div className="flex flex-col gap-3 justify-between w-full">
                        <h6>
                          P&L:
                          <span
                            className={`text-sm ml-3 bg-[#141414] p-2 rounded-sm ${
                              row.state.toLocaleLowerCase() === "long"
                                ? "text-[#00b127]"
                                : "text-[#F2893B]"
                            } `}
                          >
                            ${formatedNumber(row.p_and_l, 2)} (
                            {row.p_and_l_state === "negative" ? "-" : "+"}
                            {row.p_and_l_procent})
                          </span>
                        </h6>
                        <h6>
                          Liq Price:
                          <span className="text-sm ml-3">
                            %{formatedNumber(row.liq_price, 2)}
                          </span>
                        </h6>
                      </div>
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

export default Trading;
