import type { usersId } from "./Users";
export type companiesId = string;
/** Represents the table public.companies */
export default interface Companies {
  id: companiesId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  title: string;
  ownerId: usersId;
}
/** Represents the initializer for the table public.companies */
export interface CompaniesInitializer {
  /** Default value: gen_random_uuid() */
  id?: companiesId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  title: string;
  ownerId: usersId;
}
/** Represents the mutator for the table public.companies */
export interface CompaniesMutator {
  id?: companiesId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  title?: string;
  ownerId?: usersId;
}
