"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useMediaQuery } from "usehooks-ts";
import { Backgrounds, Footer, Header, StatisticItem } from "./(components)";
import Image from "next/image";
import useConnection from "@/hooks/useConnection";
import useMagicEden from "@/hooks/useMagicEden";

type StatisticProps = {
  columns: {
    logo: string;
    title: string;
    text: string;
    classNames: string;
    color: string;
    textBottom?: {
      size: "large" | "default" | "medium";
      point: boolean;
      title: string;
      value: string;
      order: "default" | "negative";
      position: "end" | "start";
      valueCN?: string;
      className?: string;
    };
  }[];
  position: "start" | "center" | "end";
};

const Main = () => {
  const router = useRouter();
  const { connection } = useConnection();
  const onComponent5Click = useCallback(() => {
    router.push("/dashboard");
  }, [router]);
  const isMobile = useMediaQuery("(max-width: 990px)");
  const { total } = useMagicEden();
  // console.log(total);
  const [transactionsCount, setTransactionsCount] = useState(0);
  const [isClient, setIsClient] = useState<boolean>(false);

  const onFrameButton6Click = useCallback(() => {
    window.open("https://dexifi-finances.gitbook.io/dexifi-blog/");
  }, []);

  const onFrameButton4Click = useCallback(() => {
    window.open("https://dexifi-finances.gitbook.io/dexifi-documentation/");
  }, []);

  useEffect(() => {
    connection
      .getTransactionCount()
      .then((res: number) => {
        setTransactionsCount(res);
      })
      .catch((error: any) => {
        setTransactionsCount(123442859844);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const statisticsARR: StatisticProps[] = [
    {
      columns: [
        {
          classNames: "lg:w-[42rem]",
          logo: "/assets/images/dexifi-logo@2x.png",
          title: "Dexifi",
          text: "Enables users to access financial services without intermediaries, and it operates on a transparent and secure blockchain network. With zero platform fees and an open-source code, Dexifi offers a user-friendly and accessible alternative to traditional finance.",
          color: "bg-[#00d0ff]",
          textBottom: {
            point: false,
            size: "large",
            order: "default",
            title: "platform fee",
            className:
              "flex items-end justify-end flex-col lg:flex-row gap-8 mt-8",
            position: "end",
            value: "0.00 %",
          },
        },
        {
          classNames: "lg:w-[21rem]",
          logo: "/assets/images/solana-1@2x.png",
          title: "Solana",
          text: "Don’t keep your users waiting. Solana has block times of 400 milliseconds — and as hardware gets faster, so will the network.",
          color: "bg-[#fa01d2]",
          textBottom: {
            point: true,
            size: "medium",
            order: "negative",
            title: "total transaction",
            position: "start",
            className: "flex flex-col",
            value: `${Math.round(transactionsCount / 1_000_000_000)}B`,
            valueCN: "pl-2 leading-7",
          },
        },
      ],
      position: "start",
    },
    {
      columns: [
        {
          classNames: "lg:w-[42rem]",
          logo: "/assets/images/dexifi-logo@2x.png",
          title: "Wallet Utility",
          text: "Dashboard panel provides users with easy access to their locker, live positions, and the overall state of the network. This enables users to better manage their portfolios and accounts, all from a single, high-quality user interface. By bringing everything together in one place, the DeFi platform offers a seamless user experience that makes it easy to navigate and manage all aspects of the platform.",
          color: "bg-[#9945ff]",
        },
        {
          classNames: "lg:w-[21rem]",
          logo: "/assets/icons/logos/jupiter_logo.svg",
          title: "Jupiter",
          text: "The best swap aggregator & infrastructure for Solana - powering best price, token selection and UX for all users and devs.",
          color: "bg-[#ffd512]",
          textBottom: {
            point: true,
            size: "medium",
            order: "negative",
            title: "LIVE DEXs",
            position: "start",
            className: "flex flex-col",
            value: `24`,
            valueCN: "pl-2 leading-7",
          },
        },
      ],
      position: "end",
    },
    {
      columns: [
        {
          classNames: "lg:w-[22.5rem]",
          logo: "/assets/images/image-11@2x.png",
          title: "Magic Edan",
          text: "The NFT Marketplace Solana deserves, smooth as silk & fast as Solana.the biggest and most liquid NFT marketplace globally and home to the next generation of digital creators.",
          color: "bg-[#0000ff]",
          textBottom: {
            point: true,
            size: "medium",
            order: "negative",
            title: "MARKET Value",
            position: "start",
            className: "flex flex-col",
            value: `${Math.round(total).toLocaleString("en")} SOL`,
            valueCN: "pl-2 leading-7",
          },
        },
        {
          classNames: "lg:w-[42rem]",
          logo: "/assets/icons/logos/jupiter_logo.svg",
          title: "Jupiter",
          text: "Dexifi platform is dedicated to bringing the best ideas for creating new blockchain services that empower decentralization across the network. By leveraging the power of blockchain technology, Dexifi aims to revolutionize the financial industry and provide users with access to financial services that are transparent, secure, and decentralized. With a focus on innovation and user experience, Dexifi is driving the next wave of blockchain-based services and creating a new sensation in the world of finance.",
          color: "bg-[#7fffd4]",
          textBottom: {
            point: true,
            size: "medium",
            order: "negative",
            title: "TOTAL PROJECT LAUNCHED",
            position: "start",
            className: "flex flex-col",
            value: `3`,
            valueCN: "pl-2 leading-7",
          },
        },
      ],
      position: "start",
    },
    {
      columns: [
        {
          classNames: "lg:w-[42rem]",
          logo: "/assets/images/liquidity_Icon-copy-1@2x.png",
          title: "Liquidity",
          text: "Platform offers users access to some of the largest AMM and CLMM pools available, providing them with a wide range of investment options to choose from. The platform is designed to be user-friendly and efficient, making it easy for anyone to navigate and invest in their preferred assets. With a diverse range of options and a simple interface, Dexifi is the perfect platform for anyone looking to explore the world of decentralized finance.",
          color: "bg-[#ffd700]",
          textBottom: {
            point: true,
            size: "medium",
            order: "negative",
            title: "TOTAL LIQUIDITY ACCESSIBLE",
            position: "start",
            className: "flex flex-col",
            value: `164,687,546.67 $`,
            valueCN: "pl-2 leading-7",
          },
        },
        {
          classNames: "lg:w-[42rem]",
          logo: "/assets/icons/logos/polygon_logo.svg",
          title: "Trade",
          text: "Dexifi's trading feature provides access to all Solana network order books, with a user-friendly interface, and integrates with Openbook for the best trading experience.",
          color: "bg-[#d2691e]",
          textBottom: {
            point: true,
            size: "medium",
            order: "negative",
            title: "Live Pools",
            position: "start",
            className: "flex flex-col",
            value: `133,546`,
            valueCN: "pl-2 leading-7",
          },
        },
      ],
      position: "start",
    },
  ];

  return (
    <>
      {isClient && (
        <div className=" bg-black w-screen overflow-hidden text-left relative text-3xl text-white min-h-screen font-['Helvetica']">
          <Header isMobile={isMobile} />
          <div
            className="-top-[36rem] w-full h-screen absolute overflow-hidden"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.2),  transparent), radial-gradient(50% 50% at 50% 50%, rgba(251, 0, 196, 0) 3.49%, rgba(119, 186, 234, 0) 7.6%, rgba(253, 0, 197, 0) 10.46%, rgba(119, 186, 234, 0) 14.46%, rgba(255, 0, 199, 0) 18.56%, rgba(3, 0, 3, 0) 19.53%, transparent 79.82%, rgba(246, 0, 192, 0) 81.08%, rgba(119, 186, 234, 0) 84.04%, rgba(247, 0, 193, 0) 86.61%, rgba(119, 186, 234, 0) 91.01%, rgba(249, 0, 194, 0) 95.16%, rgba(119, 186, 234, 0) 98.6%)",
            }}
          />

          <div className="flex flex-col relative p-4 sm:p-8">
            <Backgrounds />
            {/* HOME */}
            <div className="my-0 mx-auto relative pb-24 px-3 max-w-[90vw] md:max-w-[100vw] lg:max-w-[80vw] z-10 flex flex-col justify-between">
              <div className="h-screen min-h-[1080px] justify-center mb-5 lg:mb-44 flex flex-col relative text-xl">
                {/* BG-HOME */}

                <div className="flex justify-center items-center absolute left-1/2 -translate-x-1/2 top-0 md:-mt-16 p-0 h-[1120px] w-[1202px]">
                  <img
                    src={"/assets/images/main_header-bg.png"}
                    alt={"/assets/images/main_header-bg.png"}
                    className={`left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 absolute object-contain -z-10`}
                  />

                  <img
                    className="hidden absolute md:flex w-[35%] lg:w-1/2 bottom-[45%] md:bottom-1/3 lg:bottom-[45%] xl:bottom-[40%] right-0 md:right-[4%] lg:-right-[14%]  max-w-full max-h-full aspect-video object-contain z-0"
                    alt=""
                    src="/assets/images/mockup.png"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={onComponent5Click}
                    className="overflow-hidden rounded-full w-40 h-40 aspect-square object-contain hover:bg-transparent -mt-16 z-50"
                  >
                    <Image
                      className="w-40 aspect-square object-contain"
                      alt="play_icon"
                      width={160}
                      height={160}
                      src="/assets/icons/play_icon.svg"
                    />
                  </Button>
                </div>

                {/* BG-HOME */}

                <section
                  className="w-full md:w-max flex flex-col gap-y-4 z-20"
                  style={{ textShadow: "0 1px 3px #7ac6ea" }}
                >
                  <span className="leading-normal md:leading-loose text-[2rem] md:text-5xl xl:text-6xl font-['Syne'] hyphens-auto	">
                    New Sensation of Full
                  </span>
                  <p
                    className="text-4xl md:text-5xl xl:text-6xl leading-[92%] font-thin hyphens-auto mb-8 lg:mb-16"
                    id={"main-screen-subtitle"}
                  >
                    DeFi Power
                  </p>
                </section>
                <div
                  className="leading-tight w-full lg:w-72 mb-8 text-sm md:text-lg xl:text-xl z-10"
                  style={{ textShadow: "0 1px 3px #7ac6ea" }}
                >
                  With Dexifi, you can enjoy fast and low-cost transactions,
                  making it ideal for everyday use and global remittances.
                </div>

                <Button
                  onClick={onFrameButton4Click}
                  className="py-3 cursor-pointer border-none z-10 bg-black rounded-[10px] mb-[400px] w-40 overflow-hidden transition-all lg:mb-16"
                  size="lg"
                  style={{ boxShadow: "0 0 5px #0085ff" }}
                >
                  <p
                    className={
                      "text-lg leading-6 text-white text-center m-0 font-['Helvetica']"
                    }
                    style={{ textShadow: "0 1px 3px #7ac6ea" }}
                  >
                    Read Docs
                  </p>
                </Button>

                <img
                  className={"w-44 h-8 object-cover z-10"}
                  alt=""
                  src="/assets/images/image-2@2x.png"
                />

                <span className="leading-normal text-4xl z-10 md:text-5xl xl:text-6xl font-['Syne'] mb-3">
                  A Modern Approach To Earn More
                </span>
                <div
                  className="leading-tight w-full mb-5  z-10 text-sm md:text-lg xl:text-xl"
                  style={{ textShadow: "0 1px 3px #7ac6ea" }}
                >
                  <p>
                    Modern Problems Need Modern Solutions, Invest in Dexifi and
                    take advantage of the innovative decentralized finance
                    ecosystem. Dexifi unlocks a world of decentralized
                    applications, providing users with diverse opportunities to
                    explore and engage with the decentralized finance ecosystem.
                  </p>
                </div>

                <Button
                  onClick={onFrameButton6Click}
                  className="py-3 cursor-pointer z-10 border-none bg-black rounded-[10px]  w-40 overflow-hidden transition-all lg:mb-16"
                  size="lg"
                  style={{ boxShadow: "0 0 5px #0085ff" }}
                >
                  <p
                    className={
                      "text-lg leading-6 text-white text-center m-0 font-['Helvetica']"
                    }
                    style={{ textShadow: "0 1px 3px #7ac6ea" }}
                  >
                    Read Blog
                  </p>
                </Button>
              </div>
              {/* HOME */}
              <div className="flex flex-col gap-5 pb-6 lg:pb-24 w-full max-w-[1200px] mx-auto my-0">
                {statisticsARR.map((statistic, index) => (
                  <StatisticItem
                    columns={statistic.columns}
                    position={statistic.position}
                    key={index}
                    isMobile={isMobile}
                  />
                ))}
              </div>
              {/* STATISTICS */}

              <Footer isMobile={isMobile} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
