import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  isMobile: boolean;
};

const Header = ({ isMobile = true }: Props) => {
  const headerLinks = [
    {
      text: "Blog",
      href: "https://dexifi-finances.gitbook.io/dexifi-blog/",
    },
    {
      text: "Doc",
      href: "https://dexifi-finances.gitbook.io/dexifi-documentation/",
    },
    {
      text: " Launch App",
      href: "/dashboard",
    },
  ];

  const [isMenuActive, setMenuActive] = useState(false);

  const openMenu = () => {
    setMenuActive(true);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, []);
  return (
    <div className="flex justify-between w-full items-center bg-[rgba(5, 1, 1, 0.03)] relative z-50 lg:h-16 xl:h-20 text-2xl px-5">
      <Image
        className="w-40 h-20 aspect-[10/5] object-contain"
        alt="dexifi-full_logo"
        src="/assets/images/dexfi-full_logo.png"
        height={80}
        width={160}
      />

      <div className={`menu gap-10 ${isMenuActive ? "menuActive" : ""}`}>
        {isMobile ? (
          <div
            className={
              "flex flex-col gap-10 top-0 z-50 delay-150 transition-all max-w-[100vw] px-2"
            }
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={cn(
                `lg:block xl:hidden p-0 m-0 bg-none outline-none border-none cursor-pointer z-50 transition-all`,
                isMenuActive ? "hidden" : "block absolute right-5 top-5"
              )}
              onClick={openMenu}
            >
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
            </button>

            <button
              className={cn(
                `lg:block xl:hidden p-0 m-0 bg-none outline-none border-none cursor-pointer z-50 transition-all`,
                isMenuActive ? "block absolute right-5 top-5" : "hidden"
              )}
              onClick={closeMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="12"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#ffffff"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg>
            </button>

            <div
              id="main_menu"
              className={cn(
                "items-center gap-6 z-[51] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col hidden",
                isMenuActive && "flex"
              )}
            >
              {headerLinks.map((link, index) => (
                <Link
                  className={cn(
                    `text-md text-white hover:text-[#1e90ff] z-[52] transition-all relative main-header--menu`
                  )}
                  style={{
                    animationDuration: `${index * 0.6}s`,
                  }}
                  key={`${link.text.toLocaleLowerCase()}-${index}`}
                  href={link.href}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={cn("flex justify-between items-center gap-6 pr-14 z-50")}
          >
            {headerLinks.map((link, index) => (
              <Link
                className={cn(
                  `text-md text-white hover:text-[#1e90ff] transition-all`
                )}
                key={`${link.text.toLocaleLowerCase()}-${index}`}
                href={link.href}
              >
                {link.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
