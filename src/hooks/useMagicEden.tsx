import { useCallback, useEffect, useState } from "react";
import { MAGIC_EDEN_API } from "@/lib/endpoints";
import axios from "axios";
const useMagicEden = () => {
  const [values, setValues] = useState<Response>({ last24Hrs: 0, total: 0 });
  const address = MAGIC_EDEN_API + "/volumes?edge_cache=true";

  const getTotalValue = useCallback(async () => {
    try {
      const { data } = await axios.get<Response>(address);
      setValues(data);
    } catch (e) {
      console.error(e);
    }
  }, [address]);

  useEffect(() => {
    getTotalValue();
  }, []);

  return { ...values };
};
export default useMagicEden;

type Response = {
  last24Hrs: number;
  total: number;
};
