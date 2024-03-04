import { useEffect, useState } from "react";
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

type Props = {
  isEXTRASMALL: boolean;
  data: any;
};

const Balance = ({ data, isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState({
    header: ["DXE", "USDC"],
    body: [],
  });

  useEffect(() => {
    gdata.body.length === 0 &&
      setTimeout(() => {
        setData({
          ...gdata,
          body:
            data.length > 0
              ? data
              : [
                  {
                    id: "1",
                    title: "Wallet",
                    dxe_value: 100000,
                    ustc_value: 100000,
                  },
                  {
                    id: "2",
                    title: "DEX",
                    dxe_value: 100000,
                    ustc_value: 100000,
                  },
                ],
        });
      }, 5000);
  }, [gdata, data]);

  return (
    <div
      className="h-max w-full md:w-1/2  rounded-xl p-5 gap-4 flex flex-col"
      style={{
        boxShadow: "0 0 4px #88d6ff",
      }}
    >
      <div className="flex gap-3 sm:gap-5 justify-between items-center w-full">
        <h3 className="text-sm sm:text-lg md:text-2xl text-[#D9F8FF]">
          Blance
        </h3>
        <Button onClick={() => {}}>Settle All</Button>
      </div>
      <Table className="w-full flex-1 mt-2 overflow-x-scroll">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead
              className="text-sm md:text-md truncate max-w-[110px]"
              align="left"
            />
            {gdata.header.map((header, index) => (
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
          {gdata.body.length <= 0 ? (
            <>
              <TableRow className="hover:bg-transparent border-[#7c7c8d]">
                <TableCell className="font-medium text-left text-[#7c7c8d] py-2">
                  <Skeleton className="w-full h-6 bg-[#7c7c8d]" />
                </TableCell>
                {gdata.header.map((header, index) => (
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
              {gdata.body.map((row: any, index) => (
                <TableRow
                  className="hover:bg-transparent border-[#7c7c8d]"
                  key={`${formatedString(row.id.toLocaleLowerCase())}_${index}`}
                >
                  <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                    {row.title}
                  </TableCell>

                  <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                    {formatedNumber(
                      row.dxe_value ? row.dxe_value : 0,
                      2,
                      isEXTRASMALL
                    )}
                  </TableCell>

                  <TableCell className="font-medium text-left text-sm md:text-md truncate text-[#7c7c8d]">
                    {formatedNumber(
                      row.ustc_value ? row.ustc_value : 0,
                      2,
                      isEXTRASMALL
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Balance;
