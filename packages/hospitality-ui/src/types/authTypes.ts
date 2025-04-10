import { z } from "zod";

import { userPermissionsSchema } from "../schemas";
import { LocationsType } from "./locationTypes";
import { RolesType, UsersType } from "./userTypes";

export type LoginParamsType = {
  username: string;
  password: string;
};

export type UserPermissionsType = z.infer<typeof userPermissionsSchema>;
export type AuthLocationType = {
  locationId: LocationsType["id"];
  locationTitle: LocationsType["title"];
  roleId: RolesType["id"];
  role: RolesType["title"];
  companyId: LocationsType["companyId"];
  imageId: string | null;
};
export type LoginResponseType = {
  user: Pick<UsersType, "id" | "firstName" | "lastName" | "username" | "phone" | "email"> & {
    locationId: string | null;
    locationTitle: string | null;
    roleId: string | null;
    role: string | null;
    permissions: UserPermissionsType;
    companyId: string | null;
  };
  locations: AuthLocationType[];
};

export type AuthContextType = {
  auth: LoginResponseType | null;
};
