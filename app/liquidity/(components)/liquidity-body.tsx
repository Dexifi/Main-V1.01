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
    <div className="py-5 flex flex-col gap-5 items-center w-full">
      <div
        className="absolute z-10 top-10 left-0 right-0 mx-auto w-[54rem] h-[32rem] lg:h-[64rem] overflow-hidden"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(119, 186, 234, 0.2), transparent ), radial-gradient( 50% 50% at 50% 50%, rgba(251, 0, 196, 0) 3.49%, rgba(119, 186, 234, 0) 7.6%, rgba(253, 0, 197, 0) 10.46%, rgba(119, 186, 234, 0) 14.46%, rgba(255, 0, 199, 0) 18.56%, rgba(3, 0, 3, 0) 19.53%, transparent 79.82%, rgba(246, 0, 192, 0) 81.08%, rgba(119, 186, 234, 0) 84.04%, rgba(247, 0, 193, 0) 86.61%, rgba(119, 186, 234, 0) 91.01%, rgba(249, 0, 194, 0) 95.16%, rgba(119, 186, 234, 0) 98.6% )",
        }}
      />
      <Tabs className="w-full bg-transparent relative" defaultValue={page}>
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
