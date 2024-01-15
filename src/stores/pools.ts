import { PublicKey } from "@solana/web3.js";
import { atom } from "jotai";
import { atomFamily, atomWithDefault, selectAtom } from "jotai/utils";
import { publicKeyAtom } from "./wallet";
import { connectionAtom, switchboardAtom } from "./settings";
import { metadataAtom } from "./metadata";
import { selectedObligationAtom } from "./obligations";
import { configAtom } from "./config";
import BigNumber from "bignumber.js";
import {
  createObligationAddress,
  ReserveType,
  fetchPools,
  getReservesOfPool,
  parseLendingMarket,
  parseRateLimiter,
  PoolType,
} from "@solendprotocol/solend-sdk";
import { DEBUG_MODE, PROGRAM_ID } from "@/common/config";
import { atomWithRefresh } from "./shared";

export type ReserveWithMetadataType = ReserveType & {
  symbol: string;
  logo: string | null;
};

export type SelectedReserveType = ReserveType & {
  symbol: string;
  logo: string | null;
};

export type SelectedPoolType = {
  name: string | null;
  address: string;
  reserves: Array<SelectedReserveType>;
};

export const poolsStateAtom = atom<"initial" | "loading" | "error" | "done">(
  (get) =>
    Object.values(get(poolsAtom)).reduce(
      (acc, p) => p.reserves.length + acc,
      0
    ) === 0
      ? "loading"
      : "done"
);

export const poolsAtom = atomWithDefault<
  { [address: string]: PoolType } | Promise<{ [address: string]: PoolType }>
>(async (get) => {
  const config = await get(configAtom);
  return Object.fromEntries(
    config.map((pool) => [
      pool.address,
      {
        name: pool.name,
        authorityAddress: pool.authorityAddress,
        address: pool.address,
        owner: pool.owner,
        reserves: [] as Array<ReserveType>,
      },
    ])
  );
});

export const loadPoolsAtom = atom(
  (get) => {
    get(poolsAtom);
  },
  async (get, set) => {
    const connection = get(connectionAtom);
    const pools = await get(poolsAtom);
    const switchboardProgram = await get(switchboardAtom);
    const currentSlot = await get(currentSlotAtom);

    set(
      poolsAtom,
      await fetchPools(
        Object.values(pools),
        connection,
        switchboardProgram,
        PROGRAM_ID,
        currentSlot,
        DEBUG_MODE
      )
    );
  }
);

export const poolsFamily = atomFamily((address: string) =>
  atom(
    async (get) => {
      return await get(poolsWithMetaDataAtom).then((res) => res.address);
    },
    async (get, set, arg: PoolType) => {
      const prev = await get(poolsAtom);
      set(poolsAtom, { ...prev, [address]: { ...prev[address], ...arg } });
    }
  )
);

export const reserveToMintMapAtom = atom((get) => {
  const pools = get(poolsAtom);

  return Object.fromEntries(
    Object.values(pools)
      .flatMap((pool) => pool.reserves)
      .map((r) => [r.address, r.mintAddress])
  );
});

export const poolsWithMetaDataAtom = atom(async (get) => {
  const metadata = await get(metadataAtom);
  const pools = await get(poolsAtom);

  const data = Object.fromEntries(
    Object.values(pools).map((p) => [
      p.address,
      {
        ...p,
        totalSupplyUsd: p.reserves.reduce(
          (acc, r) => r.totalSupplyUsd.plus(acc),
          BigNumber(0)
        ),
        reserves: p.reserves.map((r) => ({
          ...r,
          symbol: metadata[r.mintAddress]?.symbol,
          logo: metadata[r.mintAddress]?.logoUri,
        })),
      },
    ])
  );

  console.log("poolsWithMetaDataAtom", data);

  return data;
});

export const currentSlotAtom = atomWithRefresh(async (get) => {
  const connection = get(connectionAtom);
  return connection.getSlot();
});

export const rateLimiterAtom = atom(async (get) => {
  const selectedPoolAddress = get(selectedPoolAddressAtom);
  const connection = get(connectionAtom);
  if (!selectedPoolAddress) return null;
  const currentSlot = await get(currentSlotAtom);
  const pool = await connection.getAccountInfo(
    new PublicKey(selectedPoolAddress)
  );
  if (pool) {
    const raterLimiter = parseLendingMarket(
      new PublicKey(selectedPoolAddress),
      pool
    ).info.rateLimiter;

    return parseRateLimiter(raterLimiter, currentSlot);
  }

  return null;
});

export const selectedPoolAddressAtom = atom<string | null | Promise<string>>(
  async (get) => {
    const config = await get(configAtom).then((res) => res);
    const queryParams = new URLSearchParams(window.location.search);
    const poolParam = queryParams.get("pool");

    return poolParam ?? config[0].address;
  }
);

export const selectedReserveAddressAtom = atom<string | null>(null);

export const selectedPoolAtom = atom(
  async (get) => {
    const selectedPoolAddress = await get(selectedPoolAddressAtom);
    if (!selectedPoolAddress) return null;
    const metadata = get(metadataAtom);
    const selectedPool = await get(poolsFamily(selectedPoolAddress));
    return {
      ...selectedPool,
      reserves: selectedPool.reserves.map((r) => {
        const addressString = r.mintAddress;
        const tokenMetadata = metadata[addressString];

        return {
          ...r,
          symbol: tokenMetadata?.symbol,
          logo: tokenMetadata?.logoUri,
        };
      }),
    };
  },
  async (get, set, newSelectedPoolAddress: string | null) => {
    if (!newSelectedPoolAddress) return;
    const connection = await get(connectionAtom);
    const publicKey = await get(publicKeyAtom);
    const switchboardProgram = await get(switchboardAtom);
    const poolToUpdateAtom = poolsFamily(newSelectedPoolAddress);
    if (!poolToUpdateAtom) {
      throw Error("Selected pool not found");
    }

    let newSelectedObligationAddress: string | null = null;
    if (publicKey) {
      newSelectedObligationAddress = await createObligationAddress(
        publicKey,
        newSelectedPoolAddress,
        PROGRAM_ID
      );
    }
    const currentSlot = await get(currentSlotAtom);

    await getReservesOfPool(
      new PublicKey(newSelectedPoolAddress),
      connection,
      switchboardProgram,
      PROGRAM_ID,
      currentSlot,
      DEBUG_MODE
    );

    if (newSelectedObligationAddress) {
      set(selectedObligationAtom, newSelectedObligationAddress);
    }

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("pool", newSelectedPoolAddress);
    const newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();
    window.history.pushState({ path: newurl }, "", newurl);
    // TODO fix async
    set(selectedPoolAddressAtom, newSelectedPoolAddress);
  }
);

export const selectedPoolStateAtom = atom<
  Promise<"initial" | "loading" | "error" | "done">
>(async (get) =>
  ((await get(selectedPoolAtom)?.then((res) => res?.reserves?.length)) ?? 0) ===
  0
    ? "loading"
    : "done"
);

export const unqiueAssetsAtom = selectAtom(
  poolsAtom,
  (pools) => {
    const assets = Object.values(pools).flatMap((p) =>
      p.reserves.map((r) => r.mintAddress)
    );
    return assets.filter((item, pos) => assets.indexOf(item) === pos);
  },
  (a, b) => {
    const sortB = b.sort();
    return (
      Boolean(a.length) && a.sort().every((val, index) => val === sortB[index])
    );
  }
);
