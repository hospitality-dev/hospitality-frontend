import { UsersType } from "../types";

export function getUserInfo(user: Pick<UsersType, "id" | "firstName" | "lastName">) {
  return {
    id: user.id,
    title: `${user.firstName} ${user.lastName}`,
  };
}
