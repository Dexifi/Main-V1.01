import { Skeleton } from "@/components/ui/skeleton";
import { memo, useState } from "react";

import { connection } from "@/lib/get-connections";
import { useWallet } from "@solana/wallet-adapter-react";

import formatedNumber from "@/lib/numbers";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import formatedString from "@/lib/string";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDashboard } from "@/applications/Dashboard/store";
import { useDomainsForOwner } from "@bonfida/sns-react";

type Props = {
  isEXTRASMALL: boolean;
};

// eslint-disable-next-line react/display-name
const WalletBalance = memo(({ isEXTRASMALL }: Props) => {
  const [address, setAddress] = useState<string>("");
  const [isTransferDOpen, setIsTransferDOpen] = useState({
    open: false,
    domain: "",
  });
  const { publicKey } = useWallet();
  const { netWorth, walletTokenAccounts } = useDashboard();

  const domains = useDomainsForOwner(connection, publicKey?.toBase58());

  const cToken = walletTokenAccounts
    .filter((token) => token.amount > 0)
    .sort((a, b) => b.price - a.price);

  const sendSOLANAToken = (domain: string) => {
    setIsTransferDOpen({ open: true, domain: domain });
  };

  const data = {
    title: "Wallet Balance",
    color: "text-[#fa01d2]",
    table: {
      header: ["Token", "Amount", "Value", "Token Index", "Value/NetWorth %"],
    },
    domains: ["dexifi.sol 1", "dexifi.sol 2", "dexifi.sol 3"],
  };

  return (
    <div
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-4 lg:px-10 py-5"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <div className="text-lg md:text-2xl truncate flex items-center gap-5 text-[#D9F8FF]">
        <div className="flex">
          <h3 className={"mr-2"}>{data.title}</h3>
          <span className={data.color}>*</span>
        </div>
        <span>
          ${" "}
          {netWorth.totalWallet
            ? formatedNumber(netWorth.totalWallet)
            : formatedNumber(0)}
        </span>
      </div>

      <div className="flex justify-between gap-6 relative flex-col md:flex-row">
        <div className={"w-full"}>
          <Table className="w-4/5 sm:w-full flex-1]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {data.table.header.map((header, index) => (
                  <TableHead
                    key={`${formatedString(
                      header.toLocaleLowerCase()
                    )}_${index}`}
                    className="text-sm md:text-md truncate max-w-[110px] text-[#D9F8FF] p-0"
                    align="left"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {cToken.length === 0 ? (
                <>
                  <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                    {data.table.header.map((header, index) => (
                      <TableCell
                        className="font-medium text-left text-[#7c7c8d]"
                        key={`${header}_skeleton_${index}`}
                      >
                        <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              ) : (
                <>
                  {cToken.map((row, index) => (
                    <TableRow
                      className="hover:bg-transparent border-[#7c7c8d] text-[#7B8693] text-base"
                      key={`${formatedString(
                        row.symbol.toLocaleLowerCase()
                      )}_${index}`}
                    >
                      <TableCell className="font-medium flex my-2 flex-row gap-2 text-left text-sm md:text-md truncate max-w-[110px] p-0">
                        <img className={"w-6 rounded-full"} src={row.logoURI} />
                        {row.symbol}
                      </TableCell>
                      <TableCell className="font-medium text-left text-[#7c7c8d] p-0">
                        {formatedNumber(row.amount)}
                      </TableCell>
                      <TableCell className="font-medium text-left text-[#7c7c8d] p-0">
                        ${formatedNumber(row.price * row.amount)}
                      </TableCell>
                      <TableCell className="font-medium text-left text-[#7c7c8d] p-0">
                        ${formatedNumber(row.price, 5)}
                      </TableCell>
                      <TableCell className="font-medium text-left text-[#7c7c8d] p-0">
                        %
                        {netWorth.totalWallet
                          ? formatedNumber(
                              ((row.price * row.amount) /
                                netWorth.totalWallet) *
                                100
                            )
                          : formatedNumber(0)}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        {(domains?.result?.length ?? 0) > 0 && (
          <div className="flex flex-col min-w-[280px] bg-[#30425640] rounded-3xl gap-5">
            <div className="w-full border-b border-[#D9F8FF] border-solid p-3">
              <h6 className="text-sm md:text-lg truncate text-[#D9F8FF] text-left">
                Domains
              </h6>
            </div>
            <div className="flex flex-col gap-3 h-44 overflow-auto px-4 pr-2">
              {domains?.result?.map(({ domain }, index) => (
                <div
                  key={`${domain}_${index}`}
                  className="flex flex-nowrap justify-between items-center border-b border-[#30425670] border-solid last:border-none"
                >
                  <h6 className="text-sm font-medium text-[#727383]">
                    {domain}.sol
                  </h6>
                  <Button
                    className="border [background:#0D111B] shadow-[0px_0px_5px_0px_rgba(217,248,255,0.50)] p-2.5 rounded-[25px] border-solid border-[rgba(217,248,255,0.50)]"
                    size="sm"
                    onClick={() => setIsTransferDOpen({ open: true, domain })}
                  >
                    Transfer
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <AlertDialog
        open={isTransferDOpen.open}
        onOpenChange={() => {
          setIsTransferDOpen({ open: false, domain: "" });
          setAddress("");
        }}
      >
        <AlertDialogContent
          className="border-none bg-[#0d111b] rounded-3xl h-max"
          style={{
            boxShadow: "0 0 20px 1px rgba(217, 248, 255, 0.25)",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className="flex justify-between items-center gap-5 p-5 text-[#d9f8ff] bg-[#0d111b55] px-5 rounded-full h-12"
              style={{ boxShadow: "0 0 5px #d9f8ff" }}
            >
              <h6>Send</h6>
              <span>Domain</span>
              <Button
                size="icon"
                onClick={() => {
                  setIsTransferDOpen({ open: false, domain: "" });
                  setAddress("");
                }}
              >
                <X className="w-6 h-6 aspect-square object-contain" />
              </Button>
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div
            className="bg-[#0d111b55] px-5 rounded-full h-12 flex items-center w-max"
            style={{ boxShadow: "0 0 5px #d9f8ff" }}
          >
            <h6 className="text-lg text-[#d9f8ff]">{isTransferDOpen.domain}</h6>
          </div>

          <div
            className="bg-[#0d111b55] p-5 rounded-3xl flex flex-col gap-3 justify-center"
            style={{ boxShadow: "0 0 5px #d9f8ff" }}
          >
            <h6 className="text-lg text-[#d9f8ff]">
              Fill Address for Transfer
            </h6>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#d9f8ff70]">Address</span>
              <Input
                className="bg-[#141414] text-white rounded-lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <AlertDialogAction
            className="text-lg md:text-xl rounded-full py-3 h-max"
            style={{ boxShadow: "0 0 5px 1px #d9f8ff" }}
          >
            Send
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
});

export default WalletBalance;
