import { atom } from "jotai";

import { LoginResponse } from "../types";
export const userAtom = atom<LoginResponse | null>(null);
