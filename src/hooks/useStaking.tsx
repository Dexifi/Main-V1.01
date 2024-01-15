import { useCallback, useEffect, useState } from "react";
import { Connection, PublicKey, StakeProgram } from "@solana/web3.js";
import {
  Farm,
  RAYDIUM_MAINNET,
  ENDPOINT,
  ApiFarmInfo,
} from "@raydium-io/raydium-sdk";
import axios from "axios";
const STAKE_PROGRAM_PK = new PublicKey(
  "EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q"
);
const WALLET_OFFSET = 44;
const DATA_SIZE = 200;

const useStaking = (connection: Connection, owner: PublicKey | null) => {
  const [stakes, setStakes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStakingAccounts = useCallback(async () => {
    if (!owner || !loading) return;

    const pools = await axios.get<ApiFarmInfo>(
      ENDPOINT + RAYDIUM_MAINNET.farmInfo
    );
    const q = await connection.getProgramAccounts(STAKE_PROGRAM_PK, {
      dataSlice: { offset: 0, length: 0 },
      filters: [
        {
          dataSize: 165,
        },
        {
          memcmp: {
            offset: 12,
            bytes: owner.toBase58(),
          },
        },
      ],
    });
    console.log(q);

    // try {
    //   Farm.getAssociatedLedgerAccount({
    //     programId: STAKE_PROGRAM_PK,
    //     owner,
    //     version: 3,
    //     poolId:pools.data.stake[0].programId,
    //   });
    //
    //   await connection
    //     .getParsedProgramAccounts(STAKE_PROGRAM_PK, {
    //       filters: [
    //         {
    //           dataSize: DATA_SIZE,
    //           memcmp: {
    //             offset: WALLET_OFFSET,
    //             bytes: owner.toBase58(), // your pubkey, encoded as a base-58 string
    //           },
    //         },
    //       ],
    //     })
    //     .then((res) => {
    //       console.log("getStakingAccounts", res);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    setLoading(false);
  }, [PublicKey, connection, loading]);

  useEffect(() => {
    if (connection && PublicKey && loading) {
      getStakingAccounts();
    }
  }, [connection, PublicKey]);

  return { stakes };
};

export default useStaking;
