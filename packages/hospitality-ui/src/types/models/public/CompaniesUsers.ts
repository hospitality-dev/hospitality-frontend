import type { CompaniesId } from "./Companies";
import type { UsersId } from "./Users";
import type { RolesId } from "./Roles";
/** Identifier type for public.companies_users */
export type CompaniesUsersId = string & { __brand: "CompaniesUsersId" };
/** Represents the table public.companies_users */
export default interface CompaniesUsers {
  id: CompaniesUsersId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  companyId: CompaniesId;
  userId: UsersId;
  roleId: RolesId | null;
}
/** Represents the initializer for the table public.companies_users */
export interface CompaniesUsersInitializer {
  /** Default value: gen_random_uuid() */
  id?: CompaniesUsersId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  companyId: CompaniesId;
  userId: UsersId;
  roleId?: RolesId | null;
}
/** Represents the mutator for the table public.companies_users */
export interface CompaniesUsersMutator {
  id?: CompaniesUsersId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  companyId?: CompaniesId;
  userId?: UsersId;
  roleId?: RolesId | null;
}
