import { Users } from "./models";

export type LoginParams = {
  username: string;
  password: string;
};

export type LoginResponse = Pick<Users, "id" | "firstName" | "lastName" | "username" | "phone" | "email">;
