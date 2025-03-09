import Roles from "./models/public/Roles";
import Users from "./models/public/Users";

export interface User extends Users {
  relation__role: Pick<Roles, "id" | "title">;
}
