import { atom } from "jotai";

import { Users } from "../types/models";
export const userAtom = atom<Users | null>(null);
