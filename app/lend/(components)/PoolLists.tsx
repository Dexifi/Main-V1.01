import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatedString from "@/lib/string";
import { Dispatch, useMemo, useState } from "react";
import { LendState, useLend } from "@/applications/Lend/store";
import { useWallet } from "@solana/wallet-adapter-react";
import useWalletBalance from "@/hooks/useWalletBalance";
import { connection } from "@/lib/get-connections";
import PoolListRow from "./PoolListRow";
import PoolDetailTable from "./PoolDetailTable";

type DataItemProps = {
  balance: number;
  collection: string;
  id: string;
  mint: string;
  name: string;
  nft_supply: number;
  price: number;
  value: number;
  stats?: any;
  config?: any;
  supply: number;
  borrow: number;
  borrowValue: number;
  supplyAPR: number;
  borrowAPR: number;
};

type Props = {
  headers: string[];
  isEXTRASMALL: boolean;
  setSelectedLend: Dispatch<LendState["poolList"][0]>;
  page: "main" | "turbo";
};

const PoolLists = ({ headers, isEXTRASMALL, setSelectedLend, page }: Props) => {
  const [deposits, setDeposits] = useState<any>([1]);
  const [borrows, setBorrows] = useState<any>([1]);
  const mainMarket = useLend((state) => state.mainMarket);
  const turboMarket = useLend((state) => state.turboMarket);
  const rawReserves = useLend((state) => state.poolList);
  const mainObligation = useLend((state) => state.mainObligations);
  const turboObligation = useLend((state) => state.turboObligations);
  const { publicKey } = useWallet();
  const { tokens } = useWalletBalance(connection, publicKey);

  const obligation = useMemo(
    () => (page === "main" ? mainObligation : turboObligation),
    [mainObligation, page, turboObligation]
  );

  const market = useMemo(
    () => (page === "main" ? mainMarket : turboMarket),
    [mainMarket, page, turboMarket]
  );
  const reserves = useMemo(() => {
    return rawReserves.filter(
      (e) =>
        e.reserve?.poolAddress === market?.config.address &&
        e.reserve?.disabled === false
    );
  }, [market, rawReserves]);

  return (
    <div className="w-full flex flex-wrap justify-between gap-3 my-3 flex-col md:flex-row">
      <div
        className="order-10 md:-order-10 flex flex-col justify-start items-start gap-y-5 flex-1 bg-[#0d111b] rounded-3xl lg:px-5 py-5"
        style={{
          boxShadow: "0 0 4px #88d6ff",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(119, 186, 234, 0.2), transparent ), radial-gradient( 50% 50% at 50% 50%, rgba(251, 0, 196, 0) 3.49%, rgba(119, 186, 234, 0) 7.6%, rgba(253, 0, 197, 0) 10.46%, rgba(119, 186, 234, 0) 14.46%, rgba(255, 0, 199, 0) 18.56%, rgba(3, 0, 3, 0) 19.53%, transparent 79.82%, rgba(246, 0, 192, 0) 81.08%, rgba(119, 186, 234, 0) 84.04%, rgba(247, 0, 193, 0) 86.61%, rgba(119, 186, 234, 0) 91.01%, rgba(249, 0, 194, 0) 95.16%, rgba(119, 186, 234, 0) 98.6% )",
        }}
      >
        <Table className="w-full mt-2 overflow-scroll">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {headers.map((header, index) => (
                <TableHead
                  key={`${formatedString(
                    header.toLocaleLowerCase() ?? "empty"
                  )}_${index}`}
                  className="text-sm md:text-md truncate max-w-[110px]"
                  align="left"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {!reserves ? (
              <>
                <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                  {headers.map((header, index) => (
                    <TableCell
                      className="font-medium text-left text-[#7c7c8d] py-2"
                      key={`${header}_skeleton_${index}`}
                    >
                      <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                    </TableCell>
                  ))}
                </TableRow>
              </>
            ) : (
              reserves?.map(
                (row, index) =>
                  row && (
                    <PoolListRow
                      key={row.marketReserve?.config.address}
                      row={row}
                      tokens={tokens}
                      setSelectedLend={setSelectedLend}
                      isEXTRASMALL={isEXTRASMALL}
                      obligation={obligation}
                    />
                  )
              )
            )}
          </TableBody>
        </Table>
      </div>
      <PoolDetailTable page={page} />
    </div>
  );
};

export default PoolLists;
