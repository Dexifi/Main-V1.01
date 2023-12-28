import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import formatedNumber from "@/lib/numbers";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  isEXTRASMALL: boolean;
};
type NFTCollectionProps = {
  id: string;
  name: string;
  collection: string;
  nft_image: string;
  balance: number;
  bid_price: number;
  bid_price_currency: string;
};

const Gallery = ({ isEXTRASMALL }: Props) => {
  const [gdata, setData] = useState<NFTCollectionProps[]>([]);

  useEffect(() => {
    gdata.length === 0 &&
      setTimeout(() => {
        setData([
          {
            id: "123456789",
            name: "Ustur CSS Tier 1 (CSSLU1)",
            nft_image: "/assets/images/nft.png",
            collection: "Star Atlas",
            balance: 1,
            bid_price: 10.655,
            bid_price_currency: "SOL",
          },
        ]);
      }, 5000);
  }, [gdata.length]);

  return (
    <div className="flex w-full">
      {gdata.length === 0 ? (
        <div className="w-full sm:w-1/2 md:w-1/4">
          <Skeleton className="w-full h-[450px] bg-[#7c7c8d]" />
        </div>
      ) : (
        <>
          {gdata.map((nft, index) => (
            <div
              className="w-full sm:w-1/2 md:w-1/4 flex flex-col bg-[#0D111B]  border border-solid border-[#D9F8FF60] rounded-2xl min-h-[450px] justify-start items-start p-5 gap-5"
              key={`${nft.id}_${index}`}
            >
              <div
                className="flex items-center py-3 text-sm md:text-lg text-center leading-5 text-[#D9F8FF] w-full justify-center bg-[#0D111B] rounded-full"
                style={{ boxShadow: "0px 0px 5px 0px #D9F8FF" }}
              >
                {nft.name}
              </div>
              <div className="flex items-center w-full justify-center">
                <Image
                  src={nft.nft_image}
                  alt={`${nft.name}_${nft.collection}_image`}
                  width={isEXTRASMALL ? 220 : 320}
                  height={isEXTRASMALL ? 220 : 320}
                  className="aspect-square object-contain"
                />
              </div>
              <div className="flex items-center flex-col gap-5 w-full">
                <div className="flex flex-col justify-start items-start text-sm text-[#7C7C8D] truncate gap-2 w-full">
                  <span>Collection: {nft.collection}</span>
                  <span>Balance: {formatedNumber(nft.balance, 0, true)}</span>
                  <span>
                    Bid price: {formatedNumber(nft.bid_price, 3, isEXTRASMALL)}{" "}
                    {nft.bid_price_currency}
                  </span>
                </div>
                <Button
                  className="rounded-full min-w-[75%]"
                  style={{
                    boxShadow: "0px 0px 5px 0px rgba(217, 248, 255, 0.50)",
                    border: "1px solid rgba(217, 248, 255, 0.50)",
                  }}
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Gallery;
