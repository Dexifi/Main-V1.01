import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = { isMobile: boolean };

const Footer = ({ isMobile }: Props) => {
  const footerSocials = [
    {
      link: "https://github.com/Dexifi",
      icon: "/assets/icons/socials/github_logo.svg",
    },
    {
      link: "https://github.com/Dexifi",
      icon: "/assets/icons/socials/telegram_logo.svg",
    },
    {
      link: "https://github.com/Dexifi",
      icon: "/assets/icons/socials/telegram_logo.svg",
    },
    {
      link: "https://discord.gg/q4PkFEJQ",
      icon: "/assets/icons/socials/discord_logo.svg",
    },
    {
      link: "https://www.youtube.com/@Dexifi.",
      icon: "/assets/icons/socials/youtube_logo.svg",
    },
    {
      link: "https://twitter.com/DexifiFinance",
      icon: "/assets/icons/socials/twitter_logo.svg",
    },
    {
      link: "https://medium.com/@dexifi.finance",
      icon: "/assets/icons/socials/medium_logo.svg",
    },
  ];

  const footerNav = [
    {
      link: "/Dexifi Protocol Whitepaper.pdf",
      title: "Whitepaper",
    },
    {
      link: "https://dexifi-finances.gitbook.io/dexifi-blog/",
      title: "Blog",
    },
    {
      link: "https://coinmarketcap.com",
      title: "CoinMarketCap",
    },
    {
      link: "https://coingecko.com",
      title: "CoinGecko",
    },
    {
      link: "https://dexifi-finances.gitbook.io/dexifi-documentation/",
      title: "Documentation",
    },
  ];

  return (
    <footer
      className={cn(
        "rounded-3xl border border-solid border-[#e0ffff] box-border w-[40rem] overflow-hidden text-xl text-[#848895] flex justify-between py-4 px-16",
        isMobile ? "w-full box-border flex flex-col gap-4 p-2 mb-5" : ""
      )}
      style={{ boxShadow: "0 0 5px #d9f8ff" }}
    >
      <div>
        <img
          className={"w-20 object-contain aspect-square"}
          alt=""
          src="/assets/images/sitelogo-1@2x.png"
        />
        <div className="text-sm leading-5 font-thin font-['Roboto'] text-white mb-3">
          © 2023 Dexifi, Inc.
        </div>
        <div className="flex items-center gap-4">
          {footerSocials.map((social, index) => (
            <Button
              variant="ghost"
              key={`${social.icon}_${index}`}
              size="icon"
              className="hover:bg-transparent rounded-full w-8 h-8"
              style={{
                boxShadow: "0 0 4px 2px #500072",
              }}
              onClick={() => window.open(social.link)}
            >
              <img
                className="max-h-full overflow-hidden aspect-square w-full object-contain max-w-full"
                alt={social.icon}
                src={social.icon}
              />
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {footerNav.map((link, index) => (
          <Link
            href={link.link}
            key={`${link}_${index}`}
            className="leading-7 text-inherit transition-all hover:text-[#1e90ff] text-sm"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
