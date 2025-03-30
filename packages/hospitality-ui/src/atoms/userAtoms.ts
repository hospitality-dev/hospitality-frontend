import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { AuthLocation, LoginResponse } from "../types";
export const userAtom = atomWithReset<LoginResponse | null>(null);
export const locationAtom = atom<AuthLocation | null>(null);
