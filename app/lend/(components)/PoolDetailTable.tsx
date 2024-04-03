import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import formatedString from "@/lib/string";
import formatedNumber from "@/lib/numbers";
import { useLend } from "@/applications/Lend/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { findToken } from "@/lib/get-wallet";
import { getPrice } from "@/data/price";

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
      className="flex justify-center items-center gap-5 bg-[#0d111b] rounded-3xl p-8 h-max flex-wrap sticky top-24  flex-col"
      style={{
        boxShadow: "0 0 4px #88d6ff",
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(119, 186, 234, 0.2), transparent ), radial-gradient( 50% 50% at 50% 50%, rgba(251, 0, 196, 0) 3.49%, rgba(119, 186, 234, 0) 7.6%, rgba(253, 0, 197, 0) 10.46%, rgba(119, 186, 234, 0) 14.46%, rgba(255, 0, 199, 0) 18.56%, rgba(3, 0, 3, 0) 19.53%, transparent 79.82%, rgba(246, 0, 192, 0) 81.08%, rgba(119, 186, 234, 0) 84.04%, rgba(247, 0, 193, 0) 86.61%, rgba(119, 186, 234, 0) 91.01%, rgba(249, 0, 194, 0) 95.16%, rgba(119, 186, 234, 0) 98.6% )",
      }}
    >
      <div className="flex justify-between w-full gap-4">
        {chartData.map(({ percentage, color }, index) => (
          <div
            key={color}
            className={`w-16 h-40 flex justify-end items-end relative overflow-hidden`}
          >
            <div
              className={`w-full h-full ${color} opacity-50 max-h-full rounded-[25px/12.5px]`}
            />
            <div
              className={`w-16 h-full ${color} opacity-40 max-h-5 absolute right-0 top-0 rounded-[25px/12.5px]`}
            />
            <div
              className={`w-16 h-full  absolute right-0 bottom-0 rounded-[25px/12.5px]`}
              style={{
                maxHeight: percentage + "%",
              }}
            >
              <div
                className={`w-16 h-5 ${color} opacity-100 absolute  top-0 rounded-[25px/12.5px]`}
              />
              <div
                className={`w-16 ${color} h-full opacity-70 flex-1 bottom-0 rounded-[25px/12.5px]`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex-1 min-w-[250px]">
        <Table>
          <TableBody>
            <TableRow className="hover:bg-transparent border-[#7c7c8d]">
              <TableCell
                className={`font-medium text-white text-left py-2 text-sm pl-0`}
              >
                Net value
              </TableCell>
              <TableCell className="font-medium text-left text-[#7c7c8d] py-2 text-sm pr-0">
                $
                {formatedNumber(
                  obligation?.obligationStats?.netAccountValue ?? 0,
                  1,
                  true
                )}
              </TableCell>
            </TableRow>
            {chartData?.map((row, index) => (
              <TableRow
                className="hover:bg-transparent border-[#7c7c8d]"
                key={`${formatedString(
                  row.title.toLocaleLowerCase()
                )}_${index}`}
              >
                <TableCell
                  className={`font-medium text-left ${row.textColor} py-2 text-sm pl-0`}
                >
                  {row.title}
                </TableCell>
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2 text-sm pr-0">
                  ${formatedNumber(row?.value ?? 0, 1, true)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="hover:bg-transparent border-[#7c7c8d]">
              <TableCell
                className={`font-medium text-white text-left py-2 text-sm pl-0`}
              >
                Weight Borrow
              </TableCell>
              <TableCell className="font-medium text-left text-[#7c7c8d] py-2 text-sm pr-0">
                TODO ${formatedNumber(0, 1, true)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className={"text-sky-100 my-2"}>
          Assets <span className={"text-cyan-400"}>Supplied</span>
        </p>
        <hr />
        <Table>
          <TableBody>
            {deposits.map((e, index) => (
              <TableRow
                key={`${e.title}_${index}_${page}_deposits`}
                className={"hover:bg-inherit "}
              >
                <TableCell
                  className={
                    "flex items-center flex-row justify-between mt-1 pb-2"
                  }
                >
                  <div className={"flex flex-row items-center gap-2"}>
                    <img
                      src={e.logoURI}
                      alt={e.title}
                      className={"w-5 h-5 rounded-full"}
                    />
                    <p className={"text-sky-100"}>{e.title}</p>
                  </div>
                  <div>
                    <p className={"text-gray-500"}>
                      {formatedNumber(e.amount, 4)}
                    </p>
                    <p className={"text-gray-500"}>
                      ${formatedNumber(e.price, 3)}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className={"text-sky-100 my-2 mt-6"}>
          Assets <span className={"text-cyan-400"}>Borrowed</span>
        </p>
        <hr />
        <Table>
          <TableBody>
            {borrows.map((e, index) => (
              <TableRow
                key={`${e.title}_${index}_${page}_borrows`}
                className={"hover:bg-inherit"}
              >
                <TableCell
                  className={"flex items-center flex-row justify-between mt-1"}
                >
                  <div className={"flex flex-row items-center gap-2"}>
                    <img
                      src={e.logoURI}
                      alt={e.title}
                      className={"w-5 h-5 rounded-full"}
                    />
                    <p className={"text-sky-100"}>{e.title}</p>
                  </div>
                  <div>
                    <p className={"text-gray-500"}>
                      {formatedNumber(e.amount, 4)}
                    </p>
                    <p className={"text-gray-500"}>
                      ${formatedNumber(e.price, 3)}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
