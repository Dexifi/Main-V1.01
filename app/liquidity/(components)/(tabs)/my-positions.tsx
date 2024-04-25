import { Button } from "@/components/ui/button";
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
  useClaimAllLiquidityModal,
  useCreatePositionLiquidityModal,
  useManageLiquidityModal,
  useRemoveAllPiRLiquidityModal,
  useRemoveAllPoRLiquidityModal,
} from "@/lib/stores/liquidity.store";
import formatedString from "@/lib/string";
import { useEffect, useMemo, useState } from "react";
import { useLiquidity } from "@/applications/Liquidity/store";
import { RaydiumPools } from "@/applications/Liquidity/pool";
import {
  AmmPoolApiResponse,
  Daum,
  UserAmmPositionType,
} from "@/applications/Liquidity/type";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Clmm,
  ClmmPoolInfo,
  ClmmPoolPersonalPosition,
  Fraction,
} from "@raydium-io/raydium-sdk";
import { getPrice } from "@/data/price";

type DataType = {
  deposit: UserAmmPositionType;
  pool: AmmPoolApiResponse["data"]["data"][0];
};

const MyPositions = () => {
  const [rangeF, setRangeF] = useState("all");
  const [gdata, setData] = useState<DataType[]>([]);
  const userAmmDeposits = useLiquidity((state) => state.userAmmDeposits);
  const { onRemoveAllPiRLiquidityOpen } = useRemoveAllPiRLiquidityModal();
  const { onRemoveAllPoRLiquidityOpen } = useRemoveAllPoRLiquidityModal();
  const { onClaimAllLiquidityOpen } = useClaimAllLiquidityModal();
  const { onCreatePositionLiquidityOpen } = useCreatePositionLiquidityModal();
  const raydiumInfo = useLiquidity((state) => state.raydiumInfo);
  const userClmmDeposits = useLiquidity((state) => state.userClmmDeposits);
  const tokenPrices = useLiquidity((state) => state.tokenPrices);

  const fetchAmmData = async () => {
    const list: any[] = [];
    for (const item of userAmmDeposits) {
      const data = await RaydiumPools.fetchPoolById(item.ammId);
      if (!data.data[0]) return;
      list.push({
        pool: data.data[0],
        deposit: item,
      });
    }
    setData(list);
  };

  useEffect(() => {
    userAmmDeposits && fetchAmmData();
  }, [userAmmDeposits]);

  const d_data = {
    title: "List of All of My Positions",
    range_filter: ["All", "Out of Range", "In Range"],
    netvalue: 10000,
    positions: 2,

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

  const netValue = useMemo(() => {
    const ammValues = gdata.reduce((acc, item) => {
      const value =
        (item.deposit.amount / 10 ** (item.pool.lpMint?.decimals ?? 0)) *
        (item.pool.lpPrice ?? 0);
      return acc + value;
    }, 0);
    const clmmValues = userClmmDeposits.reduce((acc, item) => {
      const value =
        item.positionAccount?.reduce((acc, pos) => {
          const tokenA =
            pos.amountA.toNumber() / 10 ** item.state.mintA.decimals;
          const tokenB =
            pos.amountB.toNumber() / 10 ** item.state.mintB.decimals;
          const tokensPrice = {
            tokenA: tokenPrices[item.state.mintA.mint.toBase58()],
            tokenB: tokenPrices[item.state.mintB.mint.toBase58()],
          };
          console.log("tokensPrice ", tokensPrice);
          const tokenAValue = tokenA * tokensPrice.tokenA;
          const tokenBValue = tokenB * tokensPrice.tokenB;
          const totalValue = tokenAValue + tokenBValue;
          return acc + totalValue;
        }, 0) ?? 0;
      return acc + value;
    }, 0);

    return ammValues + clmmValues;
  }, [gdata, tokenPrices, userClmmDeposits]);

  const inRangePositions = useMemo(() => {
    return userClmmDeposits
      .map((item) => {
        const data: {
          state: ClmmPoolInfo;
          positionAccount?: ClmmPoolPersonalPosition;
        }[] = [];
        item.positionAccount?.forEach((pos) => {
          if (
            pos.tickLower < item.state.tickCurrent &&
            pos.tickUpper > item.state.tickCurrent
          ) {
            data.push({
              state: item.state,
              positionAccount: pos,
            });
          }
        });
        return data;
      })
      .flat();
  }, [userClmmDeposits]);

  const outOfRangePositions = useMemo(() => {
    return userClmmDeposits
      .map((item) => {
        const data: {
          state: ClmmPoolInfo;
          positionAccount?: ClmmPoolPersonalPosition;
        }[] = [];
        item.positionAccount?.forEach((pos) => {
          if (
            pos.tickLower > item.state.tickCurrent &&
            pos.tickUpper < item.state.tickCurrent
          ) {
            data.push({
              state: item.state,
              positionAccount: pos,
            });
          }
        });
        return data;
      })
      .flat();
  }, [userClmmDeposits]);
  const totalPositions = useMemo(() => {
    return gdata.length + inRangePositions.length + outOfRangePositions.length;
  }, [gdata.length, inRangePositions.length, outOfRangePositions.length]);
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
            <div className="flex flex-col max-w-md w-full gap-2 text-[#d9f8ff]">
              <span className="text-lg">
                Net Value: ${formatedNumber(netValue, 2, false)}
              </span>
              <span className="text-sm">
                Positions: {formatedNumber(totalPositions, 0, false)}
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-2 sm:gap-4 justify-start xl:justify-end">
              <div className="flex justify-center items-end w-full gap-2 sm:gap-4 flex-col">
                <div className="flex justify-between items-center gap-1 bg-[#D9F8FF10] rounded-full">
                  {d_data.range_filter.map((item, index) => (
                    <Button
                      key={`${item}-${index}--protocol-filter`}
                      className="rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full bg-transparent"
                      style={{
                        boxShadow:
                          formatedString(item).toLocaleLowerCase() === rangeF
                            ? "0 0 4px #88d6ff"
                            : "none",
                      }}
                      onClick={() => {
                        const value = formatedString(item).toLocaleLowerCase();

                        if (value !== rangeF) {
                          setRangeF(value);
                        }
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-end items-center gap-4 text-white w-full">
                  <div className="flex flex-col w-max gap-2 justify-center items-center">
                    <div
                      className={`text-center text-xs font-semibold md:text-sm flex gap-1 text-[#50af95] flex-wrap`}
                    >
                      <span>In Range:</span>
                      <span>
                        {formatedNumber(inRangePositions.length, 1, true)}
                      </span>
                    </div>
                    <Button
                      className="min-w-52 rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full"
                      style={{
                        boxShadow: "0px 0px 5px 0px #D9F8FF",
                        border: "1px solid #D9F8FF",
                      }}
                      onClick={onRemoveAllPiRLiquidityOpen}
                      size="sm"
                    >
                      Remove All Position in Range
                    </Button>
                  </div>
                  <div className="flex flex-col w-max gap-2 justify-center items-center">
                    <div
                      className={`text-center text-xs font-semibold md:text-sm flex gap-1 text-[#ba0000] flex-wrap`}
                    >
                      <span>Out of Range:</span>
                      <span>
                        {formatedNumber(outOfRangePositions.length, 1, true)}
                      </span>
                    </div>
                    <Button
                      className="min-w-52 rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full"
                      style={{
                        boxShadow: "0px 0px 5px 0px #D9F8FF",
                        border: "1px solid #D9F8FF",
                      }}
                      size="sm"
                      onClick={onRemoveAllPoRLiquidityOpen}
                    >
                      Remove All Position Out of Range
                    </Button>
                  </div>
                  <div className="flex flex-col w-max gap-2 justify-center items-center">
                    <div
                      className={`text-center text-xs font-semibold md:text-sm flex gap-1 text-[#d9f8ff] flex-wrap`}
                    >
                      <span>Pending Reward:</span>
                      <span>${formatedNumber(1000012, 1, true)}</span>
                    </div>
                    <Button
                      className="min-w-52 rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 w-full"
                      style={{
                        boxShadow: "0px 0px 5px 0px #D9F8FF",
                        border: "1px solid #D9F8FF",
                      }}
                      onClick={onClaimAllLiquidityOpen}
                      size="sm"
                    >
                      Claim All Pending
                    </Button>
                  </div>
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
          <Table className="w-full flex-1 overflow-scroll">
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
            {gdata.length > 0 || userClmmDeposits.length > 0 ? (
              <TableBody>
                {gdata.map((row) => (
                  <StandardLiquidityRow
                    key={row.pool.id}
                    row={row}
                    raydiumInfo={raydiumInfo}
                  />
                ))}
                {userClmmDeposits.map((row) => (
                  <ConcentratedLiquidityRow
                    key={row.state.id.toBase58()}
                    row={row}
                    raydiumInfo={raydiumInfo}
                  />
                ))}
              </TableBody>
            ) : (
              <TableBody>
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
              </TableBody>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MyPositions;

type ClmmRowProps = {
  row: {
    state: ClmmPoolInfo;
    positionAccount?: ClmmPoolPersonalPosition[] | undefined;
  };
  raydiumInfo: any;
};
const ConcentratedLiquidityRow = ({ row }: ClmmRowProps) => {
  const { onManageLiquidityOpen } = useManageLiquidityModal();
  const [poolDetails, setPoolDetails] = useState<
    AmmPoolApiResponse["data"]["data"][0] | null
  >(null);

  useEffect(() => {
    const fetchPoolDetails = async () => {
      const pool = await RaydiumPools.fetchPoolById(row.state.id.toBase58());
      setPoolDetails(pool.data[0]);
    };
    fetchPoolDetails();
  }, [row.state.id]);
  return (
    <>
      <TableRow className="hover:bg-transparent !border-b-0 !outline-t-2  outline-t-[#fff] table-row my-1 -outline-offset-2">
        <TableCell className="font-medium text-left py-2 pl-0 min-w-32">
          <div className="flex flex-col items-start min-h-12">
            <span className="text-sm text-[#d9f8ff]">
              {poolDetails?.lpMint?.symbol}
            </span>
            <div className="flex items-center mt-2 w-max gap-4">
              <img
                src={poolDetails?.mintA.logoURI}
                alt={`${poolDetails?.mintA.symbol}_logo-icon`}
                className="aspect-square object-contain rounded-full w-9 h-9"
                width={36}
                height={36}
              />
              <img
                src={poolDetails?.mintB.logoURI}
                alt={`${poolDetails?.mintB.symbol}_logo-icon`}
                className="aspect-square object-contain rounded-full w-9 h-9"
                width={36}
                height={36}
              />
            </div>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-32">
          <div className="flex flex-col items-start min-h-12">
            <span className="text-sm">
              {poolDetails?.rewardDefaultPoolInfos}
            </span>
            <span className="text-sm">{poolDetails?.type}</span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-56">
          <div className="flex flex-col items-start justify-center min-h-12">
            <span className="text-sm">
              ${formatedNumber(poolDetails?.tvl ?? 0, 2, true)}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-36">
          <div className="flex flex-col items-start justify-center min-h-12">
            <span className="text-sm">
              ${formatedNumber(poolDetails?.tvl ?? 0, 2, true)}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-36">
          <div className="flex flex-col items-start justify-center min-h-12">
            <span className="text-sm">
              ${formatedNumber(poolDetails?.day.volume ?? 0, 2, true)}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-36">
          <div className="flex flex-col items-start justify-center min-h-12">
            <span className="text-sm">
              ${formatedNumber(poolDetails?.day.volumeFee ?? 0, 2, false)}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-24">
          <div className="flex flex-col items-start justify-center min-h-12">
            <span className="text-sm">
              {formatedNumber(poolDetails?.day.apr ?? 0, 2, false)}%
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-32 flex justify-center items-center">
          <Button
            size="sm"
            className="max text-xs rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 bg-transparent"
            style={{
              boxShadow: "0 0 4px #88d6ff",
            }}
            // onClick={onManageLiquidityOpen}
          >
            Create Position
          </Button>
        </TableCell>
      </TableRow>
      {row.positionAccount?.map((position, index) => (
        <ClmmPositionRow
          key={index}
          poolDetails={poolDetails}
          row={row}
          position={position}
        />
      ))}
    </>
  );
};

type RowProps = {
  row: DataType;
  raydiumInfo: any;
};
const StandardLiquidityRow = ({ row, raydiumInfo }: RowProps) => {
  const { onManageLiquidityOpen } = useManageLiquidityModal();
  const userShare =
    row.deposit.amount /
    10 ** (row.pool.lpMint?.decimals ?? 0) /
    (row.pool.lpAmount ?? 0);
  return (
    <>
      <TableRow className="hover:bg-transparent !border-b-0 !border-t-2 border-t-[#fff] ">
        <TableCell className="font-medium text-left py-2 pl-0 min-w-32">
          <div className="flex flex-col items-start min-h-12">
            <span className="text-sm text-[#d9f8ff]">
              {row.pool.lpMint?.symbol}
            </span>
            <div className="flex items-center mt-2 w-max gap-4">
              <img
                src={row.pool.mintA.logoURI}
                alt={`${row.pool.mintA.symbol}_logo-icon`}
                className="aspect-square object-contain rounded-full w-9 h-9"
                width={36}
                height={36}
              />
              <img
                src={row.pool.mintB.logoURI}
                alt={`${row.pool.mintB.symbol}_logo-icon`}
                className="aspect-square object-contain rounded-full w-9 h-9"
                width={36}
                height={36}
              />
            </div>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-32">
          <div className="flex flex-col items-start min-h-12">
            <span className="text-sm">{row.pool.rewardDefaultPoolInfos}</span>
            <span className="text-sm">{row.pool.type}</span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-56">
          <div className="flex flex-col items-start min-h-12">
            <span className="text-sm">
              ${formatedNumber(raydiumInfo.tvl, 2, true)}
            </span>
            <span className="text-sm">
              Token Price Index: ${formatedNumber(0, 2, false)}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-36">
          <div className="flex flex-col items-start min-h-12">
            <span className="text-sm">
              ${formatedNumber(row.pool.tvl, 2, true)}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-36">
          <div className="flex flex-col items-start min-h-12">
            <span className="text-sm">
              ${formatedNumber(row.pool.day.volume, 2, true)}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-36">
          <div className="flex flex-col items-start min-h-12">
            <span className="text-sm">
              ${formatedNumber(row.pool.day.volumeFee, 2, false)}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-24">
          <div className="flex flex-col items-start min-h-12">
            <span className="text-sm">
              {formatedNumber(row.pool.day.apr, 2, false)}%
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium text-left py-2 pl-0 text-[#7c7c8d] min-w-32"></TableCell>
      </TableRow>
      <TableRow
        className="bg-[#0d111b] hover:bg-[#0d111b] !rounded-full overflow-hidden !outline outline-offset-[-2px] !outline-[#757788] !border-0"
        style={{ clipPath: "border-box" }}
      >
        <TableCell className="!p-1.5" />
        <TableCell className="!p-1.5" />
        <TableCell className="!p-1.5" />
        <TableCell className="!p-1.5">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="!text-md text-[#757788]">
              Value : $
              {formatedNumber(
                (row.deposit.amount / 10 ** (row.pool.lpMint?.decimals ?? 0)) *
                  (row.pool.lpPrice ?? 0),
                5,
                false
              )}
            </span>
          </div>
        </TableCell>
        <TableCell className="!p-1.5 w-60">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="!text-md text-[#757788]">
              LP Tokens :{" "}
              {formatedNumber(
                row.deposit.amount / 10 ** (row.pool.lpMint?.decimals ?? 0),
                5,
                false
              )}{" "}
              LP
            </span>
          </div>
        </TableCell>
        <TableCell className=" !p-1.5 w-52">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="!text-md text-[#757788]">
              Your share :{" "}
              {userShare < 0.01
                ? "< 0.01%"
                : `${formatedNumber(userShare, 2, false)}%`}
            </span>
          </div>
        </TableCell>
        <TableCell className="!p-1.5">
          <div className="flex flex-row gap-2 items-center justify-center">
            <Button
              size="sm"
              className="w-max text-xs rounded-full hover:bg-[#D9F8FF20] flex justify-start items-center box-border gap-2 bg-transparent"
              style={{
                boxShadow: "0 0 4px #88d6ff",
              }}
              onClick={onManageLiquidityOpen}
            >
              Add Liquidity
            </Button>
          </div>
        </TableCell>{" "}
        <TableCell className="!p-1.5">
          <div className="flex flex-row gap-2 items-center justify-center">
            <Button
              size="sm"
              className="w-max text-xs rounded-full hover:bg-[#D9F8FF20] flex justify-start items-center box-border gap-2 bg-transparent"
              style={{
                boxShadow: "0 0 4px #88d6ff",
              }}
              onClick={onManageLiquidityOpen}
            >
              Remove Liquidity
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

type ClmmPositionRowProps = {
  row: ClmmRowProps["row"];
  position: ClmmPoolPersonalPosition;
  poolDetails: Daum | null;
};

const ClmmPositionRow = ({
  row,
  position,
  poolDetails,
}: ClmmPositionRowProps) => {
  const [tokensPrice, setTokensPrice] = useState({
    tokenA: 0,
    tokenB: 0,
  });

  const isInRange =
    position.tickLower < row.state.tickCurrent &&
    position.tickUpper > row.state.tickCurrent;

  useEffect(() => {
    const fetchTokensPrice = async () => {
      if (!poolDetails) return;
      const tokenA = await getPrice(poolDetails?.mintA.address);
      const tokenB = await getPrice(poolDetails?.mintB.address);
      setTokensPrice({
        tokenA: tokenA,
        tokenB: tokenB,
      });
    };
    fetchTokensPrice();
  }, [poolDetails]);

  if (!poolDetails) return <></>;

  const planCApr = Clmm?.estimateAprsForPriceRangeMultiplier({
    aprType: "day",
    // @ts-ignore TODO
    poolInfo: poolDetails,
    positionTickLowerIndex: position.tickLower,
    positionTickUpperIndex: position.tickUpper,
  });
  return (
    <TableRow
      className="bg-[#0d111b] hover:bg-[#0d111b] !rounded-full overflow-hidden !outline outline-offset-[-2px] !outline-[#757788] border-separate"
      style={{ clipPath: "border-box" }}
    >
      <TableCell className="!p-1.5">
        {isInRange ? (
          <div className="flex flex-row gap-2 items-center pl-2">
            <CheckCircleOutlineIcon className="!fill-[#50AF95] !text-[32px]" />
            <span className="!text-md text-[#50AF95]">In Range</span>
          </div>
        ) : (
          <div className="flex flex-row gap-2 items-center justify-center">
            <ErrorOutlineIcon className="!fill-[#BA0000] !text-[32px]" />
            <span className="!text-sm text-nowrap text-[#BA0000]">
              Out Range
            </span>
          </div>
        )}
      </TableCell>
      <TableCell className="!p-1.5">
        <div className="flex flex-row gap-2 items-center">
          <span className="!text-md text-[#7c7c8d]">
            Value : ${" "}
            {formatedNumber(
              (position.amountA.toNumber() /
                10 ** (poolDetails?.mintA.decimals ?? 0)) *
                tokensPrice.tokenA +
                (position.amountB.toNumber() /
                  10 ** (poolDetails?.mintB.decimals ?? 0)) *
                  tokensPrice.tokenB,
              5
            )}
          </span>
        </div>
      </TableCell>
      <TableCell className="!p-1.5">
        <div className="flex flex-row gap-2 items-start justify-start">
          <span className="!text-md text-[#7c7c8d]">
            {`Range : ${formatedNumber(
              position.priceLower.toNumber(),
              4
            )} - ${formatedNumber(position.priceUpper.toNumber(), 4)}`}
          </span>
          <span className="!text-md text-[#7c7c8d]">
            {`${poolDetails?.mintA.symbol} per ${poolDetails?.mintB.symbol}`}
          </span>
        </div>
      </TableCell>
      <TableCell className="!p-1.5">
        <span className="!text-md text-[#7c7c8d]">
          APR : {formatedNumber(planCApr.apr, 1)} %
        </span>
      </TableCell>
      <TableCell className="!p-1.5">
        <span className="!text-md text-[#7c7c8d]">
          Lev : x{formatedNumber(position.leverage, 2)}
        </span>
      </TableCell>
      <TableCell className="!p-1.5">
        <span className="!text-md text-[#7c7c8d]">
          Pending Yield : ${" "}
          {formatedNumber(
            (position.tokenFeeAmountA.toNumber() /
              10 ** (poolDetails?.mintA.decimals ?? 0)) *
              tokensPrice.tokenA +
              (position.tokenFeeAmountB.toNumber() /
                10 ** (poolDetails?.mintB.decimals ?? 0)) *
                tokensPrice.tokenB,
            2,
            false
          )}
        </span>
      </TableCell>
      <TableCell />
      <TableCell className="!p-1.5">
        <div className="flex flex-row gap-2 items-center justify-center">
          <Button
            size="sm"
            className="w-32 text-xs rounded-full hover:bg-[#D9F8FF20] flex justify-center items-center box-border gap-2 bg-transparent"
            style={{
              boxShadow: "0 0 4px #88d6ff",
            }}
            // onClick={onManageLiquidityOpen}
          >
            Manage
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

function toPercent(feeApr: number, param2: { alreadyDecimaled: boolean }) {
  return feeApr;
}
