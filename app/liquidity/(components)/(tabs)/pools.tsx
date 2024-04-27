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
  useAddLiquidityModal,
  useRemoveLiquidityModal,
} from "@/lib/stores/liquidity.store";
import formatedString from "@/lib/string";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CreatePositionModal } from "@/components/modals";
import AddLiquidityModal from "@/components/modals/add-liquidity-modal";
import ManageModal from "@/components/modals/manage-modal";

type Props = {
  data: any;
};

const PoolsTab = ({ data }: Props) => {
  const [search, setSearch] = useState("");
  const [tokenF, setTokenF] = useState("all");
  const [protocolF, setProtocolF] = useState("all");
  const [timeF, setTimeF] = useState("all");
  const [tvlF, setTvlF] = useState("tvl");
  const [gdata, setData] = useState<any[]>([]);
  const d_data = {
    title: "List of All Active Pools in Ecosystem",
    protocol_filter: ["All", "Raydium", "Orca"],
    time_filter: ["All", "AMM", "CLMM"],
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
      "Volume",
      "Fee",
      "APR",
    ],
  };

  const { onAddLiquidityOpen } = useAddLiquidityModal();
  const { onRemoveLiquidityOpen } = useRemoveLiquidityModal();
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
            protocol_sub: "AMM",
            protocol_tvl: 47650000,
            protocol_tvl_icon: "/assets/images/raydiumraycoin-1@2x.png",
            pool_liq: 12650000,
            volume: 2650000,
            fee: 0.5,
            apr: 65.64,
            value: 100000.66,
            lp_tokens: 15354.65,
            your_share: 0.01,
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
          <div className="flex justify-between items-start xl:items-center gap-4 w-full flex-col lg:flex-row">
            <div className="flex flex-col max-w-md w-full gap-4">
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
            <div className="flex flex-col flex-1 gap-2 sm:gap-4 justify-start xl:justify-end">
              <div className="flex justify-start lg:justify-end w-full items-center gap-2 sm:gap-4 flex-wrap">
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
                  {d_data.time_filter.map((item, index) => (
                    <Button
                      key={`${item}-${index}--protocol-filter`}
                      className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                      style={{
                        boxShadow:
                          formatedString(item).toLocaleLowerCase() === timeF
                            ? "0 0 4px #88d6ff"
                            : "none",
                      }}
                      onClick={() => {
                        const value = formatedString(item).toLocaleLowerCase();

                        if (value !== timeF) {
                          setTimeF(value);
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
              </div>
              <div className="flex justify-start lg:justify-end w-full items-center gap-4">
                <div className="flex justify-between items-center gap-1 bg-[#D9F8FF10] rounded-full w-max">
                  {d_data.token_filter.map((item, index) => (
                    <Button
                      key={`${item.name}-${index}--token-filter`}
                      className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                      style={{
                        boxShadow:
                          formatedString(item.name).toLocaleLowerCase() ===
                          tokenF
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
                      <div className="flex flex-col gap-2">
                        <span className="text-sm text-[#d9f8ff]">
                          {row.symbol}
                        </span>
                        <div className="flex items-center mt-2 w-max gap-4">
                          {row.pool_logos.map((icon: any, id: number) => (
                            <Image
                              src={icon}
                              alt={`${row.symbol}_logo-icon`}
                              className="aspect-square object-contain w-9 h-9"
                              width={36}
                              height={36}
                              key={id}
                            />
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">{row.protocol}</span>
                        <div className="min-h-[36px] flex items-end">
                          <span className="text-xl">{row.protocol_sub}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          ${formatedNumber(row.protocol_tvl, 2, true)}
                        </span>
                        <Button
                          size="sm"
                          className="max-w-[150px] text-xs rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                          onClick={onAddLiquidityOpen}
                          style={{
                            boxShadow: "0 0 4px #88d6ff",
                          }}
                        >
                          Add Liquidity
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          ${formatedNumber(row.pool_liq, 2, true)}
                        </span>
                        <span className="text-sm">
                          Value: ${formatedNumber(row.value, 2, true)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          ${formatedNumber(row.volume, 2, true)}
                        </span>
                        <span className="text-sm">
                          LP Tokens: {formatedNumber(row.lp_tokens, 2, true)} LP
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          ${formatedNumber(row.fee, 2, false)}
                        </span>
                        <span className="text-sm">
                          Your share: {formatedNumber(row.your_share, 2, false)}
                          %{" <"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          {formatedNumber(row.apr, 2, true)}%
                        </span>
                        <Button
                          size="sm"
                          className="max-w-[150px] text-xs rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                          style={{
                            boxShadow: "0 0 4px #88d6ff",
                          }}
                          onClick={onRemoveLiquidityOpen}
                        >
                          Remove Liquidity
                        </Button>
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
              </TableRow>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PoolsTab;
