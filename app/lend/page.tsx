"use client";

import DashboardProvider from "@/components/providers/dashboard-provider";
import { Toaster } from "@/components/ui/toaster";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import { Header } from "../dashboard/(components)";
import { LendBody } from "./(components)";

type Props = {};

const LendPage = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 990px)");
  const isEXTRASMALL = useMediaQuery("(max-width: 370px)");
  const isClient = useIsClient();
  return (
    <DashboardProvider>
      <Toaster />
      <div className="bg-[#0d111b] relative min-h-screen w-full flex items-center flex-col">
        {isClient && <Header isMobile={isMobile} />}
        <div className="container relative w-full max-w-full pt-4 overflow-x-hidden mb-12">
          <div
            className="absolute -top-96 left-[calc(50% - 866px)] w-[54rem] h-[32rem] lg:h-[64rem] overflow-hidden"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(119, 186, 234, 0.2), transparent ), radial-gradient( 50% 50% at 50% 50%, rgba(251, 0, 196, 0) 3.49%, rgba(119, 186, 234, 0) 7.6%, rgba(253, 0, 197, 0) 10.46%, rgba(119, 186, 234, 0) 14.46%, rgba(255, 0, 199, 0) 18.56%, rgba(3, 0, 3, 0) 19.53%, transparent 79.82%, rgba(246, 0, 192, 0) 81.08%, rgba(119, 186, 234, 0) 84.04%, rgba(247, 0, 193, 0) 86.61%, rgba(119, 186, 234, 0) 91.01%, rgba(249, 0, 194, 0) 95.16%, rgba(119, 186, 234, 0) 98.6% )",
            }}
          />
          {isClient && <LendBody isEXTRASMALL={isEXTRASMALL} />}
        </div>
      </div>
    </DashboardProvider>
  );
};

export default LendPage;
