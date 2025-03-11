import Roles from "./models/public/Roles";
import Users from "./models/public/Users";

export interface User extends Users {
  role: Pick<Roles, "id" | "title">;
}
