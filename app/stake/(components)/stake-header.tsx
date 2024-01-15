import { TabsTrigger } from "@/components/ui/tabs";
import formatedString from "@/lib/string";
import Image from "next/image";

type HeaderProps = {
  setPage: (page: string) => void;
  page: string;
  isEXTRASMALL: boolean;
};

export const Header = ({ setPage, page, isEXTRASMALL }: HeaderProps) => {
  const data = ["Dexifi", "Ecosystem", "Liquidity Stake", "My Vaults"];
  return (
    <div className="flex gap-0 sm:gap-x-2 z-10 bg-[#0d111b] rounded-full">
      {data.map((tab, index) => (
        <TabsTrigger
          value={formatedString(tab).toLocaleLowerCase()}
          className="text-xs sm:text-sm md:text-lg text-center hyphens-none flex md:flex px-2 sm:px-5 py-2 w-max cursor-pointer font-['DM Sans'] text-[#d9f8ff] hover:text-white box-border data-[state=active]:bg-[#D9F8FF10] rounded-full transition-none shadow-none border-none"
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
          key={index}
          onClick={() => setPage(formatedString(tab).toLocaleLowerCase())}
        >
          {formatedString(tab).toLocaleLowerCase() === "dexifi" ? (
            <Image
              src="/assets/images/dexifi-logo@2x.png"
              className="w-6 md:w-9 h-6 md:h-9 aspect-square object-contain"
              alt="dexifi-logo / stake"
              width={isEXTRASMALL ? 24 : 32}
              height={isEXTRASMALL ? 24 : 32}
            />
          ) : (
            <span className="text-xs sm:text-sm">{tab}</span>
          )}
        </TabsTrigger>
      ))}
    </div>
  );
};
