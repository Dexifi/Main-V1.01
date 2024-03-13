import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { connection } from "@/lib/get-connections";
import formatedString from "@/lib/string";
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
import PoolOverview from "./PoolOverview";

type Props = {
  isEXTRASMALL: boolean;
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

const LendBody = ({ isEXTRASMALL }: Props) => {
  const [selectedLend, setSelectedLend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pool, setPool] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const { publicKey } = useWallet();
  const [page, setPage] = useState("main");

  return (
    <div className="z-50 static py-5 flex flex-col gap-5 items-center w-full">
      <Tabs className="w-full bg-transparent" defaultValue={page}>
        <TabsList
          className={`flex justify-center items-center flex-wrap gap-4 h-max`}
        >
          <Header setPage={setPage} page={page} />
        </TabsList>

        <TabsContent value="main">
          <PoolOverview isEXTRASMALL={isEXTRASMALL} page={page} />
          <MainPool
            headers={["Asset", "Total", "APR"]}
            isEXTRASMALL={isEXTRASMALL}
            setSelectedLend={setSelectedLend}
            user={user}
          />
        </TabsContent>
        <TabsContent value="turbo">
          <PoolOverview isEXTRASMALL={isEXTRASMALL} page={page} />
          {/*<TurboSol*/}
          {/*  headers={["Asset", "Total", "APR"]}*/}
          {/*  isEXTRASMALL={isEXTRASMALL}*/}
          {/*  setSelectedLend={setSelectedLend}*/}
          {/*  user={user}*/}
          {/*/>*/}
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
