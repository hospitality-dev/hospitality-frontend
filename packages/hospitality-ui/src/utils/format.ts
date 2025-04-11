import { UsersType } from "../types";

export function getUserInfo(user?: Pick<UsersType, "id" | "firstName" | "lastName" | "imageId">) {
  if (!user)
    return {
      id: "",
      imageId: null,
      title: "",
    };
  return {
    id: user.id,
    imageId: user.imageId,
    title: `${user.firstName} ${user.lastName}`,
  };
}
