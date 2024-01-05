import { useMediaQuery } from "usehooks-ts";
import { TransactionHistory } from "./(transactions_blocks)";

type Props = {};

const TransactionsTab = (props: Props) => {
  const isEXTRASMALL = useMediaQuery("(max-width: 420px)");
  return (
    <div className="flex flex-col w-full h-max min-h-screen items-center gap-5">
      <TransactionHistory isEXTRASMALL={isEXTRASMALL} />
    </div>
  );
};

export default TransactionsTab;
