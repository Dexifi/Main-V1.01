import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useState } from "react";
import {
  DefaultTab,
  EcosystemTab,
  LiquidityStakeTab,
  MyVaultsTab,
} from "./(tabs)";
import { Header } from "./stake-header";

type Props = {
  isEXTRASMALL: boolean;
};

const StakeBody = ({ isEXTRASMALL }: Props) => {
  const [page, setPage] = useState("dexifi");
  return (
    <div className="z-50 static py-5 flex flex-col gap-5 items-center w-full">
      <Tabs className="w-full bg-transparent" defaultValue={page}>
        <TabsList
          className={`flex justify-center items-center flex-wrap gap-4 h-max`}
        >
          <Header setPage={setPage} page={page} isEXTRASMALL={isEXTRASMALL} />
        </TabsList>

        <TabsContent value="dexifi">
          <DefaultTab isEXTRASMALL={isEXTRASMALL} />
        </TabsContent>
        <TabsContent value="ecosystem">
          <EcosystemTab isEXTRASMALL={isEXTRASMALL} />
        </TabsContent>
        <TabsContent value="liquidity_stake">
          <LiquidityStakeTab isEXTRASMALL={isEXTRASMALL} />
        </TabsContent>
        <TabsContent value="my_vaults">
          <MyVaultsTab isEXTRASMALL={isEXTRASMALL} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StakeBody;
