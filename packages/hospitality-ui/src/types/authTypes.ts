import { Locations, Roles, Users } from "./models";

export type LoginParams = {
  username: string;
  password: string;
};

export type LoginResponse = {
  user: Pick<Users, "id" | "firstName" | "lastName" | "username" | "phone" | "email"> & {
    locationId: string | null;
    locationTitle: string | null;
    roleId: string | null;
    role: string | null;
  };
  locations: { locationId: Locations["id"]; locationTitle: Locations["title"]; roleId: Roles["id"]; role: Roles["title"] }[];
};

export type AuthContextType = {
  auth: LoginResponse | null;
};
