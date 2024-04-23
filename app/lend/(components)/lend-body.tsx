import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { connection } from "@/lib/get-connections";
import formatedNumber from "@/lib/numbers";
import formatedString from "@/lib/string";
import { cn } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { SolendMarket } from "@solendprotocol/solend-sdk";
import BN from "bn.js";
import { useEffect, useState } from "react";
import {
  BorrowModal,
  RepayModal,
  SupplyModal,
  WithdrawModal,
} from "./(modals)";
import { MainPool, TurboSol } from "./(tabs)";

type Props = {
  isEXTRASMALL: boolean;
};
type POverwievProps = {
  isEXTRASMALL: boolean;
  page: string;
  data: any[];
};

type HeaderProps = {
  page: string;
  setPage: (page: string) => void;
};

const Header = ({ setPage, page }: HeaderProps) => {
  const data = [
    {
      title: "Solend Main Pool",
      page_id: "main",
    },
    {
      title: "Solend Turbo Sol",
      page_id: "turbo",
    },
  ];
  return (
    <div className="flex gap-0 sm:gap-x-2 z-10 bg-[#0d111b] rounded-full">
      {data.map((tab, index) => (
        <TabsTrigger
          value={tab.page_id.toLocaleLowerCase()}
          className="text-xs sm:text-sm md:text-lg text-center hyphens-none flex md:flex px-3 sm:px-5 py-2 w-max cursor-pointer font-['DM Sans'] text-[#d9f8ff] hover:text-white transition-all box-border data-[state=active]:bg-[#D9F8FF10] rounded-full transition-none shadow-none border-none"
          style={{
            border:
              formatedString(tab.page_id).toLocaleLowerCase() === page
                ? "1px solid #D9F8FF"
                : "",
            boxShadow:
              formatedString(tab.page_id).toLocaleLowerCase() === page
                ? "0 0 4px 1px #d9f8ff75"
                : "",
          }}
          key={index}
          onClick={() => setPage(tab.page_id)}
        >
          {tab.title}
        </TabsTrigger>
      ))}
    </div>
  );
};

const PoolOverview = ({ isEXTRASMALL, data, page }: POverwievProps) => {
  const [gdata, setData] = useState<any>([]);
  const d_data = {
    title: "Pool Orverview",
    table: {
      headers: ["Creator", "Pool", "Total supply", "Total borrow", "TVL"],
    },
  };

  useEffect(() => {
    gdata.length === 0
      ? setTimeout(() => {
          setData([
            {
              creator: "Solend",
              pool: "MainPool",
              totalSupply: 37300000,
              totalBorrow: 204900000,
              tvl: 167600000,
            },
          ]);
        }, 5000)
      : setData(data);
  }, [data, gdata]);

  return (
    <div className="w-full flex flex-wrap justify-between gap-5 my-5">
      <div
        className="flex flex-col justify-start items-start gap-y-5 flex-1 bg-[#0d111b] rounded-3xl px-5 lg:px-10 py-5 overflow-auto"
        style={{ boxShadow: "0 0 4px #88d6ff" }}
      >
        <div className="flex gap-x-5 text-[#D9F8FF] text-lg md:text-2xl">
          <h3>{d_data.title}</h3>
        </div>

        <div className="flex justify-center md:justify-between gap-12 relative flex-wrap md:flex-nowrap md:flex-row flex-1 w-full">
          <div className="flex flex-col gap-4 w-full">
            <Table className="w-full flex-1">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {d_data.table.headers.map((header, index) => (
                    <TableHead
                      key={`${formatedString(
                        header.toLocaleLowerCase()
                      )}_${index}`}
                      className="text-sm md:text-md truncate max-w-[110px]"
                      align="left"
                    >
                      {header}
                    </TableHead>
                  ))}
                  {page === "turbo" && (
                    <TableHead
                      className="text-sm md:text-md truncate max-w-[160px]"
                      align="left"
                    />
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {gdata.length <= 0 ? (
                  <>
                    <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                      {d_data.table.headers.map((header, index) => (
                        <TableCell
                          className="font-medium text-left text-[#7c7c8d] py-2"
                          key={`${header}_skeleton_${index}`}
                        >
                          <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                        </TableCell>
                      ))}
                      {page === "turbo" && (
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-2 min-w-[160px]">
                          <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                        </TableCell>
                      )}
                    </TableRow>
                  </>
                ) : (
                  <>
                    {gdata.map((row: any, index: number) => (
                      <TableRow
                        className="hover:bg-transparent border-[#7c7c8d]"
                        key={`${formatedString(
                          row.creator.toLocaleLowerCase()
                        )}_${index}`}
                      >
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                          {row.creator}
                        </TableCell>
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                          {row.pool}
                        </TableCell>
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                          ${formatedNumber(row.totalSupply, 1, true)}
                        </TableCell>
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                          ${formatedNumber(row.totalBorrow, 1, true)}
                        </TableCell>
                        <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                          ${formatedNumber(row.tvl, 1, true)}
                        </TableCell>
                        {page === "turbo" && (
                          <TableCell className="font-medium text-left text-[#7c7c8d] py-4">
                            ${formatedNumber(4000000, 1, true)} per 4 hours
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>

            {page === "turbo" && (
              <p className="text-xs sm:text-sm xl:text-lg text-white w-full md:w-3/5 leading-relaxed">
                The TURBO SOL pool offers increased LTV to allow a leveraged SOL
                position up to 4x. Higher leverage comes at the cost of
                increased liquidation risk so proceed with caution.{" "}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center min-w-full md:min-w-[200px] min-h-[200px] md:aspect-square relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 10 110 100"
                style={{ width: "200px", height: "auto" }}
              >
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0%" stopColor="#76FFFF" />
                  <stop offset="100%" stopColor="#76FFFF" />
                </linearGradient>
                <path
                  className="grey"
                  d="M30,90 A40,40 0 1,1 80,90"
                  fill="none"
                  style={{
                    stroke: "#292f39",
                    strokeLinecap: "round",
                    strokeWidth: "6",
                  }}
                />
                <path
                  id="blue"
                  fill="none"
                  className="blue"
                  d="M30,90 A40,40 0 1,1 80,90"
                  style={{
                    stroke: "url(#gradient)",
                    strokeLinecap: "round",
                    strokeWidth: "6",
                    strokeDasharray: "198",
                    strokeDashoffset: data[0]
                      ? formatedNumber(
                          198 -
                            198 * (data[0].totalSupply / data[0].totalBorrow),
                          2,
                          isEXTRASMALL
                        )
                      : formatedNumber(198, 2, isEXTRASMALL),
                    animation: "dash 3s ease-out forwards",
                  }}
                />
              </svg>
              <div className="text-sm md:text-lg text-[#D9F8FF] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {gdata[0]
                  ? formatedNumber(
                      (gdata[0].totalSupply / gdata[0].totalBorrow) * 100,
                      2,
                      isEXTRASMALL
                    )
                  : 0}
                %
              </div>
            </div>
            <div className="text-xs md:text-sm text-[#7c7c8d] text-center flex flex-col justify-center items-center gap-2">
              <span>Pool Filling Rate</span>
              <span>(Total borrow/Total supply)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LendBody = ({ isEXTRASMALL }: Props) => {
  const [selectedLend, setSelectedLend] = useState(null);
  const [marketTVl, setMarketTVl] = useState<any>({});
  const [markets, setMarkets] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [pool, setPool] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const { publicKey } = useWallet();
  const [page, setPage] = useState("main");
  console.log();
  const fetchMarketData = async () => {
    let marketPubkey =
      page === "turbo"
        ? new PublicKey("7RCz8wb6WXxUhAigok9ttgrVgDFFFbibcirECzWSBauM")
        : undefined;
    let market = await SolendMarket.initialize(
      connection,
      "production", // optional environment argument
      marketPubkey !== undefined ? marketPubkey.toString() : undefined
    );
    await market.loadAll();
    setPool(market);
    let totalSupplyMarket = 0;
    let totalBorrowMarket = 0;
    await market.reserves.forEach(async (item: any) => {
      await item.load();
      let WAD = new BN(10).pow(new BN(18));
      if (item?.stats?.decimals === undefined) {
        return;
      }
      let TokenDecimals = new BN(10).pow(new BN(item?.stats?.decimals));
      item.supply = item?.stats?.totalDepositsWads
        .div(WAD)
        .div(TokenDecimals)
        .toString();
      item.borrow = item?.stats?.totalBorrowsWads
        .div(WAD)
        .div(TokenDecimals)
        .toString();
      item.value = Number(item.supply) * item?.stats?.assetPriceUSD || 0;
      totalSupplyMarket += item.value;
      item.borrowValue = item.borrow * item?.stats?.assetPriceUSD || 0;
      totalBorrowMarket += item.borrowValue;
      if (item?.stats?.supplyInterestAPY) {
        const supplyAPR =
          ((1 + item?.stats?.supplyInterestAPY / 1) ** 1 - 1) * 100;
        item.supplyAPR = supplyAPR.toFixed(2);
      }
      if (item?.stats?.borrowInterestAPY) {
        const borrowAPR =
          ((1 + item?.stats?.borrowInterestAPY / 1) ** 1 - 1) * 100;
        item.borrowAPR = borrowAPR.toFixed(2);
      }
    });
    setMarketTVl({
      totalBorrowMarket,
      totalSupplyMarket,
      TVL: Number(totalSupplyMarket) - Number(totalBorrowMarket),
    });
    setMarkets(market.reserves);
  };

  const fetchData = async () => {
    if (publicKey === null) {
      return;
    }
    let userData = await pool.fetchObligationByWallet(publicKey);
    if (userData === null) {
      return;
    }
    userData.totalSupply = 0;
    userData.totalBorrow = 0;
    userData?.deposits.forEach((deposit: any) => {
      const reserve = pool.reserves.find(
        (item: any) => item?.stats?.mintAddress === deposit.mintAddress
      );
      if (reserve) {
        reserve.user =
          deposit.amount.toNumber() /
          10 ** reserve.config.liquidityToken.decimals;
        reserve.userValue = reserve.user * reserve.stats?.assetPriceUSD;
      }
      deposit.info = reserve;
      userData.totalSupply += reserve.user;
    });
    userData?.borrows.forEach((deposit: any) => {
      const reserve = pool.reserves.find(
        (item: any) => item?.stats?.mintAddress === deposit.mintAddress
      );
      if (reserve) {
        reserve.userBorrow =
          deposit.amount.toNumber() /
          10 ** reserve.config.liquidityToken.decimals;
        reserve.userBorrowValue =
          reserve.userBorrow * reserve.stats?.assetPriceUSD;
        if (reserve.userBorrow < 0.00001) {
          reserve.userBoorrow = 0.00001;
          reserve.userBorrowValue = 0.00001;
        }
      }
      deposit.borrowInfo = reserve;
      userData.totalBorrow += reserve.userBorrow;
    });
    setUser(userData);
    if (user) setLoading(false);
  };

  useEffect(() => {
    fetchMarketData();
  }, [page]);

  useEffect(() => {
    if (loading && publicKey && pool && !user) fetchData();
  }, [publicKey, page, markets]);

  return (
    <div className="z-50 static py-5 flex flex-col gap-5 items-center w-full">
      <Tabs className="w-full bg-transparent" defaultValue={page}>
        <TabsList
          className={`flex justify-center items-center flex-wrap gap-4 h-max`}
        >
          <Header setPage={setPage} page={page} />
        </TabsList>

        <TabsContent value="main">
          <PoolOverview
            isEXTRASMALL={isEXTRASMALL}
            page={page}
            data={[
              {
                creator: "Solend",
                pool: page === "main" ? "MainPool" : "TurboPool",
                totalSupply: marketTVl.totalBorrowMarket,
                totalBorrow: marketTVl.totalSupplyMarket,
                tvl: marketTVl.TVL,
              },
            ]}
          />
          <MainPool
            markets={markets}
            headers={["Asset", "Total", "APR"]}
            isEXTRASMALL={isEXTRASMALL}
            setSelectedLend={setSelectedLend}
            user={user}
          />
        </TabsContent>
        <TabsContent value="turbo">
          <PoolOverview
            isEXTRASMALL={isEXTRASMALL}
            page={page}
            data={[
              {
                creator: "Solend",
                pool: page === "main" ? "MainPool" : "TurboPool",
                totalSupply: marketTVl.totalBorrowMarket,
                totalBorrow: marketTVl.totalSupplyMarket,
                tvl: marketTVl.TVL,
              },
            ]}
          />
          <TurboSol
            markets={markets}
            headers={["Asset", "Total", "APR"]}
            isEXTRASMALL={isEXTRASMALL}
            setSelectedLend={setSelectedLend}
            user={user}
          />
        </TabsContent>
      </Tabs>

      <SupplyModal user={user} pool={pool} reserve={selectedLend} />
      <WithdrawModal user={user} pool={pool} reserve={selectedLend} />
      <BorrowModal user={user} pool={pool} reserve={selectedLend} />
      <RepayModal user={user} pool={pool} reserve={selectedLend} />
    </div>
  );
};

export default LendBody;
