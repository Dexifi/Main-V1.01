import formatedString from "@/lib/string";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatedNumber from "@/lib/numbers";
import { Button } from "@/components/ui/button";
import { useJupiterTrade } from "@/applications/Trade/store";
import { useCallback, useState } from "react";
import { cancelOrder } from "@/applications/Trade/jup";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

type OrderProps = {
  isEXTRASMALL: boolean;
};
type DataType = {
  header: string[];
};

const JupiterOrders = ({ isEXTRASMALL }: OrderProps) => {
  const [gdata, setData] = useState<DataType>({
    header: ["Order Info", "Price", "Expiry", "Filled Size", "Action"],
  });
  const { wallet } = useWallet();
  const { openOrder } = useJupiterTrade();

  const handleOnCancel = useCallback(
    async (orderId: PublicKey) => {
      if (!wallet) {
        return;
      }
      await cancelOrder(wallet.adapter, orderId.toBase58());
    },
    [wallet]
  );

  return (
    <div
      className="bg-[#0d111b] min-h-[200px] w-full md:w-full rounded-3xl px-3 sm:px-5 lg:px-10 py-3 sm:py-5 flex overflow"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <div className="w-full flex-1" defaultValue="all">
        <div className="w-full  h-max">
          <div className="flex gap-3 sm:gap-5 justify-between w-full items-center flex-wrap">
            <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
              Orders
            </h3>
            <div
              className={`flex gap-2 flex-1 ${"justify-end"} items-center w-max`}
            >
              {/*<Button>Cancel All</Button>*/}
            </div>
          </div>
        </div>
        <Table className="w-4/5 sm:w-full flex-1 mt-2">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {gdata.header.map((header, index) => (
                <TableHead
                  key={`${formatedString(header.toLocaleLowerCase())}_${index}`}
                  className="text-sm md:text-md truncate max-w-[110px]"
                  align="left"
                >
                  {header}
                </TableHead>
              ))}
              <TableHead
                className="text-sm md:text-md truncate max-w-[110px]"
                align="left"
              />
            </TableRow>
          </TableHeader>

          <TableBody className="pb-3">
            {openOrder.length <= 0 ? (
              <TableRow className="hover:bg-transparent border-[#7c7c8d] relative h-1 flex-1 w-1">
                <div className="font-medium text-left text-[#7c7c8d] py-2 absolute left-0 right-0 mx-auto top-0  ">
                  <p className={"text-center py-2"}>No Orders</p>
                </div>
              </TableRow>
            ) : (
              <>
                {openOrder.map((row, index) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d] h-20"
                    key={index}
                  >
                    <TableCell className="font-bold text-left text-sm md:text-md truncate text-[#7c7c8d] items-center flex h-[inherit] row gap-2">
                      <div className="row flex">
                        <img
                          src={row.tokenA?.logoURI}
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                        <img
                          src={row.tokenB?.logoURI}
                          alt=""
                          className="w-6 h-6 -ml-1 rounded-full"
                        />
                      </div>
                      <p>{`${formatedNumber(row.inAmountUi, 6)} ${
                        row.tokenA?.symbol
                      }`}</p>

                      <p>{`${formatedNumber(row.outAmountUi, 6)} ${
                        row.tokenB?.symbol
                      }`}</p>
                    </TableCell>

                    <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                      <p>
                        {`${formatedNumber(row.price, 3)} ${
                          row.tokenA?.symbol
                        } per ${row.tokenB?.symbol}`}
                      </p>
                    </TableCell>

                    <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                      {row.expiredAt
                        ? new Date(row.expiredAt).getDate()
                        : "No expiry"}
                    </TableCell>

                    <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                      {formatedNumber(row.borrowMakingAmount, 6, isEXTRASMALL)}
                    </TableCell>

                    <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                      <Button onClick={() => handleOnCancel(row.id)}>
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JupiterOrders;
