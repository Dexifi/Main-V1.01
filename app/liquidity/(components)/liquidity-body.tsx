import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useState } from "react";
import { Header } from "./liquidity-header";
import { MyPositions, PoolsTab } from "./(tabs)";

type Props = {
  isEXTRASMALL: boolean;
};

const LiquidityBody = ({ isEXTRASMALL }: Props) => {
  const [page, setPage] = useState("pools");

  return (
    <div className="z-50 static py-5 flex flex-col gap-5 items-center w-full">
      <Tabs className="w-full bg-transparent" defaultValue={page}>
        <TabsList
          className={`flex justify-center items-center flex-wrap gap-4 h-max`}
        >
          <Header setPage={setPage} page={page} />
        </TabsList>

        <TabsContent value="pools">
          <PoolsTab key="pools-content" />
        </TabsContent>
        <TabsContent value="my_positions">
          <MyPositions key="my_positions-content" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiquidityBody;
