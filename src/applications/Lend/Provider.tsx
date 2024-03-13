import { PropsWithChildren, useEffect } from "react";
import InitialLending from "@/applications/Lend/initial";
import { connection } from "@/lib/get-connections";

const LendingProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    InitialLending(connection);
  }, []);

  return <>{children}</>;
};

export default LendingProvider;
