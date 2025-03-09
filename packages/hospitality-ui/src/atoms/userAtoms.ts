import { atomWithReset } from "jotai/utils";

import { LoginResponse } from "../types";
export const userAtom = atomWithReset<LoginResponse | null>(null);
