import { z } from "zod";

import { userPermissionsSchema } from "../schemas";
import { LocationsType } from "./locationTypes";
import { UsersType } from "./userTypes";

export type LoginParamsType = {
  username: string;
  password: string;
};

export type UserPermissionsType = z.infer<typeof userPermissionsSchema>;

export type LoginResponseType = {
  user: Pick<UsersType, "id" | "firstName" | "lastName" | "username" | "phone" | "email"> & {
    locationId: string | null;
    locationTitle: string | null;
    roleId: string | null;
    role: string | null;
    permissions: UserPermissionsType;
    companyId: string | null;
  };
};

export type AuthLocationType = Pick<LocationsType, "id" | "title" | "companyId">;

export type AuthContextType = {
  auth: LoginResponseType | null;
};
