import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatedNumber from "@/lib/numbers";
import {
  useClaimPendingModal,
  useRemoveFarmModal,
} from "@/lib/stores/farm.store";
import formatedString from "@/lib/string";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  data: any;
};

const PoolsTab = ({ data }: Props) => {
  const [search, setSearch] = useState("");
  const [tokenF, setTokenF] = useState("all");
  const [protocolF, setProtocolF] = useState("all");
  const [tvlF, setTvlF] = useState("tvl");
  const [gdata, setData] = useState<any[]>([]);
  const d_data = {
    title: "List of All Active Farm Pools in Ecosystem",
    protocol_filter: ["All", "Raydium", "Orca"],
    tvl_filter: ["TVL", "APR"],
    token_filter: [
      {
        name: "All",
      },
      {
        icon: "/assets/images/solana-1@2x.png",
        name: "SOL",
      },
      {
        icon: "/assets/images/solana-1@2x.png",
        name: "mSOL",
      },
    ],

    headers: [
      "Pool",
      "Protocol",
      "Protocol TVL",
      "Pool Liquidity",
      "Reward",
      "APR",
    ],
  };

  const { onRemoveFarmOpen } = useRemoveFarmModal();
  const { onClaimPendingOpen } = useClaimPendingModal();

  useEffect(() => {
    gdata.length <= 0 &&
      setTimeout(() => {
        setData([
          {
            address: "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q",
            symbol: "SOL-USDC",
            pool_logos: [
              "/assets/images/raydiumraycoin-1@2x.png",
              "/assets/images/raydiumraycoin-1@2x.png",
            ],
            protocol: "Raydium",
            protocol_icon: "/assets/images/raydiumraycoin-1@2x.png",
            protocol_tvl: 47650000,
            protocol_tvl_icon: "/assets/images/raydiumraycoin-1@2x.png",
            pool_liq: 12650000,
            reward: "Ray",
            apr: 65.64,
            action: "Add Liquidity",
          },
          {
            address: "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q",
            symbol: "SOL-USDC",
            pool_logos: [
              "/assets/images/raydiumraycoin-1@2x.png",
              "/assets/images/raydiumraycoin-1@2x.png",
            ],
            protocol: "Raydium",
            protocol_icon: "/assets/images/raydiumraycoin-1@2x.png",
            protocol_tvl: 47650000,
            protocol_tvl_icon: "/assets/images/raydiumraycoin-1@2x.png",
            pool_liq: 12650000,
            reward: "Ray",
            apr: 65.64,
            action: "Deposit LP Token",
            deposit_value: 100004,
            lp_tokens: 56542.51,
            pending: 519.51,
          },
        ]);
      }, 5000);
  }, [gdata]);

  return (
    <div className="w-full flex flex-wrap justify-between gap-5 my-5 flex-col md:flex-row">
      <div
        className="order-10 md:-order-10 flex flex-col justify-start items-start gap-y-5 flex-1 bg-[#19232d] rounded-3xl px-5 lg:px-10 py-5 max-w-full"
        style={{ boxShadow: "0 0 4px #88d6ff" }}
      >
        <div className="flex flex-col w-full py-4 gap-4">
          <div className="flex justify-start items-center w-full">
            <h6 className="text-lg md:text-2xl text-[#d9f8ff]">
              {d_data.title}
            </h6>
          </div>
          <div className="flex justify-between items-start xl:items-center gap-4 w-full flex-col">
            <div className="flex w-full items-center justify-between flex-wrap sm:flex-nowrap gap-4">
              <label className="text-sm text-[#7c7c8d] w-full">
                Earn yield on trading fees by providing liquidity
              </label>
              <Input
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);
                }}
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-[#d9f8ff] w-full rounded-xl max-w-xs"
              />
            </div>
            <div className="flex justify-start lg:justify-between w-full items-center gap-2 sm:gap-4 flex-wrap">
              <div className="flex justify-between items-center gap-1 bg-[#D9F8FF10] rounded-full">
                {d_data.protocol_filter.map((item, index) => (
                  <Button
                    key={`${item}-${index}--protocol-filter`}
                    className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                    style={{
                      boxShadow:
                        formatedString(item).toLocaleLowerCase() === protocolF
                          ? "0 0 4px #88d6ff"
                          : "none",
                    }}
                    onClick={() => {
                      const value = formatedString(item).toLocaleLowerCase();

                      if (value !== protocolF) {
                        setProtocolF(value);
                      }
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between items-center gap-1 bg-[#D9F8FF10] rounded-full">
                {d_data.tvl_filter.map((item, index) => (
                  <Button
                    key={`${item}-${index}--protocol-filter`}
                    className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                    style={{
                      boxShadow:
                        formatedString(item).toLocaleLowerCase() === tvlF
                          ? "0 0 4px #88d6ff"
                          : "none",
                    }}
                    onClick={() => {
                      const value = formatedString(item).toLocaleLowerCase();

                      if (value !== tvlF) {
                        setTvlF(value);
                      }
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between items-center gap-1 bg-[#D9F8FF10] rounded-full w-max">
                {d_data.token_filter.map((item, index) => (
                  <Button
                    key={`${item.name}-${index}--token-filter`}
                    className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                    style={{
                      boxShadow:
                        formatedString(item.name).toLocaleLowerCase() === tokenF
                          ? "0 0 4px #88d6ff"
                          : "none",
                    }}
                    onClick={() => {
                      const value = formatedString(
                        item.name
                      ).toLocaleLowerCase();

                      if (value !== tokenF) {
                        setTokenF(value);
                      }
                    }}
                  >
                    {!!item.icon && (
                      <>
                        {item.icon ? (
                          <Image
                            src={item.icon}
                            alt={`${item.name}-logo / lend`}
                            width={20}
                            height={20}
                            className="w-5 h-5 aspect-square object-contain"
                          />
                        ) : (
                          <Skeleton className="w-5 h-5 aspect-square object-contain" />
                        )}
                      </>
                    )}
                    <span className="text-xs sm:text-sm">{item.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-full bg-[#142030] p-4 rounded-2xl px-5 min-h-[50dvh]"
          style={{
            boxShadow: "0 0 5px 1px #d9f8ff",
          }}
        >
          <Table className="w-full flex-1 mt-2 overflow-scroll">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {d_data.headers.map((header, index) => (
                  <>
                    <TableHead
                      key={`${formatedString(
                        header.toLocaleLowerCase()
                      )}_${index}`}
                      className="text-sm md:text-md truncate max-w-[110px] pl-0"
                      align="left"
                    >
                      {header}
                    </TableHead>
                  </>
                ))}

                <TableHead
                  className="text-sm md:text-md truncate max-w-[110px] pl-0"
                  align="left"
                />
              </TableRow>
            </TableHeader>
            {gdata.length > 0 ? (
              <TableBody>
                {gdata.slice(0, 60).map((row: any, index) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d]"
                    key={`${formatedString(
                      row.address.toLocaleLowerCase()
                    )}_${index}`}
                  >
                    <TableCell className="font-medium text-left py-2 pl-0">
                      <div className="flex flex-col gap-2 min-w-36 max-w-36">
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-[#d9f8ff]">
                            {row.symbol}
                          </span>
                          <div className="flex items-center w-max gap-2">
                            {row.pool_logos.map((icon: any, id: number) => (
                              <Image
                                src={icon}
                                alt={`${row.symbol}_logo-icon`}
                                className="aspect-square object-contain w-6 h-6 "
                                width={24}
                                height={24}
                                key={id}
                              />
                            ))}
                          </div>
                        </div>

                        {row.deposit_value ? (
                          <div className="flex gap-2 items-center text-[#7c7c8d]">
                            <span className="text-sm">Deposit Value:</span>
                            <span className="text-sm">
                              {formatedNumber(row.deposit_value, 1, true)}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center">
                          <span className="text-sm">{row.protocol}</span>

                          <Image
                            src={row.protocol_icon}
                            alt={`${row.protocol}_logo-icon`}
                            className="aspect-square object-contain w-6 h-6 "
                            width={24}
                            height={24}
                          />
                        </div>
                        {row.lp_tokens ? (
                          <div className="flex gap-2 items-center text-[#7c7c8d]">
                            <span className="text-sm">
                              {formatedNumber(row.lp_tokens, 1, true)}LP
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          ${formatedNumber(row.protocol_tvl, 2, true)}
                        </span>
                        {row.pending ? (
                          <div className="flex gap-2 items-center text-[#7c7c8d]">
                            <span className="text-sm">Pending Yield:</span>
                            <span className="text-sm">
                              ${formatedNumber(row.pending, 1, true)}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          ${formatedNumber(row.pool_liq, 2, true)}
                        </span>
                        {row.pending ? (
                          <Button
                            size="sm"
                            className="max-w-32 max-h-7 text-xs rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                            style={{
                              boxShadow: "0 0 4px #88d6ff",
                            }}
                            onClick={onClaimPendingOpen}
                          >
                            Claim Pending
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          {row.reward.toLocaleUpperCase()}
                        </span>
                        {row.pending ? (
                          <Button
                            size="sm"
                            className="max-w-32 max-h-7 text-xs rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                            style={{
                              boxShadow: "0 0 4px #88d6ff",
                            }}
                            onClick={onRemoveFarmOpen}
                          >
                            Remove Farm
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          {formatedNumber(row.apr, 2, false)}%
                        </span>
                        {row.pending ? (
                          <div className="flex gap-2 items-center text-[#7c7c8d] min-h-7" />
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        {formatedString(row.action).toLocaleLowerCase() ===
                        "add_liquidity" ? (
                          <Button
                            size="sm"
                            className="max-w-[150px] text-xs rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                            style={{
                              boxShadow: "0 0 4px #88d6ff",
                            }}
                          >
                            Add Liquidity
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="max-w-[150px] text-xs rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                            style={{
                              boxShadow: "0 0 4px #88d6ff",
                            }}
                          >
                            Deposit LP Token
                          </Button>
                        )}
                        {row.pending ? (
                          <div className="flex gap-2 items-center text-[#7c7c8d] min-h-7" />
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                {d_data.headers.map((header, index) => (
                  <TableCell
                    className="font-medium text-left text-[#7c7c8d] py-2 pl-0"
                    key={`${header}_skeleton_${index}`}
                  >
                    <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                  </TableCell>
                ))}
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2 pl-0">
                  <Skeleton className="w-full h-6 bg-[#7c7c8d] min-w-40" />
                </TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PoolsTab;
