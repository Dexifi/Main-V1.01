import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatedString from "@/lib/string";
import { Skeleton } from "@/components/ui/skeleton";
import formatedNumber from "@/lib/numbers";
import { Order } from "@openbook-dex/openbook/lib/market";
import { ownerOpenOrders } from "@/applications/Trade/types";
import { settleFunds } from "@/applications/Trade/send";
import { connection } from "@/lib/get-connections";
import { useWallet } from "@solana/wallet-adapter-react";
import { BaseSignerWalletAdapter } from "@solana/wallet-adapter-base";
import { useTrade } from "@/applications/Trade";
import { getWalletOrders } from "@/applications/Trade/initial";
import { toast } from "@/components/ui/use-toast";

type Props = {
  isEXTRASMALL: boolean;
  order: ownerOpenOrders[];
};

const Balance = ({ order, isEXTRASMALL }: Props) => {
  const { wallet, publicKey } = useWallet();
  const { tokens, orders } = useTrade();
  const [gdata, setData] = useState({
    header: ["Market", "ID", "Base Claim", "Quote Claim"],
  });
  const filteredOrder = order?.filter((e) => e.baseFree || e.quoteFree);
  const handleSettle = useCallback(
    async (order: ownerOpenOrders) => {
      const baseCurrencyAccount = tokens.find(
        (e) => e.mintAddress === order.market.baseMintAddress.toBase58()
      )?.address;
      const quoteCurrencyAccount = tokens.find(
        (e) => e.mintAddress === order.market.quoteMintAddress.toBase58()
      )?.address;

      if (wallet?.adapter && quoteCurrencyAccount && baseCurrencyAccount) {
        try {
          await settleFunds({
            baseCurrencyAccount,
            quoteCurrencyAccount,
            connection: connection,
            market: order.market,
            openOrders: order.openOrder,
            wallet: wallet?.adapter as BaseSignerWalletAdapter<string>,
            sendNotification: true,
          });
        } catch (e: any) {
          console.log(e);
          toast({
            variant: "destructive",
            title: "Error",
            description: e.message,
          });
        }
      }
    },
    [tokens, wallet]
  );

  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full md:w-1/2 rounded-3xl px-3 sm:px-5 lg:px-10 py-3 sm:py-5 flex flex-col"
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <div className="flex gap-3 sm:gap-5 justify-between items-center w-full">
        <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
          Settle Funds
        </h3>
        {/*<Button onClick={() => {}}>Settle All</Button>*/}
      </div>
      <Table className="w-full flex-1 mt-2 overflow-x-scroll">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {gdata.header.map((header, index) => (
              <TableHead
                key={`${formatedString(header.toLocaleLowerCase())}_${index}`}
                className="text-sm md:text-md truncate max-w-[110px] "
                align="left"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrder.length <= 0 ? (
            <TableRow className="hover:bg-transparent border-[#7c7c8d] relative h-1 flex-1 w-1">
              <div className="font-medium text-left text-[#7c7c8d] py-2 absolute left-0 right-0 mx-auto top-0  ">
                <p className={"text-center py-2"}>No Settleable Orders</p>
              </div>
            </TableRow>
          ) : (
            filteredOrder?.map((row, index) => (
              <TableRow
                className="hover:bg-transparent border-[#7c7c8d]"
                key={`${row.marketName}-${index}`}
              >
                <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]  max-w-[50px] ">
                  {row.marketName}
                </TableCell>
                <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#eeeeee]  max-w-[110px] ">
                  <a
                    target={"_blank"}
                    href={
                      "https://solscan.io/address/" +
                      row.market.address.toBase58()
                    }
                  >
                    {row.market.address.toBase58()}
                  </a>
                </TableCell>
                <TableCell className="font-medium text-left text-sm md:text-md  w-2 truncate text-[#7c7c8d]">
                  {`${row.baseFree} ${row.baseToken?.symbol}`}
                </TableCell>
                <TableCell className="font-medium text-left text-sm md:text-md  w-2 truncate text-[#7c7c8d]">
                  {`${row.quoteFree} ${row.quoteToken?.symbol}`}
                </TableCell>
                <TableCell className="font-medium text-left text-sm md:text-md  w-2 truncate text-[#7c7c8d]">
                  <Button
                    onClick={() => {
                      handleSettle(row);
                    }}
                  >
                    Settle
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Balance;
