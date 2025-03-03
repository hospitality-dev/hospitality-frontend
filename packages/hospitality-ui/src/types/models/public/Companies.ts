import type { usersId } from "./Users";
import type { imagesId } from "./Images";
export type companiesId = string;
/** Represents the table public.companies */
export default interface Companies {
  id: companiesId;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  title: string;
  owner_id: usersId;
  address: string;
  phone: string;
  email: string;
  date_of_founding: Date | null;
  cin: string | null;
  image_id: imagesId | null;
}
/** Represents the initializer for the table public.companies */
export interface CompaniesInitializer {
  /** Default value: gen_random_uuid() */
  id?: companiesId;
  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
  deleted_at?: Date | null;
  title: string;
  owner_id: usersId;
  address: string;
  phone: string;
  email: string;
  date_of_founding?: Date | null;
  cin?: string | null;
  image_id?: imagesId | null;
}
/** Represents the mutator for the table public.companies */
export interface CompaniesMutator {
  id?: companiesId;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  title?: string;
  owner_id?: usersId;
  address?: string;
  phone?: string;
  email?: string;
  date_of_founding?: Date | null;
  cin?: string | null;
  image_id?: imagesId | null;
}
