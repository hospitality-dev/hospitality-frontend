import { atomWithReset } from "jotai/utils";

import { AuthLocationType, LoginResponseType } from "../types";
export const userAtom = atomWithReset<LoginResponseType | null>(null);
export const locationAtom = atomWithReset<AuthLocationType | null>(null);
