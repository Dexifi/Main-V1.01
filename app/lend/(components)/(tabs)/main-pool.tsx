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
import {
  useBorrowModal,
  useRepayModal,
  useSupplyModal,
  useWithdrawModal,
} from "@/lib/stores/lend.store";
import formatedString from "@/lib/string";
import Image from "next/image";
import { useEffect, useState } from "react";

type DataItemProps = {
  balance: number;
  collection: string;
  id: string;
  mint: string;
  name: string;
  nft_supply: number;
  price: number;
  value: number;
  stats?: any;
  config?: any;
  supply: number;
  borrow: number;
  borrowValue: number;
  supplyAPR: number;
  borrowAPR: number;
};

type Props = {
  markets: DataItemProps[];
  headers: string[];
  isEXTRASMALL: boolean;
  setSelectedLend: any;
  user: any;
};

const MainPool = ({
  markets,
  headers,
  isEXTRASMALL,
  user,
  setSelectedLend,
}: Props) => {
  const [data, setData] = useState<DataItemProps[]>([]);
  const [deposits, setDeposits] = useState<any>([]);
  const [borrows, setBorrows] = useState<any>([]);

  const { onSupplyOpen } = useSupplyModal();
  const { onWithdrawOpen } = useWithdrawModal();
  const { onBorrowOpen } = useBorrowModal();
  const { onRepayOpen } = useRepayModal();

  const d_data = {
    colbs: {
      colors: ["bg-[#1ED6FF]", "bg-[#4658FA]", "bg-[#FBE947]", "bg-[#B2FA46]"],
      assets: {
        supplied_headers: ["Assets", "Supplied"],
        borrowed_headers: ["Assets", "Borrowed"],
      },
      body: [
        {
          title: "Net value",
          value: user?.obligationStats?.userTotalDeposit,
          color: "text-[#d9f8ff]",
        },
        {
          title: "Supply balance",
          value: user?.obligationStats?.userTotalDeposit,
          color: "text-[#1ED6FF]",
        },
        {
          title: "Borrow balance",
          value: user?.obligationStats?.userTotalBorrow,
          color: "text-[#4658FA]",
        },
        {
          title: "Borrow limit",
          value: user?.obligationStats?.borrowLimit,
          color: "text-[#FBE947]",
        },
        {
          title: "Liquidation threshold",
          value: user?.obligationStats?.liquidationThreshold,
          color: "text-[#B2FA46]",
        },
        {
          title: "Weight Borrow",
          value: user?.obligationStats?.userTotalDeposit,
          color: "text-[#d9f8ff]",
        },
      ],
    },
  };

  useEffect(() => {
    if (markets.length > 0) {
      data.length === 0
        ? setData(markets)
        : setTimeout(() => {
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
                supply: 0,
                borrow: 0,
                borrowValue: 0,
                supplyAPR: 0,
                borrowAPR: 0,
              },
            ]);
          }, 5000);
    }
  }, [data]);

  useEffect(() => {
    if (!!user) {
      user?.deposits?.length === 0
        ? setTimeout(() => {
            setDeposits([
              {
                id: "123456789",
                symbol: "SOL",
                logo: "/assets/icons/solana-1@2x.png",
                percent: 0.3,
                supply: 153657,
                value: 3641.23,
              },
            ]);
          }, 5000)
        : setDeposits(user.deposits);
    }
  }, [deposits]);

  useEffect(() => {
    if (!!user) {
      user?.borrows?.length === 0
        ? setTimeout(() => {
            setBorrows([
              {
                id: "123456789",
                symbol: "SOL",
                logo: "/assets/icons/solana-1@2x.png",
                percent: 0.3,
                supply: 153657,
                value: 3641.23,
              },
            ]);
          }, 5000)
        : setBorrows(user.borrows);
    }
  }, [borrows]);

  return (
    <div className="w-full flex flex-wrap justify-between gap-5 my-5 flex-col md:flex-row">
      <div
        className="order-10 md:-order-10 flex flex-col justify-start items-start gap-y-5 flex-1 bg-[#0d111b] rounded-3xl lg:px-5 py-5"
        style={{
          boxShadow: "0 0 4px #88d6ff",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(119, 186, 234, 0.2), transparent ), radial-gradient( 50% 50% at 50% 50%, rgba(251, 0, 196, 0) 3.49%, rgba(119, 186, 234, 0) 7.6%, rgba(253, 0, 197, 0) 10.46%, rgba(119, 186, 234, 0) 14.46%, rgba(255, 0, 199, 0) 18.56%, rgba(3, 0, 3, 0) 19.53%, transparent 79.82%, rgba(246, 0, 192, 0) 81.08%, rgba(119, 186, 234, 0) 84.04%, rgba(247, 0, 193, 0) 86.61%, rgba(119, 186, 234, 0) 91.01%, rgba(249, 0, 194, 0) 95.16%, rgba(119, 186, 234, 0) 98.6% )",
        }}
      >
        <Table className="w-full mt-2 overflow-scroll">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {headers.map((header, index) => (
                <>
                  <TableHead
                    key={`${formatedString(
                      header.toLocaleLowerCase()
                    )}_${index}`}
                    className="text-sm md:text-md truncate max-w-[110px]"
                    align="left"
                  >
                    {header}
                  </TableHead>
                  {index === 0 && (
                    <TableHead
                      key={`${formatedString(
                        "empty".toLocaleLowerCase()
                      )}_${index}`}
                      className="text-sm md:text-md truncate max-w-[110px]"
                      align="left"
                    />
                  )}
                  {index === headers.length - 1 && (
                    <TableHead
                      key={`${formatedString(
                        "empty".toLocaleLowerCase()
                      )}_${index}`}
                      className="text-sm md:text-md truncate max-w-xs"
                      align="left"
                    />
                  )}
                </>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {fakeData.length <= 0 ? (
              <>
                <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                  {headers.map((header, index) => (
                    <>
                      <TableCell
                        className="font-medium text-left text-[#7c7c8d] py-2"
                        key={`${header}_skeleton_${index}`}
                      >
                        <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                      </TableCell>
                      {index === 0 && (
                        <TableCell
                          className="font-medium text-left text-[#7c7c8d] py-2"
                          key={`${header}_skeleton_${index}`}
                        >
                          <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                        </TableCell>
                      )}
                      {index === headers.length - 1 && (
                        <TableCell
                          className="font-medium text-left text-[#7c7c8d] py-2 max-w-xs"
                          key={`${header}_skeleton_${index}`}
                        >
                          <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                        </TableCell>
                      )}
                    </>
                  ))}
                </TableRow>
              </>
            ) : (
              <>
                {fakeData.map((row: DataItemProps, index: number) => (
                  <>
                    {row && (
                      <TableRow
                        className="hover:bg-transparent border-[#7c7c8d] h-max"
                        key={`${formatedString(
                          row.mint
                            ? row.mint.toLocaleLowerCase()
                            : "0xcDbb88F82b687FC2246ae5A731Cbba198E050a58".toLocaleLowerCase()
                        )}_${index}`}
                      >
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                          <div className="flex flex-nowrap gap-3 items-center">
                            <div className="flex flex-col gap-6 min-w-[120px]">
                              <span className="text-[#d9f8ff]">
                                {row?.stats?.symbol}
                              </span>
                              <span className="text-sm text-[#7c7c8d]">
                                $
                                {!!row.stats
                                  ? formatedNumber(
                                      row.stats.assetPriceUSD,
                                      5,
                                      isEXTRASMALL
                                    )
                                  : 105.50115}
                              </span>
                            </div>
                            {row.config?.liquidityToken.logo ? (
                              <Image
                                src={row.config.liquidityToken.logo}
                                alt={`${row?.stats?.symbol}-logo / lend`}
                                width={24}
                                height={24}
                                className="w-6 h-6 aspect-square object-contain"
                              />
                            ) : (
                              <Skeleton className="w-6 h-6 aspect-square object-contain" />
                            )}
                          </div>
                        </TableCell>
                        {/* ASSET */}
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-4 w-max min-w-[170px]">
                          <div className="flex flex-nowrap gap-6 flex-col">
                            <div className="flex flex-row gap-2">
                              <span className="text-[#d9f8ff]">Open LTV:</span>
                              <span className="text-sm text-[#7c7c8d]">
                                {row?.stats?.loanToValueRatio}
                              </span>
                            </div>
                            <div className="flex flex-row gap-2">
                              <span className="text-[#d9f8ff]">
                                Borrow weigh:
                              </span>
                              <span className="text-sm text-[#7c7c8d]">1</span>
                            </div>
                          </div>
                        </TableCell>
                        {/* LTV */}
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-4 w-max min-w-[290px]">
                          <div className="flex flex-nowrap gap-6 flex-col">
                            <div className="flex flex-row gap-2">
                              <span className="text-[#d9f8ff] text-xs sm:text-sm">
                                Supply:
                              </span>
                              <div className="flex gap-2 items-center flex-wrap">
                                <span className="text-xs sm:text-sm text-[#7c7c8d]">
                                  $
                                  {row.supply
                                    ? formatedNumber(row.supply, 1, true)
                                    : formatedNumber(0, 1, true)}
                                </span>
                                <span className="text-xs sm:text-sm text-[#7c7c8d]">
                                  {row?.stats?.symbol} -
                                </span>
                                <span className="text-xs sm:text-sm text-[#7c7c8d]">
                                  $
                                  {row.value
                                    ? formatedNumber(row.value, 1, true)
                                    : formatedNumber(0, 1, true)}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-row gap-2">
                              <span className="text-[#d9f8ff]">Borrow:</span>
                              <div className="flex gap-2 items-center flex-wrap">
                                <span className="text-sm text-[#7c7c8d]">
                                  $
                                  {row.borrow
                                    ? formatedNumber(row.borrow, 1, true)
                                    : 0}
                                </span>
                                <span className="text-sm text-[#7c7c8d]">
                                  {row?.stats?.symbol} -
                                </span>
                                <span className="text-sm text-[#7c7c8d]">
                                  $
                                  {row.borrowValue
                                    ? formatedNumber(row.borrowValue, 2, true)
                                    : 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        {/* TOTAL */}
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-4 w-max">
                          <div className="flex flex-col gap-6">
                            {row.supplyAPR && (
                              <span>
                                {formatedNumber(12, 2, isEXTRASMALL)}%
                              </span>
                            )}
                            <span>{formatedNumber(5, 2, isEXTRASMALL)}%</span>
                          </div>
                        </TableCell>

                        <TableCell className="font-medium text-left text-[#7c7c8d] py-4 w-max">
                          <div className="flex flex-col gap-3">
                            <div className="flex gap-2 items-center flex-nowrap">
                              <Button
                                style={{ boxShadow: "0 0 4px 1px #d9f8ff" }}
                                className="min-w-[100px] truncate rounded-3xl h-8"
                                size="sm"
                                onClick={() => {
                                  setSelectedLend(row);
                                  onSupplyOpen();
                                }}
                                disabled={
                                  row.hasOwnProperty("supplyAPR") && user
                                    ? false
                                    : true
                                }
                              >
                                Supply
                              </Button>
                              <Button
                                style={{ boxShadow: "0 0 4px 1px #d9f8ff" }}
                                className="min-w-[100px] truncate rounded-3xl h-8"
                                size="sm"
                                onClick={() => {
                                  setSelectedLend(row);
                                  onBorrowOpen();
                                }}
                                disabled={
                                  row.hasOwnProperty("borrowAPR") && user
                                    ? false
                                    : true
                                }
                              >
                                Borrow
                              </Button>
                            </div>
                            <div className="flex gap-2 items-center flex-nowrap">
                              <Button
                                style={{ boxShadow: "0 0 4px 1px #d9f8ff" }}
                                size="sm"
                                className="min-w-[100px] truncate rounded-3xl h-8"
                                onClick={() => {
                                  setSelectedLend(row);
                                  onRepayOpen();
                                }}
                              >
                                Repay
                              </Button>
                              <Button
                                style={{ boxShadow: "0 0 4px 1px #d9f8ff" }}
                                size="sm"
                                className="min-w-[100px] truncate rounded-3xl h-8"
                                onClick={() => {
                                  setSelectedLend(row);
                                  onWithdrawOpen();
                                }}
                              >
                                Withdraw
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className="flex justify-center items-center gap-5 bg-[#0d111b] rounded-3xl p-6 h-max flex-wrap sticky top-24 flex-col"
        style={{
          boxShadow: "0 0 4px #88d6ff",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(119, 186, 234, 0.2), transparent ), radial-gradient( 50% 50% at 50% 50%, rgba(251, 0, 196, 0) 3.49%, rgba(119, 186, 234, 0) 7.6%, rgba(253, 0, 197, 0) 10.46%, rgba(119, 186, 234, 0) 14.46%, rgba(255, 0, 199, 0) 18.56%, rgba(3, 0, 3, 0) 19.53%, transparent 79.82%, rgba(246, 0, 192, 0) 81.08%, rgba(119, 186, 234, 0) 84.04%, rgba(247, 0, 193, 0) 86.61%, rgba(119, 186, 234, 0) 91.01%, rgba(249, 0, 194, 0) 95.16%, rgba(119, 186, 234, 0) 98.6% )",
        }}
      >
        <div className="flex justify-between w-full max-w-xs">
          {d_data.colbs.colors.map((colb) => (
            <div
              key={colb}
              className={`w-12 h-40 flex justify-end items-end relative`}
            >
              <div
                className={`w-full h-full ${colb} opacity-80 max-h-full rounded-[25px/12.5px]`}
              />
              <div
                className={`w-12 h-full ${colb} opacity-20 max-h-7 absolute right-0 top-0 rounded-[25px/12.5px]`}
              />
              <div
                className={`w-12 h-full ${colb} opacity-60 absolute right-0 bottom-0 rounded-[25px/12.5px]`}
                style={{
                  maxHeight: user.obligationStats
                    ? formatedNumber(
                        user.obligationStats.userTotalBorrow /
                          user.obligationStats.userTotalDeposit,
                        2,
                        isEXTRASMALL
                      )
                    : 28,
                }}
              />
            </div>
          ))}
        </div>

        <div className="w-full flex-1 min-w-[250px]">
          <Table>
            <TableBody>
              {d_data.colbs.body.map((row: any, index: number) => (
                <TableRow
                  className="hover:bg-transparent border-[#7c7c8d]"
                  key={`${formatedString(
                    row.title.toLocaleLowerCase()
                  )}_${index}`}
                >
                  <TableCell
                    className={`font-medium text-left ${row.color} py-2 text-sm pl-0`}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell className="font-medium text-left text-[#7c7c8d] py-2 text-sm pr-0">
                    ${formatedNumber(row.value, 1, true)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className={"text-sky-100 my-2"}>
            Assets <span className={"text-cyan-400"}>Supplied</span>
          </p>
          <hr />
          <Table>
            <TableBody>
              {/* Put item here haj mihruuuuun */}
              <TableRow>
                <div className={"flex flex-row justify-between mt-1"}>
                  <div>
                    <p className={"text-sky-100"}>SOL</p>
                    <p className="text-sky-100">Icon</p>
                  </div>
                  <p className={"text-gray-500"}>% 0.30</p>
                  <div>
                    <p className={"text-gray-500"}> 153.658</p>
                    <p className={"text-gray-500"}>$3,641,23</p>
                  </div>
                </div>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {user && deposits?.length > 0 ? (
          <div className="border-b border-[#7c7c8d] w-full mt-4" />
        ) : null}

        {user && deposits?.length > 0 ? (
          <Table className="w-full flex-1">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {d_data.colbs.assets.supplied_headers.map((header, index) => (
                  <>
                    <TableHead
                      key={`${formatedString(
                        header.toLocaleLowerCase()
                      )}_${index}`}
                      className="text-sm md:text-md truncate max-w-[110px] px-0"
                      align="left"
                    >
                      {header}
                    </TableHead>
                  </>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {deposits.map((row: any, index: number) => (
                <TableRow
                  className="hover:bg-transparent border-[#7c7c8d]"
                  key={`${formatedString(
                    row.info.stats.symbol.toLocaleLowerCase()
                  )}_${index}`}
                >
                  <TableCell
                    className={`font-medium text-left text-[#7c7c8d] py-2 text-sm pl-0`}
                  >
                    <div className="flex flex-col">
                      <span>{row.info.stats.symbol}</span>
                      {row.info.config.liquidityToken.logo ? (
                        <Image
                          src={row.info.config.liquidityToken.logo}
                          alt={`${row?.info?.stats?.symbol}-logo / lend`}
                          width={24}
                          height={24}
                          className="w-6 h-6 aspect-square object-contain"
                        />
                      ) : (
                        <Skeleton className="w-6 h-6 aspect-square object-contain" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`font-medium text-left text-[#7c7c8d] py-2 text-sm pl-0`}
                  >
                    <div className="flex flex-col">
                      <span>%{row.info.supplyAPR}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    className={`font-medium text-left text-[#7c7c8d] py-2 text-sm pl-0`}
                  >
                    <div className="flex flex-col">
                      <span>
                        ${formatedNumber(row.info.user, 2, isEXTRASMALL)}
                      </span>
                      <span>
                        ${formatedNumber(row.info.userValue, 2, isEXTRASMALL)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}

        {user && borrows?.length > 0 ? (
          <Table className="w-full flex-1">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {d_data.colbs.assets.borrowed_headers.map((header, index) => (
                  <>
                    <TableHead
                      key={`${formatedString(
                        header.toLocaleLowerCase()
                      )}_${index}`}
                      className="text-sm md:text-md truncate max-w-[110px] px-0"
                      align="left"
                    >
                      {header}
                    </TableHead>
                  </>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrows.map((row: any, index: number) => (
                <TableRow
                  className="hover:bg-transparent border-[#7c7c8d]"
                  key={`${formatedString(
                    row.info.stats.symbol.toLocaleLowerCase()
                  )}_${index}`}
                >
                  <TableCell
                    className={`font-medium text-left text-[#7c7c8d] py-2 text-sm pl-0`}
                  >
                    <div className="flex flex-col">
                      <span>{row.info.stats.symbol}</span>
                      {row.info.config.liquidityToken.logo ? (
                        <Image
                          src={row.info.config.liquidityToken.logo}
                          alt={`${row?.info?.stats?.symbol}-logo / lend`}
                          width={24}
                          height={24}
                          className="w-6 h-6 aspect-square object-contain"
                        />
                      ) : (
                        <Skeleton className="w-6 h-6 aspect-square object-contain" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`font-medium text-left text-[#7c7c8d] py-2 text-sm pl-0`}
                  >
                    <div className="flex flex-col">
                      <span>%{row.info.supplyAPR}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    className={`font-medium text-left text-[#7c7c8d] py-2 text-sm pl-0`}
                  >
                    <div className="flex flex-col">
                      <span>
                        ${formatedNumber(row.info.user, 2, isEXTRASMALL)}
                      </span>
                      <span>
                        ${formatedNumber(row.info.userValue, 2, isEXTRASMALL)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}
      </div>
    </div>
  );
};

export default MainPool;

const fakeData = [
  {
    balance: 100,
    collection: "Mock Collection",
    id: "mock-id-123",
    mint: "mock-mint-123",
    name: "Mock Name",
    nft_supply: 50,
    price: 200,
    value: 5000,
    stats: {
      symbol: "MOCK",
      assetPriceUSD: 300,
      loanToValueRatio: 0.5,
    },
    config: {
      liquidityToken: {
        logo: "https://fakeimg.pl/340x340",
      },
    },
    supply: 1000,
    borrow: 500,
    borrowValue: 1500,
    supplyAPR: 0.05,
    borrowAPR: 0.1,
  },
  {
    balance: 100,
    collection: "Mock Collection",
    id: "mock-id-123",
    mint: "mock-mint-123",
    name: "Mock Name",
    nft_supply: 50,
    price: 200,
    value: 5000,
    stats: {
      symbol: "MOCK",
      assetPriceUSD: 300,
      loanToValueRatio: 0.5,
    },
    config: {
      liquidityToken: {
        logo: "https://fakeimg.pl/340x340",
      },
    },
    supply: 1000,
    borrow: 500,
    borrowValue: 1500,
    supplyAPR: 0.05,
    borrowAPR: 0.1,
  },
];
