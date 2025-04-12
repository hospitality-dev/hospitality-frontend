import camelCase from "lodash.camelcase";

import { Icons } from "../enums";
import { ContactTypes, UsersType } from "../types";

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

export function camelCaseContactType(type: ContactTypes) {
  return camelCase(type) as keyof typeof Icons;
}
