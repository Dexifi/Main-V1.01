import { atom } from "jotai";
import { Daum } from "@/applications/Liquidity/type";
import {
  ClmmPoolInfo,
  ClmmPoolPersonalPosition,
} from "@raydium-io/raydium-sdk";

export const selectedPoolAtom = atom<Daum | null>(null);
export const selectedPositionAtom = atom<ClmmPoolPersonalPosition | null>(null);
export const selectedPositionRowAtom = atom<{
  state: ClmmPoolInfo;
  positionAccount?: ClmmPoolPersonalPosition[] | undefined;
} | null>(null);
