import { useMediaQuery } from "usehooks-ts";
import { OOpenAccounts } from "./(accounts_blocks)";

type Props = {};

const AccountsTab = (props: Props) => {
  const isEXTRASMALL = useMediaQuery("(max-width: 420px)");
  return (
    <div className="flex flex-col w-full h-max min-h-screen items-center gap-5">
      <OOpenAccounts isEXTRASMALL={isEXTRASMALL} />
      <OOpenAccounts isEXTRASMALL={isEXTRASMALL} />
    </div>
  );
};

export default AccountsTab;
