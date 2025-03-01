import type { companiesId } from "./Companies";
import type { usersId } from "./Users";
import type { rolesId } from "./Roles";
export type companiesUsersId = string;
/** Represents the table public.companies_users */
export default interface CompaniesUsers {
  id: companiesUsersId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  companyId: companiesId;
  userId: usersId;
  roleId: rolesId | null;
}
/** Represents the initializer for the table public.companies_users */
export interface CompaniesUsersInitializer {
  /** Default value: gen_random_uuid() */
  id?: companiesUsersId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  companyId: companiesId;
  userId: usersId;
  roleId?: rolesId | null;
}
/** Represents the mutator for the table public.companies_users */
export interface CompaniesUsersMutator {
  id?: companiesUsersId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  companyId?: companiesId;
  userId?: usersId;
  roleId?: rolesId | null;
}
