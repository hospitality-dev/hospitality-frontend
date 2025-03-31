import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { AuthLocationType, LoginResponseType } from "../types";
export const userAtom = atomWithReset<LoginResponseType | null>(null);
export const locationAtom = atom<AuthLocationType | null>(null);
