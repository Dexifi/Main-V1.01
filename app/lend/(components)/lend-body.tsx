import { useState } from "react";
import {
  BorrowModal,
  RepayModal,
  SupplyModal,
  WithdrawModal,
} from "./(modals)";
import PoolLists from "./PoolLists";
import PoolOverview from "./PoolOverview";
import { LendState } from "@/applications/Lend/store";
import Header from "./Header";
import ManageModal from "@/components/modals/manage-modal";
import CreatePositionModal from "@/components/modals/create-position-modal";
import AddLiquidityModal from "@/components/modals/add-liquidity-modal";

type Props = {
  isEXTRASMALL: boolean;
};

const LendBody = ({ isEXTRASMALL }: Props) => {
  const [selectedLend, setSelectedLend] = useState<
    LendState["poolList"][0] | null
  >(null);
  const [page, setPage] = useState<"main" | "turbo">("main");

  return (
    <div className="z-50 static py-5 flex flex-col items-center">
      <Header setPage={setPage} page={page} />
      <PoolOverview isEXTRASMALL={isEXTRASMALL} page={page} />
      <PoolLists
        headers={["Asset", "", "Total", "APR"]}
        isEXTRASMALL={isEXTRASMALL}
        setSelectedLend={setSelectedLend}
        page={page}
      />
      <SupplyModal reserve={selectedLend} page={page} />
      <WithdrawModal reserve={selectedLend} page={page} />
      <BorrowModal reserve={selectedLend} page={page} />
      <RepayModal reserve={selectedLend} page={page} />
    </div>
  );
};

export default LendBody;
