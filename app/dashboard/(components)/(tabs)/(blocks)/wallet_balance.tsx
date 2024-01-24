import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

import { connection } from "@/lib/get-connections";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TokenInfo, TokenListProvider } from "@solana/spl-token-registry";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import axios from "axios";

import formatedNumber from "@/lib/numbers";
import { getAllDomains, performReverseLookup } from "@bonfida/spl-name-service";

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

type Props = {
  walletBalance: number;
  setWalletBalance: (walletBalance: number) => void;
  isEXTRASMALL: boolean;
};

const getPrice = async (symbol: string) => {
  let price = await axios.get(`https://price.jup.ag/v4/price?ids=${symbol}`);
  return price.data.data[symbol].price;
};

const findToken = async (mintOrSymbol: string) => {
  const tokens = await new TokenListProvider().resolve();
  const tokenList = tokens.filterByChainId(101).getList();
  let tokenInfo =
    tokenList.find((t) => t.address === mintOrSymbol) ||
    tokenList.find((t) => t.symbol === mintOrSymbol);
  return tokenInfo;
};

const getTokenBalanceFromWallet = async (owner: PublicKey) => {
  const walletTokens = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: owner.toString(),
          },
        },
      ],
    }
  );
  return walletTokens;
};

const WalletBalance = ({
  walletBalance,
  setWalletBalance,
  isEXTRASMALL,
}: Props) => {
  const [tokensList, setTokensList] = useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [address, setAddress] = useState<string>("");
  const [isTransferDOpen, setIsTransferDOpen] = useState({
    open: false,
    domain: "",
  });

  const { publicKey } = useWallet();

  async function getSolDomainsFromPublicKey(wallet: string): Promise<string[]> {
    const ownerWallet = new PublicKey(wallet);
    const allDomainKeys = await getAllDomains(connection, ownerWallet);
    const allDomainNames = await Promise.all(
      allDomainKeys.map((key) => {
        return performReverseLookup(connection, key);
      })
    );

    return allDomainNames;
  }

  const fetchData = async () => {
    try {
      let mint: { mint: string; uiAmount: number }[] = [];
      if (publicKey === null) {
        return;
      }
      const balanceAccounts = await getTokenBalanceFromWallet(publicKey);
      for (const i of balanceAccounts) {
        if (i.account.data.parsed.info.tokenAmount.uiAmount > 0)
          mint.push({
            mint: i.account.data.parsed.info.mint,
            uiAmount: i.account.data.parsed.info.tokenAmount.uiAmount,
          });
      }

      let updatedTokensList: any[] = [];

      for (let m of mint) {
        const tokenInfo = await findToken(m.mint);
        if (tokenInfo) {
          updatedTokensList.push({
            symbol: tokenInfo.symbol,
            name: tokenInfo.name,
            decimals: tokenInfo.decimals,
            uiAmount: m.uiAmount,
            mint: m.mint,
            logoURI: tokenInfo.logoURI,
          });
        }
      }
      updatedTokensList = updatedTokensList.filter(
        (t) => !t.symbol.includes("-")
      );
      const balance = await connection.getBalance(publicKey);
      updatedTokensList.push({
        symbol: "SOL",
        name: "Solana",
        decimals: 9,
        uiAmount: balance / LAMPORTS_PER_SOL,
        logoURI: "/solana-copy-2@2x.png",
      });
      try {
        for (let t of updatedTokensList) {
          t.price = await getPrice(t.symbol);
          t.value = t.uiAmount * t.price;
        }
      } catch (err) {
        console.log(err);
      }
      setTokensList(updatedTokensList);
      let sum = updatedTokensList.reduce((acc, t) => acc + t.value, 0);
      setWalletBalance(+sum.toFixed(2));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (publicKey) {
      fetchData();
    }
  }, [publicKey]);

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
      className="bg-[#0d111b] min-h-56 w-full rounded-3xl px-5 lg:px-10 py-5"
      style={{ boxShadow: "0 0 4px #88d6ff" }}
    >
      <div className="text-lg md:text-2xl truncate flex items-center gap-5 text-[#D9F8FF]">
        <div className="flex">
          <h3>{data.title}</h3>
          <span className={data.color}>*</span>
        </div>
        <span>
          ${walletBalance ? formatedNumber(walletBalance) : formatedNumber(0)}
        </span>
      </div>
      {/*  */}

      <div className="flex justify-between gap-6 relative flex-col md:flex-row">
        <Table className="w-4/5 sm:w-full flex-1">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {data.table.header.map((header, index) => (
                <TableHead
                  key={`${formatedString(header.toLocaleLowerCase())}_${index}`}
                  className="text-sm md:text-md truncate max-w-[110px]"
                  align="left"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                  {data.table.header.map((header, index) => (
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
              <>
                {tokensList.map((row: any, index) => (
                  <TableRow
                    className="hover:bg-transparent border-[#7c7c8d] "
                    key={`${formatedString(
                      row.symbol.toLocaleLowerCase()
                    )}_${index}`}
                  >
                    <TableCell className="font-medium text-left py-2 text-sm md:text-md truncate max-w-[110px]">
                      {row.symbol}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      ${formatedNumber(row.uiAmount)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      ${formatedNumber(row.value)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {formatedNumber(row.price, 5)}
                    </TableCell>
                    <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                      {walletBalance
                        ? formatedNumber((row.value / walletBalance) * 100)
                        : formatedNumber(0)}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
        <div className="flex flex-col min-w-max md:min-w-72 p-4 bg-[#30425640] rounded-xl gap-5">
          <div className="w-full border-b border-[#D9F8FF] border-solid pb-2">
            <h6 className="text-sm md:text-lg truncate text-[#D9F8FF] text-left">
              Domains
            </h6>
          </div>
          <div className="flex flex-col gap-3">
            {data.domains.map((domain, index) => (
              <div
                key={`${domain}_${index}`}
                className="flex flex-nowrap justify-between items-center gap-x-6 border-b border-[#30425670] border-solid last:border-none pb-3 last:pb-0"
              >
                <h6 className="text-sm font-medium">{domain}</h6>
                <Button
                  className=""
                  size="sm"
                  onClick={() => setIsTransferDOpen({ open: true, domain })}
                >
                  Transfer
                </Button>
              </div>
            ))}
          </div>
        </div>
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
};

export default WalletBalance;
