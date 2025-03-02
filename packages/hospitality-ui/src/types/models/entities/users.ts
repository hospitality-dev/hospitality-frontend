import Roles from "../public/Roles";
import Users from "../public/Users";

export interface User extends Users {
  relation__role: Pick<Roles, "id" | "title">;
}
