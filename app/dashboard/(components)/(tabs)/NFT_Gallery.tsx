import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { Gallery } from "./(nft_blocks)";

type Props = {};

const NFT_Gallery = (props: Props) => {
  const isEXTRASMALL = useMediaQuery("(max-width: 420px)");
  return (
    <div className="flex flex-col w-full h-max min-h-screen items-center gap-5">
      <Gallery isEXTRASMALL={isEXTRASMALL} />
    </div>
  );
};

export default NFT_Gallery;
