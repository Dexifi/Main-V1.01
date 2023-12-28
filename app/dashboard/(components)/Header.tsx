"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSettingsModal } from "@/lib/stores/settings.store";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  isMobile: boolean;
};
type ActionProps = {
  image?: React.ReactNode;
  title?: string;
  click: () => void;
};

const Header = ({ isMobile }: Props) => {
  const { setVisible } = useWalletModal();
  const [menu, setMenu] = useState(false);
  const { onOpen } = useSettingsModal();
  const HeaderMenu = [
    "Dashboard",
    "Swap",
    "Trade",
    "Lend",
    "Liquidity",
    "Farm",
    "Stake",
    "IDO",
    "NFT",
  ];

  const actions: ActionProps[] = [
    {
      image: <Settings className="w-5 h-5 text-[#D9F8FF]" />,
      click: () => {
        if (menu) {
          setMenu(false);
          onOpen();
        } else {
          onOpen();
        }
      },
    },
    {
      title: "Select Wallet",
      click: () => {
        if (menu) {
          setMenu(false);
          setVisible(true);
        } else {
          setVisible(true);
        }
      },
    },
  ];

  return (
    <div className="z-[100] sticky w-full px-8 top-0 left-0 min-h-[80px] bg-[#19232D] flex justify-between items-center text-center text-lg text-white font-['Helvetica']">
      <Link href="/" className="w-14 md:w-20 aspect-square object-contain">
        <Image
          className="w-14 md:w-20 aspect-square object-contain"
          alt="dexifi-logo"
          width={56}
          height={56}
          src="/assets/images/dexifi-logo@2x.png"
        />
      </Link>

      {!isMobile ? (
        <div className="flex flex-row flex-nowrap gap-x-4">
          {HeaderMenu.map((item, index) => (
            <Link
              href={`/${
                item !== "NFT" ? item.toLocaleLowerCase() : "nft.dexifi.io"
              }`}
              className="hover:text-[#d9f8ff] transition-all cursor-pointer text-inherit text-sm md:text-lg"
              style={{
                borderBottom: `${
                  window.location.pathname === `/${item.toLocaleLowerCase()}`
                    ? "1px solid #d9f8ff"
                    : ""
                }`,
                color: `${
                  window.location.pathname === `/${item.toLocaleLowerCase()}`
                    ? "#d9f8ff"
                    : ""
                }`,
              }}
              key={index}
            >
              {item}
            </Link>
          ))}
        </div>
      ) : (
        <Sheet open={menu} onOpenChange={() => setMenu(!menu)}>
          <SheetContent className="bg-[#141414] border-none flex flex-col">
            <div className="flex flex-nowrap gap-4 flex-col py-5">
              {HeaderMenu.map((item, index) => (
                <Link
                  href={`/${
                    item !== "NFT" ? item.toLocaleLowerCase() : "nft.dexifi.io"
                  }`}
                  className="hover:text-[#d9f8ff] transition-all cursor-pointer text-inherit text-sm md:text-lg text-white pb-2"
                  style={{
                    borderBottom: `${
                      window.location.pathname ===
                      `/${item.toLocaleLowerCase()}`
                        ? "1px solid #d9f8ff"
                        : ""
                    }`,
                    color: `${
                      window.location.pathname ===
                      `/${item.toLocaleLowerCase()}`
                        ? "#d9f8ff"
                        : ""
                    }`,
                  }}
                  key={index}
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex-1" />
            <div className="w-full h-[1px] bg-[#727382] rounded-full" />
            <div className="flex justify-between items-center gap-3 flex-col">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.click}
                  size={action.image && !isMobile ? "icon" : "default"}
                  className="rounded-full hover:bg-[#D9F8FF20] flex justify-start items-center box-border gap-2 w-full"
                  style={{
                    border: "1px solid #D9F8FF",
                    boxShadow: "0 0 4px 1px rgba(217, 248, 255, 0.25)",
                  }}
                >
                  {action.image ? (
                    <>
                      {isMobile ? (
                        <>
                          {action.image}
                          <p className="text-sm leading-[.7] block text-center h-max">
                            Settings
                          </p>
                        </>
                      ) : (
                        action.image
                      )}
                    </>
                  ) : (
                    <p className="text-sm leading-[.7] block text-center h-max">
                      {action.title}
                    </p>
                  )}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}

      {!isMobile ? (
        <div className="flex justify-between items-center gap-x-6">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.click}
              size={action.image ? "icon" : "default"}
              className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border"
              style={{
                border: "1px solid #D9F8FF",
                boxShadow: "0 0 4px 1px rgba(217, 248, 255, 0.25)",
              }}
            >
              {action.image ? (
                action.image
              ) : (
                <p className="text-lg leading-[.7] block text-center h-max translate-y-1">
                  {action.title}
                </p>
              )}
            </Button>
          ))}
        </div>
      ) : (
        <Button size="icon" onClick={() => setMenu(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            viewBox="0 0 448 512"
          >
            <path
              fill="#ffffff"
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </Button>
      )}
    </div>
  );
};

export default Header;
