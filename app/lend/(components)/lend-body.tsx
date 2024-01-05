import { connection } from "@/lib/get-connections";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { SolendMarket } from "@solendprotocol/solend-sdk";
import BN from "bn.js";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MainPool, TurboSol } from "./(tabs)";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  isEXTRASMALL: boolean;
};

type HeaderProps = {
  setPage: (page: string) => void;
};

const Header = ({ setPage }: HeaderProps) => {
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
          className={cn(
            "text-xs sm:text-sm md:text-lg text-center hyphens-none flex md:flex px-3 sm:px-5 py-2 w-max cursor-pointer font-['DM Sans'] text-[#d9f8ff] hover:text-white transition-all box-border data-[state=active]:bg-[#D9F8FF10] data-[state=active]:rounded-full"
          )}
          key={index}
          onClick={() => setPage(tab.page_id)}
        >
          {tab.title}
        </TabsTrigger>
      ))}
    </div>
  );
};

const PoolOverview = () => {
  const [gdata, setData] = useState<any>([]);
  const data = {
    title: "Pool Orverview",
    table: {
      headers: ["Creator", "Pool", "Total supply", "Total borrow", "TVL"],
    },
  };

  useEffect(() => {
    gdata.length === 0 &&
      setTimeout(() => {
        setData([
          {
            creator: "Solend",
            pool: "MainPool",
            totalSupply: 37300000,
            totalBorrow: 204900000,
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
  return (
    <div className="w-full flex flex-wrap justify-between gap-5 my-5">
      <div
        className="flex flex-col justify-start items-start gap-y-5 flex-1 bg-[#0d111b] rounded-3xl px-5 lg:px-10 py-5 overflow-auto"
        style={{ boxShadow: "0 0 4px #88d6ff" }}
      >
        <div className="flex gap-x-5 text-[#D9F8FF] text-lg md:text-2xl">
          <h3>{data.title}</h3>
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

  //   const fetchMarketData = async () => {
  //     let marketPubkey =
  //       page === "turbo"
  //         ? new PublicKey("7RCz8wb6WXxUhAigok9ttgrVgDFFFbibcirECzWSBauM")
  //         : undefined;
  //     let market = await SolendMarket.initialize(
  //       connection,
  //       "production", // optional environment argument
  //       marketPubkey !== undefined ? marketPubkey.toString() : undefined
  //     );
  //     await market.loadAll();
  //     setPool(market);
  //     let totalSupplyMarket = 0;
  //     let totalBorrowMarket = 0;
  //     await market.reserves.forEach(async (item) => {
  //       await item.load();
  //       let WAD = new BN(10).pow(new BN(18));
  //       if (item?.stats?.decimals === undefined) {
  //         return;
  //       }
  //       let TokenDecimals = new BN(10).pow(new BN(item?.stats?.decimals));
  //       item.supply = item?.stats?.totalDepositsWads
  //         .div(WAD)
  //         .div(TokenDecimals)
  //         .toString();
  //       item.borrow = item?.stats?.totalBorrowsWads
  //         .div(WAD)
  //         .div(TokenDecimals)
  //         .toString();
  //       item.value = Number(item.supply) * item?.stats?.assetPriceUSD || 0;
  //       totalSupplyMarket += item.value;
  //       item.borrowValue = item.borrow * item?.stats?.assetPriceUSD || 0;
  //       totalBorrowMarket += item.borrowValue;
  //       if (item?.stats?.supplyInterestAPY) {
  //         const supplyAPR =
  //           ((1 + item?.stats?.supplyInterestAPY / 1) ** 1 - 1) * 100;
  //         item.supplyAPR = supplyAPR.toFixed(2);
  //       }
  //       if (item?.stats?.borrowInterestAPY) {
  //         const borrowAPR =
  //           ((1 + item?.stats?.borrowInterestAPY / 1) ** 1 - 1) * 100;
  //         item.borrowAPR = borrowAPR.toFixed(2);
  //       }
  //     });
  //     setMarketTVl({
  //       totalBorrowMarket,
  //       totalSupplyMarket,
  //       TVL: Number(totalSupplyMarket) - Number(totalBorrowMarket),
  //     });
  //     setMarkets(market.reserves);
  //   };

  //   const fetchData = async () => {
  //     if (publicKey === null) {
  //       return;
  //     }
  //     let userData = await pool.fetchObligationByWallet(publicKey);
  //     if (userData === null) {
  //       return;
  //     }
  //     userData.totalSupply = 0;
  //     userData.totalBorrow = 0;
  //     userData?.deposits.forEach((deposit: any) => {
  //       const reserve = pool.reserves.find(
  //         (item: any) => item?.stats?.mintAddress === deposit.mintAddress
  //       );
  //       if (reserve) {
  //         reserve.user =
  //           deposit.amount.toNumber() /
  //           10 ** reserve.config.liquidityToken.decimals;
  //         reserve.userValue = reserve.user * reserve.stats?.assetPriceUSD;
  //       }
  //       deposit.info = reserve;
  //       userData.totalSupply += reserve.user;
  //     });
  //     userData?.borrows.forEach((deposit: any) => {
  //       const reserve = pool.reserves.find(
  //         (item: any) => item?.stats?.mintAddress === deposit.mintAddress
  //       );
  //       if (reserve) {
  //         reserve.userBorrow =
  //           deposit.amount.toNumber() /
  //           10 ** reserve.config.liquidityToken.decimals;
  //         reserve.userBorrowValue =
  //           reserve.userBorrow * reserve.stats?.assetPriceUSD;
  //         if (reserve.userBorrow < 0.00001) {
  //           reserve.userBoorrow = 0.00001;
  //           reserve.userBorrowValue = 0.00001;
  //         }
  //       }
  //       deposit.borrowInfo = reserve;
  //       userData.totalBorrow += reserve.userBorrow;
  //     });
  //     setUser(userData);
  //     if (user) setLoading(false);
  //   };

  //   useEffect(() => {
  //     fetchMarketData();
  //   }, [page]);

  //   useEffect(() => {
  //     if (loading && publicKey && pool && !user) fetchData();
  //   }, [publicKey, page, markets]);

  return (
    <div className="z-50 static py-5 flex flex-col gap-5 items-center w-full">
      <Tabs className="w-full bg-transparent" defaultValue={page}>
        <TabsList
          className={`flex justify-center items-center flex-wrap gap-4 h-max`}
        >
          <Header setPage={setPage} />
        </TabsList>

        <TabsContent value="main">
          <PoolOverview />
          <MainPool />
        </TabsContent>
        <TabsContent value="turbo">
          <PoolOverview />
          <TurboSol />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LendBody;
