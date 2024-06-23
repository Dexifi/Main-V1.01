import { useMediaQuery } from "usehooks-ts";
import { OrderAccounts, TokenAccounts } from "./(accounts_blocks)";

type Props = {};

const AccountsTab = (props: Props) => {
  const isEXTRASMALL = useMediaQuery("(max-width: 420px)");
  return (
    <div className="flex flex-col w-full h-max min-h-screen items-center gap-5">
      <OrderAccounts isEXTRASMALL={isEXTRASMALL} />
      <TokenAccounts isEXTRASMALL={isEXTRASMALL} />
    </div>
  );
};

export default AccountsTab;
