import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import formatedNumber from "@/lib/numbers";
import formatedString from "@/lib/string";
import { CheckCircle, XCircle } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  isEXTRASMALL: boolean;
};

const IDOPBody = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<any[]>([]);

  const d_data = {
    texts: [
      "The Nirvana protocol is a twin system that produces $ANA, a volatile token with an algorithmically rising floor price, as well as $NIRV, a decentralized superstable coin with a delegated peg.",
      "Nirvana’s virtual AMM enables the minting of ANA from a diverse set of trusted stablecoin options. ANA’s price is free to appreciate, but the minimum floor price rises algorithmically as stablecoin reserves increase.",
      "Zero liquidation-risk loans of the superstable NIRV token can be taken by staking ANA. Loans have a negative interest rate by virtue of prANA reward emissions, meaning users earn yield on debt.",
      "Yield for staking ANA and taking NIRV loans is distributed in prANA (pre-ANA), which are tokens that act as non-expiring options to mint ANA at its floor price.",
    ],
    socials: [
      {
        icon: "/assets/icons/socials/github_logo.svg",
        id: "github_logo",
        link: "#",
      },
      {
        icon: "/assets/icons/socials/telegram_logo.svg",
        id: "telegram_logo",
        link: "#",
      },
      {
        icon: "/assets/icons/socials/discord_logo.svg",
        id: "discord_logo",
        link: "#",
      },
      {
        icon: "/assets/icons/socials/youtube_logo.svg",
        id: "youtube_logo",
        link: "#",
      },
      {
        icon: "/assets/icons/socials/medium_logo.svg",
        id: "medium_logo",
        link: "#",
      },
      {
        icon: "/assets/icons/socials/twitter_logo.svg",
        id: "twitter_logo",
        link: "#",
      },
    ],
    tikets: ["/assets/images/tikets.png"],
    lucky_numbers: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "22",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "34",
      "35",
      "36",
    ],
    token: {
      symbol: "USDC",
      icon: "/assets/images/solana-1@2x.png",
    },

    your_tickets: [
      { value: 100001, status: "active" },
      { value: 100002, status: "active" },
      { value: 100003, status: "active" },
      { value: 100004, status: "active" },
      { value: 100005, status: "active" },
      { value: 100006, status: "active" },
      { value: 100007, status: "active" },
      { value: 100008, status: "active" },
      { value: 100009, status: "active" },
      { value: 100010, status: "active" },
      { value: 100011, status: "active" },
      { value: 100012, status: "active" },
      { value: 100013, status: "active" },
      { value: 100014, status: "active" },
      { value: 100015, status: "active" },
      { value: 100016, status: "active" },
      { value: 100017, status: "active" },
      { value: 100018, status: "active" },
      { value: 100019, status: "active" },
      { value: 100020, status: "active" },
      { value: 100021, status: "active" },
      { value: 100022, status: "active" },
      { value: 100023, status: "active" },
      { value: 100024, status: "active" },
      { value: 100025, status: "active" },
      { value: 100026, status: "active" },
      { value: 100027, status: "active" },
      { value: 100028, status: "active" },
      { value: 100029, status: "active" },
      { value: 100030, status: "active" },
      { value: 100031, status: "active" },
      { value: 100032, status: "active" },
      { value: 100033, status: "active" },
      { value: 100034, status: "active" },
      { value: 100035, status: "active" },
      { value: 100036, status: "unactive" },
      { value: 100037, status: "unactive" },
      { value: 100038, status: "unactive" },
      { value: 100039, status: "unactive" },
      { value: 100040, status: "unactive" },
      { value: 100041, status: "unactive" },
      { value: 100042, status: "unactive" },
      { value: 100043, status: "unactive" },
      { value: 100044, status: "unactive" },
      { value: 100045, status: "unactive" },
      { value: 100046, status: "unactive" },
      { value: 100047, status: "unactive" },
      { value: 100048, status: "unactive" },
      { value: 100049, status: "unactive" },
      { value: 100050, status: "unactive" },
      { value: 100051, status: "unactive" },
      { value: 100052, status: "unactive" },
      { value: 100053, status: "unactive" },
      { value: 100054, status: "unactive" },
      { value: 100055, status: "unactive" },
      { value: 100056, status: "unactive" },
      { value: 100057, status: "unactive" },
      { value: 100058, status: "unactive" },
      { value: 100059, status: "unactive" },
      { value: 100060, status: "unactive" },
      { value: 100061, status: "unactive" },
      { value: 100062, status: "unactive" },
      { value: 100063, status: "unactive" },
      { value: 100064, status: "unactive" },
      { value: 100065, status: "unactive" },
      { value: 100066, status: "unactive" },
    ],
  };

  useEffect(() => {
    gdata.length <= 0 &&
      setTimeout(() => {
        setData([
          { text: "Prismatic", title: "PRM" },
          { title: "Total Raise", value: 3000000, currency: "PRM" },
          { text: moment().format("YYYY-MM-DD, HH:MM"), title: "Pool Open" },
          { title: "Ticket Raise", value: 233 },
          {
            text: moment().format("YYYY-MM-DD, HH:MM"),
            title: "Trade Available From",
          },
          {
            title: "Per DXE",
            value: 0.000012,
            f_currency: "$",
          },
          {
            title: "Allocation / Winning Ticket",
            value: 1,
            f_currency: "$",
          },
          { text: moment().format("YYYY-MM-DD, HH:MM"), title: "Pool Close" },
          { title: "Max Winners", value: 23 },
          { title: "Status", text: "Open" },
        ]);
      }, 5000);
  }, []);

  return (
    <div className="z-50 static py-5 flex flex-col gap-5 items-center w-full">
      <div
        className="w-full bg-[#142030] p-4 rounded-2xl px-4 sm:px-7 flex-1 overflow-auto"
        style={{
          boxShadow: "0 0 5px 1px #d9f8ff",
        }}
      >
        <div className="flex flex-nowrap justify-between items-start flex-col sm:flex-row gap-4">
          <div className="flex gap-4 flex-wrap flex-col md:flex-row">
            <div className="flex items-center min-h-max md:min-h-24">
              {gdata.length > 0 ? (
                <Image
                  alt={`DXE-logo / lend`}
                  src="/assets/images/dexifi-logo@2x.png"
                  width={96}
                  height={96}
                  className="w-12 md:w-24 h-12 md:h-24 aspect-square object-contain rounded-sm"
                />
              ) : (
                <Skeleton className="w-24 h-24 aspect-square object-contain bg-slate-600" />
              )}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {gdata.length === 0 ? (
                <>
                  {[...new Array(10)].map((_, index) => (
                    <div
                      key={`${index}-preload/gdata--ido-pool`}
                      className="flex flex-col gap-2 w-full h-12 min-w-48"
                    >
                      <Skeleton className="w-full h-6 bg-slate-600" />
                      <Skeleton className="w-3/4 h-6 bg-slate-600" />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {gdata.map((row, index) => (
                    <div
                      className="flex flex-col gap-2"
                      key={`${formatedString(
                        row.title
                      ).toLocaleLowerCase()}-data--ido/pool-${index}`}
                    >
                      <span className="text-xs sm:text-sm text-[#d9f8ff]">
                        {row.title}
                      </span>
                      {row.text ? (
                        <span className="text-xs sm:text-sm text-[#757788]">
                          {row.text}
                        </span>
                      ) : null}
                      {row.value ? (
                        <span className="flex gap-1 flex-nowrap text-xs sm:text-sm text-[#757788]">
                          <span>{row.f_currency}</span>
                          <span>
                            {formatedString(row.title).toLocaleLowerCase() ===
                            "per_dxe"
                              ? formatedNumber(row.value, 5, false)
                              : formatedString(
                                  row.title
                                ).toLocaleLowerCase() === "max_winners" ||
                                formatedString(
                                  row.title
                                ).toLocaleLowerCase() === "ticket_raise"
                              ? formatedNumber(row.value, 0, true)
                              : formatedNumber(row.value, 2, isEXTRASMALL)}
                          </span>
                          <span>{row.currency}</span>
                        </span>
                      ) : null}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="flex gap-4 flex-wrap justify-end">
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-2 min-h-max">
                <span className="text-sm text-[#d9f8ff]">ROI (ATH)</span>
                <span className="text-sm text-[#3efff3]">
                  {formatedNumber(734, 2, false)}%
                </span>
              </div>
              <div className="flex flex-col gap-2 min-h-max">
                <span className="text-sm text-[#d9f8ff]">Pool Fill up</span>
                <div className="flex justify-center items-center border-2 border-[#5155ff] p-2 rounded-xl">
                  <span className="text-sm md:text-xl font-bold text-[#5155ff]">
                    {formatedNumber(532, 0, true)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex justify-center items-center">
              {gdata.length > 0 ? (
                <Image
                  alt={`DXE-logo / lend`}
                  src="/assets/images/ido.png"
                  width={96}
                  height={96}
                  className="w-24 h-24 aspect-square object-contain rounded-sm"
                />
              ) : (
                <Skeleton className="w-24 h-24 aspect-square object-contain bg-slate-600" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full bg-[#142030] p-4 rounded-2xl px-4 sm:px-7 flex-1 flex gap-4 flex-wrap"
        style={{
          boxShadow: "0 0 5px 1px #d9f8ff",
        }}
      >
        <div className="flex flex-col flex-1 w-full flex-wrap">
          <div className="flex flex-col gap-4 w-full">
            {gdata.length > 0 ? (
              <Image
                src="/assets/images/project_banner.png"
                alt="project-banner"
                width={1024}
                height={202}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <Skeleton className="min-w-[1024px] w-full h-52 bg-slate-400" />
            )}
            <div className="flex justify-between items-center">
              <h5 className="text-sm md:text-xl text-[#d9f8ff] font-semibold">
                Project Detail
              </h5>
              <Button
                href="https://www.dexifi.io"
                className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-xs md:text-sm"
                style={{
                  boxShadow: "0 0 4px #88d6ff",
                }}
              >
                How to Participate
              </Button>
            </div>
            <div className="flex flex-col gap-2 ">
              {gdata.length > 0 ? (
                <>
                  {d_data.texts.map((text, index) => (
                    <p
                      key={index}
                      className="text-xs sm:text-sm md:text-lg text-[#acacc1]"
                    >
                      {text}
                    </p>
                  ))}
                </>
              ) : (
                <Skeleton className="min-w-[1200px] w-full h-full min-h-60 bg-slate-400" />
              )}
            </div>
            <div className="flex justify-between items-center flex-wrap sm:flex-nowrap gap-4">
              <Button
                href="https://www.nft.dexifi.io"
                className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-xs md:text-sm"
                style={{
                  boxShadow: "0 0 4px #88d6ff",
                }}
              >
                Project Website
              </Button>
              <div className="flex w-full justify-between sm:justify-end items-center gap-0 sm:gap-2">
                {d_data.socials.map((social, index) => (
                  <Button
                    key={index}
                    size="icon"
                    href={social.link}
                    className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 min-w-max md:min-w-9 min-h-max md:min-h-9 p-0 text-xs md:text-sm"
                  >
                    <Image
                      src={social.icon}
                      alt={`${social.id}/ido`}
                      width={36}
                      height={36}
                      className="w-6 sm:w-9 h-6 sm:h-9 aspect-square object-contain"
                    />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-w-sm w-full flex-col mx-auto gap-4">
          <div
            className="flex flex-col gap-4 bg-[#0e121b] p-4 h-max rounded-xl w-full"
            style={{ boxShadow: "0px 0px 5px 0px rgba(217, 248, 255, 0.5)" }}
          >
            {gdata.length > 0 ? (
              <h6 className="text-sm text-[#757788]">Lucky Ending Numbers</h6>
            ) : (
              <Skeleton className="min-w-80 w-full h-6 bg-slate-400" />
            )}
            {gdata.length > 0 ? (
              <div className="flex flex-wrap gap-1 text-sm text-[#d9f8ff] font-semibold">
                {d_data.lucky_numbers.map((lucky, index) => (
                  <span key={`${lucky}_${index}-lucky-number/ido`}>
                    {lucky}
                    {index !== d_data.lucky_numbers.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
            ) : (
              <Skeleton className="min-w-80 w-full h-20 bg-slate-400" />
            )}
          </div>
          <div
            className="flex flex-col gap-4 bg-[#0e121b] p-4 h-max rounded-xl w-full"
            style={{ boxShadow: "0px 0px 5px 0px rgba(217, 248, 255, 0.5)" }}
          >
            {gdata.length > 0 ? (
              <div className="flex justify-between items-center">
                <h6 className="text-sm text-[#d9f8ff]">Tickets</h6>
                <div className="text-sm text-[#757788] flex gap-2">
                  <span>Eligible tickets:</span>
                  <span>{formatedNumber(d_data.tikets.length, 0, true)}</span>
                </div>
              </div>
            ) : (
              <Skeleton className="min-w-80 w-full h-6 bg-slate-400" />
            )}
            {gdata.length > 0 ? (
              <div className="flex flex-nowrap items-center gap-2 text-sm text-[#d9f8ff] font-semibold">
                {d_data.tikets.map((tiket, index) => (
                  <span key={`${tiket}_${index}-tiket-number/ido`}>
                    {gdata ? (
                      <Image
                        alt={`ticket-${index} / ido`}
                        src={tiket}
                        width={64}
                        height={64}
                        className="w-16 h-16 aspect-square object-contain rounded-sm"
                      />
                    ) : (
                      <Skeleton className="w-16 h-16 aspect-square object-contain bg-slate-600" />
                    )}
                  </span>
                ))}

                <Button
                  className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-max bg-transparent text-sm"
                  style={{
                    boxShadow: "0 0 4px #88d6ff",
                  }}
                >
                  Max
                </Button>
                <Input
                  value={d_data.tikets.length}
                  readOnly
                  type="number"
                  placeholder="Amount"
                  className="bg-transparent outline-none text-[#d9f8ff] flex-1 rounded-xl"
                />
              </div>
            ) : (
              <Skeleton className="min-w-80 w-full h-20 bg-slate-400" />
            )}
          </div>
          <div
            className="flex flex-col gap-4 bg-[#0e121b] p-4 h-max rounded-xl w-full"
            style={{ boxShadow: "0px 0px 5px 0px rgba(217, 248, 255, 0.5)" }}
          >
            {gdata.length > 0 ? (
              <div className="flex justify-between items-center">
                <h6 className="text-sm text-[#d9f8ff]">Deposit</h6>
                <div className="text-sm text-[#757788] flex gap-2">
                  <span>Balance:</span>
                  <span>{formatedNumber(0, 0, true)}</span>
                </div>
              </div>
            ) : (
              <Skeleton className="min-w-80 w-full h-6 bg-slate-400" />
            )}
            {gdata.length > 0 ? (
              <div className="flex flex-nowrap items-center gap-2 text-sm text-[#d9f8ff] font-semibold">
                <div
                  className="flex gap-4 flex-nowrap py-2 px-4 rounded-full justify-center items-center box-border w-max bg-transparent text-sm"
                  style={{
                    boxShadow: "0 0 4px #88d6ff",
                  }}
                >
                  <Image
                    src={d_data.token.icon}
                    alt={`${d_data.token.symbol}-logo/ido-pool`}
                    width={24}
                    height={24}
                    className="w-6 h-6 aspect-square object-contain"
                  />
                  <span>{d_data.token.symbol}</span>
                </div>
                <Input
                  value={d_data.tikets.length}
                  readOnly
                  type="number"
                  placeholder="Amount"
                  className="bg-transparent outline-none text-[#d9f8ff] flex-1 rounded-xl"
                />
              </div>
            ) : (
              <Skeleton className="min-w-80 w-full h-20 bg-slate-400" />
            )}
          </div>
          <Button
            className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-sm"
            style={{
              boxShadow: "0 0 4px #88d6ff",
            }}
            disabled={gdata.length === 0}
          >
            Deposit
          </Button>
          <div
            className="flex flex-col gap-4 bg-[#0e121b] p-4 h-max rounded-xl w-full"
            style={{ boxShadow: "0px 0px 5px 0px rgba(217, 248, 255, 0.5)" }}
          >
            {gdata.length > 0 ? (
              <div className="flex justify-between items-center">
                <h6 className="text-sm text-[#d9f8ff]">Your Can Claim</h6>
              </div>
            ) : (
              <Skeleton className="min-w-80 w-full h-6 bg-slate-400" />
            )}
            <div className="flex flex-col items-end gap-2 text-sm text-[#d9f8ff] font-semibold">
              {gdata.length > 0 ? (
                <span>{formatedNumber(65.542, 2, isEXTRASMALL)} USDC</span>
              ) : (
                <Skeleton className="w-full h-4 bg-slate-400" />
              )}
              {gdata.length > 0 ? (
                <span>{formatedNumber(1561451, 2, isEXTRASMALL)} PRM</span>
              ) : (
                <Skeleton className="w-full h-4 bg-slate-400" />
              )}
            </div>
          </div>
          <Button
            className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent text-sm"
            style={{
              boxShadow: "0 0 4px #88d6ff",
            }}
            disabled={gdata.length === 0}
          >
            Claim Tokens
          </Button>
        </div>

        <div
          className="w-full flex bg-[#0e121b] py-4 px-6 rounded-xl min-h-56 flex-col md:flex-row gap-4"
          style={{ boxShadow: "0 0 5px rgba(217, 248, 255, 0.5)" }}
        >
          <div className="flex flex-col max-w-[180px] w-full gap-6 justify-between max-h-48">
            <div className="flex flex-col gap-2">
              <h6 className="text-sm md:text-lg text-[#d9f8ff]">
                Your Tickets
              </h6>
              <div className="text-xs md:text-sm text-[#d9f8ff] flex gap-2">
                {gdata.length > 0 ? (
                  <>{formatedNumber(d_data.your_tickets.length, 0, true)}</>
                ) : (
                  <Skeleton className="w-full max-w-10 h-6 bg-slate-400" />
                )}
                <span>Tickets</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="text-xs md:text-sm text-[#d9f8ff]">Your Won</h6>
              {gdata.length > 0 ? (
                <span className="text-xs md:text-sm text-green-500 font-semibold">
                  {formatedNumber(
                    d_data.your_tickets.filter(
                      (item) =>
                        formatedString(item.status).toLocaleLowerCase() ===
                        "active"
                    ).length,
                    0,
                    true
                  )}
                </span>
              ) : (
                <Skeleton className="w-full max-w-10 h-4 bg-slate-400" />
              )}
            </div>
          </div>
          <div className="flex flex-1 gap-2 w-full flex-wrap">
            {d_data.your_tickets.map((ticket, id) => (
              <div
                key={`${ticket.value}-${ticket.status}-${id}`}
                className="flex items-center gap-1 sm:gap-2 text-xs md:text-sm text-white px-2 py-1 bg-[#202d3a] rounded-lg"
              >
                {ticket.status === "active" ? (
                  <CheckCircle className="w-4 h-4 aspect-square object-contain text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 aspect-square object-contain text-red-500" />
                )}
                {ticket.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDOPBody;
