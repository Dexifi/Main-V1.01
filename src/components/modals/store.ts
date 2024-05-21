import { atom } from "jotai";
import { Daum, UserAmmPositionType } from "@/applications/Liquidity/type";
import {
  ClmmPoolInfo,
  ClmmPoolPersonalPosition,
} from "@raydium-io/raydium-sdk";

export const selectedPoolAtom = atom<Daum | null>(null);
export const selectedDepositAtom = atom<UserAmmPositionType | null>(null);
export const selectedPositionAtom = atom<ClmmPoolPersonalPosition | null>(null);
export const selectedPositionRowAtom = atom<{
  state: ClmmPoolInfo;
  positionAccount?: ClmmPoolPersonalPosition[] | undefined;
} | null>(null);
