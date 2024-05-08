import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import formatedString from "@/lib/string";
import formatedNumber from "@/lib/numbers";
import { useLend } from "@/applications/Lend/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { findToken } from "@/lib/get-wallet";
import { getPrice } from "@/data/price";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
type Props = {
  page: "main" | "turbo";
};
type Borrows = {
  title: string;
  logoURI: string;
  amount: number;
  price: number;
};

const PoolDetailTable = ({ page }: Props) => {
  const mainObligations = useLend((state) => state.mainObligations);
  const turboObligations = useLend((state) => state.turboObligations);
  const obligation = useMemo(
    () => (page === "main" ? mainObligations : turboObligations),
    [mainObligations, page, turboObligations]
  );

  const [borrows, setBorrows] = useState<Borrows[]>([]);
  const [deposits, setDeposits] = useState<Borrows[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = useCallback(async () => {
    const b: Borrows[] = [];
    for (const e of obligation!.borrows) {
      const token = await findToken(e.mintAddress);
      let price = 0;
      if (token?.symbol) {
        price = await getPrice(token?.symbol);
      }
      b.push({
        title: token?.symbol ?? "",
        logoURI: token?.logoURI ?? "",
        amount: e.amount.toNumber() / 10 ** (token?.decimals ?? 0),
        price: (price * e.amount.toNumber()) / 10 ** (token?.decimals ?? 0),
      });
    }
    b.length > 0 && setBorrows(b);

    const d: Borrows[] = [];
    for (const e of obligation!.deposits) {
      const token = await findToken(e.mintAddress);
      let price = 0;
      if (token?.symbol) {
        price = await getPrice(token?.symbol);
      }

      d.push({
        title: token?.symbol ?? "",
        logoURI: token?.logoURI ?? "",
        amount: e.amount.toNumber() / 10 ** (token?.decimals ?? 0),
        price: (price * e.amount.toNumber()) / 10 ** (token?.decimals ?? 0),
      });
    }
    d.length > 0 && setDeposits(d);
  }, [obligation?.borrows, obligation?.deposits]);

  const chartData = createChartData({
    userDeposit: obligation?.obligationStats.userTotalDeposit,
    userBorrow: obligation?.obligationStats.userTotalBorrow,
    liquidationThreshold: obligation?.obligationStats.liquidationThreshold,
    borrowLimit: obligation?.obligationStats.borrowLimit,
  });

  useEffect(() => {
    if (obligation) {
      fetchData();
    }
  }, [fetchData, loading, obligation, page]);

  useEffect(() => {
    page && setLoading(true);
  }, [page]);
  return (
    <div
      className="flex justify-center items-center bg-[#0d111b] rounded-3xl p-4 h-max flex-wrap sticky top-24  flex-col w-1/4"
      style={{
        boxShadow: "0 0 4px #88d6ff",
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(119, 186, 234, 0.2), transparent ), radial-gradient( 50% 50% at 50% 50%, rgba(251, 0, 196, 0) 3.49%, rgba(119, 186, 234, 0) 7.6%, rgba(253, 0, 197, 0) 10.46%, rgba(119, 186, 234, 0) 14.46%, rgba(255, 0, 199, 0) 18.56%, rgba(3, 0, 3, 0) 19.53%, transparent 79.82%, rgba(246, 0, 192, 0) 81.08%, rgba(119, 186, 234, 0) 84.04%, rgba(247, 0, 193, 0) 86.61%, rgba(119, 186, 234, 0) 91.01%, rgba(249, 0, 194, 0) 95.16%, rgba(119, 186, 234, 0) 98.6% )",
      }}
    >
      <div className={"flex flex-row text-white w-full justify-between mt-4"}>
        <div className={"flex flex-col gap-4"}>
          <p>Equity</p>
          <p>$1000</p>
        </div>
        <div className={"flex flex-col justify-end"}>
          <p>=</p>
        </div>
        <div className={"flex flex-col gap-4"}>
          <p>Supply</p>
          <p>$2300</p>
        </div>
        <div className={"flex flex-col justify-end"}>
          <p>-</p>
        </div>
        <div className={"flex flex-col gap-4"}>
          <p>Borrow</p>
          <p>$1000</p>
        </div>
      </div>
      <div className={"w-full bg-[#757788] h-0.5 mt-5"} />
      <div className={"flex flex-row w-full justify-between text-white mt-5"}>
        <p>Weighted Borrow</p>
        <p>Borrow Limit</p>
      </div>
      <div className={"flex flex-row w-full justify-between text-white mt-5"}>
        <p>$1000</p>
        <p>$1000</p>
      </div>
      {/*  Progress bar */}
      <div className={"bg-red-50 h-3 w-full mt-3"} />
      <div className={"flex flex-row w-full justify-between text-white mt-3"}>
        <p>Liquidation Threshold</p>
        <p>$1000</p>
      </div>
      <div className={"w-full bg-[#757788] h-1 mt-3"} />

      {/* ===================================== */}
      <div className={"bg-blue-500 w-full"}>
        <div className={"flex flex-row justify-center items-center gap-2 m-2"}>
          <div className={"h-5 w-5 bg-amber-950"} />
          <p>Weighted Borrow</p>
        </div>
        <div className={"flex flex-row gap-2 justify-center mt-3"}>
          <p>Position</p>
          <p>x</p>
          <p>Price</p>
          <p>x</p>
          <p>Weight</p>
          <p>=</p>
          <p>Total</p>
        </div>
        <div className={"flex flex-row gap-2 justify-center mt-1"}>
          <p>Total Weighted Borrow</p>
          <p>=</p>
          <p>$1000</p>
        </div>
        <div className={"flex flex-row justify-center mt-3"}>
          <div className={"w-2/3 h-0.5 bg-red-50"} />
        </div>
        <div className={"flex flex-row justify-center items-center gap-2 m-2"}>
          <div className={"h-5 w-5 bg-blue-200"} />
          <p>Borrow Limit</p>
        </div>
        <div className={"flex flex-row gap-2 justify-center mt-3"}>
          <p>Position</p>
          <p>x</p>
          <p>Price</p>
          <p>x</p>
          <p>Open LTV</p>
          <p>=</p>
          <p>Total</p>
        </div>
      </div>
      {/* ===================================== */}
      <div className={"w-full bg-[#757788] h-1"} />

      {/*<div className={"flex flex-row justify-between text-white items-center"}>*/}
      {/*  <ExpandMoreIcon />*/}
      {/*  <p>Show Details</p>*/}
      {/*  <ExpandMoreIcon />*/}
      {/*</div>*/}
    </div>
  );
};
export default PoolDetailTable;

type createChartDataType = {
  userDeposit?: number;
  userBorrow?: number;
  borrowLimit?: number;
  liquidationThreshold?: number;
};
const createChartData = ({
  userDeposit,
  userBorrow,
  liquidationThreshold,
  borrowLimit,
}: createChartDataType) => [
  {
    color: "bg-[#1ED6FF]",
    textColor: "text-[#1ED6FF]",
    title: "Supply balance",
    value: userDeposit,
    percentage: 100,
  },
  {
    color: "bg-[#4658FA]",
    textColor: "text-[#4658FA]",
    title: "Borrow balance",
    value: userBorrow,
    percentage: ((userBorrow ?? 0) / (borrowLimit ?? 0)) * 100,
  },
  {
    color: "bg-[#FBE947]",
    textColor: "text-[#FBE947]",
    title: "Borrow limit",
    value: borrowLimit,
    percentage: ((borrowLimit ?? 0) / (userDeposit ?? 0)) * 100,
  },
  {
    color: "bg-[#B2FA46]",
    textColor: "text-[#B2FA46]",
    title: "Liquidation threshold",
    value: liquidationThreshold,
    percentage: 100,
  },
];
