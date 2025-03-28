import { z } from "zod";

import { userPermissionsSchema } from "../schemas";
import { Locations, Roles, Users } from "./models";

export type LoginParams = {
  username: string;
  password: string;
};

export type UserPermissions = z.infer<typeof userPermissionsSchema>;
export type LoginResponse = {
  user: Pick<Users, "id" | "firstName" | "lastName" | "username" | "phone" | "email"> & {
    locationId: string | null;
    locationTitle: string | null;
    roleId: string | null;
    role: string | null;
    permissions: UserPermissions;
    companyId: string | null;
  };
  locations: {
    locationId: Locations["id"];
    locationTitle: Locations["title"];
    roleId: Roles["id"];
    role: Roles["title"];
    companyId: Locations["companyId"];
  }[];
};

export type AuthContextType = {
  auth: LoginResponse | null;
};
