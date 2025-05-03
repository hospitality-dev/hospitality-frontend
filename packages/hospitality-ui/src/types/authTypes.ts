import { AvailableActions, AvailableEntities } from "./baseTypes";
import { LocationsType } from "./locationTypes";
import { UsersType } from "./userTypes";

export type LoginParamsType = {
  username: string;
  password: string;
};
export type UserPermissionsType = Record<AvailableEntities, Record<AvailableActions, boolean>>;

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
