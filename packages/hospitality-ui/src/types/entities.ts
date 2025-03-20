import { Products } from "./models";
import Roles from "./models/public/Roles";
import Users from "./models/public/Users";

export interface User extends Users {
  role: Pick<Roles, "id" | "title">;
}

export type LocationsAvailableProductsSettings = Record<string, string>;

export interface ProductsWithCount extends Products {
  count: number;
}
