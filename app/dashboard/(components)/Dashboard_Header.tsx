import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import formatedString from "@/lib/string";
import { DefaultTab, NFT_Gallery, TransactionsTab } from "./(tabs)";
import AccountsTab from "./(tabs)/AccountsTab";
import { useState } from "react";

const tabs = ["Main", "NFT Gallery", "Transactions", "Accounts"];

const DashboardHeader = () => {
  const [page, setPage] = useState("main");
  return (
    <div className="flex justify-between items-center w-full relative z-50">
      <Tabs className="w-full bg-transparent" defaultValue="default">
        <TabsList className={`flex  items-center flex-wrap gap-4 h-max`}>
          <div className="flex gap-0 sm:gap-x-2 z-10 bg-[#0d111b] rounded-full ">
            {tabs.map((tab, index) => (
              <TabsTrigger
                value={formatedString(tab.toLocaleLowerCase())}
                key={index}
                className="text-xs sm:text-sm md:text-lg text-center hyphens-none flex md:flex px-2 sm:px-5 py-2 w-max cursor-pointer font-['DM Sans'] text-[#d9f8ff] hover:text-white transition-all box-border data-[state=active]:bg-[#D9F8FF10]  rounded-full transition-none shadow-none border-none"
                onClick={() => setPage(formatedString(tab.toLocaleLowerCase()))}
                style={{
                  border:
                    formatedString(tab).toLocaleLowerCase() === page
                      ? "1px solid #D9F8FF"
                      : "",
                  boxShadow:
                    formatedString(tab).toLocaleLowerCase() === page
                      ? "0 0 4px 1px #d9f8ff75"
                      : "",
                }}
              >
                {tab}
              </TabsTrigger>
            ))}
          </div>
        </TabsList>

        <TabsContent
          value="main"
          className="w-full text-sm md:text-lg text-center hyphens-none py-2 font-['DM Sans'] text-[#d9f8ff] hover:text-white transition-all"
        >
          <DefaultTab />
        </TabsContent>
        <TabsContent
          value="nft_gallery"
          className="w-full text-sm md:text-lg text-center hyphens-none py-2 font-['DM Sans'] text-[#d9f8ff] hover:text-white transition-all"
        >
          <NFT_Gallery />
        </TabsContent>

        <TabsContent
          value="transactions"
          className="w-full text-sm md:text-lg  text-center hyphens-none py-2 font-['DM Sans'] text-[#d9f8ff] hover:text-white transition-all"
        >
          <TransactionsTab />
        </TabsContent>
        <TabsContent
          value="accounts"
          className="w-full text-sm md:text-lg  text-center hyphens-none py-2 font-['DM Sans'] text-[#d9f8ff] hover:text-white transition-all"
        >
          <AccountsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardHeader;
