import Image from "next/image";
import React from "react";

type Props = {};

const SwapFooter = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-max w-full">
      <Image
        src="/assets/icons/swap_powered.svg"
        alt="powered by jupiter"
        height={320}
        width={1280}
        className="w-full max-w-lg aspect-[12/4] object-contain"
      />
    </div>
  );
};

export default SwapFooter;
