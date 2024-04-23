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
import { useCallback, useEffect, useState } from "react";
import { useLiquidity } from "@/applications/Liquidity/store";
import { CircularProgress, Stack } from "@mui/material";
import { debounce } from "lodash";
import { RaydiumPools } from "@/applications/Liquidity/pool";

const PoolsTab = () => {
  const [search, setSearch] = useState("");
  const [tokenF, setTokenF] = useState("all");
  const [protocolF, setProtocolF] = useState("all");
  const [tvlF, setTvlF] = useState("tvl");
  const ammPools = useLiquidity((state) => state.ammPools);
  const userAmmDeposits = useLiquidity((state) => state.userAmmDeposits);
  const raydiumInfo = useLiquidity((state) => state.raydiumInfo);
  const poolApiConfig = useLiquidity((state) => state.poolApiConfig);
  const setPoolConfig = useLiquidity((state) => state.setPoolApiConfig);
  const d_data = {
    title: "List of All Active Pools in Ecosystem",
    protocol_filter: ["All", "Raydium", "Orca"],
    time_filter: ["All", "Standard", "Concentrated"],
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

  const onScroll = async () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      await RaydiumPools.fetchNextPage();
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const debouncedSearch = (id: string) => {
    setSearch(id);
    debounce(async () => {
      if (id) {
        await RaydiumPools.fetchPoolById(id, true);
      } else {
        await RaydiumPools.fetchNextPage();
      }
    }, 500)();
  };

  const handleChangeFilter = useCallback(
    async (type: "all" | "standard" | "concentrated") => {
      if (type !== poolApiConfig.type) {
        console.log("here", type, poolApiConfig.type);
        setPoolConfig({
          pageSize: 100,
          currentPage: 0,
          type: type,
        });
        await RaydiumPools.fetchNextPage();
      }
    },
    [poolApiConfig, setPoolConfig]
  );

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
                onChange={(e) => debouncedSearch(e.target.value)}
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
                          item.toLocaleLowerCase() === poolApiConfig.type
                            ? "0 0 4px #88d6ff"
                            : "none",
                      }}
                      onClick={() => {
                        handleChangeFilter(
                          item.toLocaleLowerCase() as
                            | "all"
                            | "standard"
                            | "concentrated"
                        );
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
                    >
                      {!!item.icon && (
                        <>
                          {item.icon ? (
                            <img
                              src={item.icon}
                              alt={`${item.name}-logo / lend`}
                              width={20}
                              height={20}
                              className="w-5 h-5 aspect-square rounded-full object-contain"
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
          className="w-full bg-[#142030] p-4 rounded-2xl px-5  "
          style={{
            boxShadow: "0 0 5px 1px #d9f8ff",
          }}
        >
          <Table className="w-full flex-1 mt-2  overflow-scroll">
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
            {ammPools.length > 0 ? (
              <TableBody className={"h-20 overflow-hidden "}>
                {ammPools?.map((row, index) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d]"
                    key={`${formatedString(
                      row?.id?.toLocaleLowerCase()
                    )}_${index}`}
                  >
                    <TableCell className="font-medium text-left py-2 pl-0">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm max-w-32  text-nowrap overflow-hidden text-[#d9f8ff]">
                          {row.mintA.symbol + " / " + row.mintB.symbol}
                        </span>
                        <div className="flex items-center mt-2 w-max">
                          {row.mintA.logoURI ? (
                            <img
                              src={row.mintA.logoURI}
                              alt={`${row.mintA.symbol}_logo-icon`}
                              className="aspect-square object-contain rounded-full w-9 h-9"
                              width={36}
                              height={36}
                            />
                          ) : (
                            <Stack className="rounded-full w-9 h-9 bg-[#303030]" />
                          )}
                          {row.mintB.logoURI ? (
                            <img
                              src={row.mintB.logoURI}
                              alt={`${row.mintB.symbol}_logo-icon`}
                              className="aspect-square object-contain rounded-full w-9 h-9"
                              width={36}
                              height={36}
                            />
                          ) : (
                            <Stack className="rounded-full w-9 h-9 bg-[#303030]" />
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-32">
                      <div className="flex flex-col gap-2">
                        <span className="text-lg">Raydium</span>
                        <div className="flex items-end">
                          <span className="text-lg">{row.type}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          ${formatedNumber(raydiumInfo.tvl, 2, true)}
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
                          ${formatedNumber(row.tvl, 2, true)}
                        </span>
                        <span className="text-sm">
                          {/* TODO */}
                          Value: $
                          {formatedNumber(
                            userAmmDeposits?.find((e) => e.ammId === row.id)
                              ?.amount ?? 0,
                            0,
                            true
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-44">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          ${formatedNumber(row.day.volume, 2, true)}
                        </span>
                        <span className="text-sm">
                          {/* TODO */}
                          LP Tokens: {formatedNumber(4, 2, true)} LP
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-44">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          ${formatedNumber(row.day.volumeFee, 0, false)}
                        </span>
                        <span className="text-sm">
                          {/* TODO */}
                          Your share: {formatedNumber(3, 2, false)}%{" <"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-48">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">
                          {formatedNumber(row.day.apr, 2, true)}%
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
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2 pl-0">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm">No Data</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </Table>
          {ammPools.length > 0 && (
            <div className={"flex w-full items-center justify-center"}>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoolsTab;
