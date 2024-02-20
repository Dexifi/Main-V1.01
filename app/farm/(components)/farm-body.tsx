import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useWallet } from "@solana/wallet-adapter-react";
import { axios } from "@/data/axios";
import { useEffect, useState } from "react";
import { MyFarmsTab, PoolsTab } from "./(tabs)";
import { Header } from "./farm-header";

type Props = {
  isEXTRASMALL: boolean;
};

const FarmBody = ({ isEXTRASMALL }: Props) => {
  const [fetched, setFetched] = useState(false);
  const [orcaList, setOrcaList] = useState({} as any);
  const [userLiquidity, setUserLiquidity] = useState([] as any);
  const [page, setPage] = useState("pools");

  const { publicKey } = useWallet();
  useEffect(() => {
    (async () => {
      const tokenInfo = await axios.get(
        "https://api.mainnet.orca.so/v1/whirlpool/list"
      );

      let sum = 0;
      await Promise.all(
        tokenInfo.data.whirlpools.map(async (item: any) => {
          if (item.tvl) sum = item.tvl + sum;
          item.symbol = `${item.tokenA.symbol}-${item.tokenB.symbol}`;
        })
      );
      setOrcaList({ pools: tokenInfo.data.whirlpools, sum });
    })();
  }, []);

  // useEffect(() => {
  //   if (publicKey) {
  //     // fetchData().then((res) => {
  //     //   setUserLiquidity(res);
  //     // });
  //   }
  // }, [publicKey]);

  if (fetched) {
    userLiquidity.forEach((item: any) => {
      const liqudityFarmData = orcaList.pools.find(
        (i: any) => i.address == item.whirlpoolAddress
      );
      liqudityFarmData.user = item;
    });
    orcaList.pools.sort((a: any, b: any) =>
      a.user === b.user ? 0 : a.user ? -1 : 1
    );
  }

  return (
    <div className="z-50 static py-5 flex flex-col gap-5 items-center w-full">
      <Tabs className="w-full bg-transparent" defaultValue={page}>
        <TabsList
          className={`flex justify-center items-center flex-wrap gap-4 h-max`}
        >
          <Header setPage={setPage} page={page} />
        </TabsList>

        <TabsContent value="pools">
          <PoolsTab data={orcaList} key="pools-content" />
        </TabsContent>
        <TabsContent value="my_farms">
          <MyFarmsTab data={orcaList} key="my-farms-content" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmBody;
