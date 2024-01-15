import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DefaultTab } from "./(tabs)";
// import {
//   DefaultTab,
//   EcosystemTab,
//   LiquidityStakeTab,
//   MyVaultsTab,
// } from "./(tabs)";
import { Header } from "./ido-header";

type Props = {
  isEXTRASMALL: boolean;
};

const IDOPageBody = ({ isEXTRASMALL }: Props) => {
  const [page, setPage] = useState("all");
  return (
    <div className="z-50 static py-5 flex flex-col gap-5 items-center w-full">
      <Tabs className="w-full bg-transparent" defaultValue={page}>
        <TabsList
          className={`flex justify-center items-center flex-wrap gap-4 h-max`}
        >
          <Header setPage={setPage} page={page} isEXTRASMALL={isEXTRASMALL} />
        </TabsList>

        <TabsContent value="all">
          <DefaultTab isEXTRASMALL={isEXTRASMALL} />
        </TabsContent>
        <TabsContent value="open">
          <DefaultTab isEXTRASMALL={isEXTRASMALL} />
        </TabsContent>
        <TabsContent value="closed">
          <DefaultTab isEXTRASMALL={isEXTRASMALL} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IDOPageBody;
