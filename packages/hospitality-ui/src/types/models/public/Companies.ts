import type { ImagesId } from "./Images";
import type { UsersId } from "./Users";
/** Identifier type for public.companies */
export type CompaniesId = string & { __brand: "CompaniesId" };
/** Represents the table public.companies */
export default interface Companies {
  id: CompaniesId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  title: string;
  ownerId: UsersId;
  address: string;
  phone: string;
  email: string;
  dateOfFounding: Date | null;
  cin: string | null;
  imageId: ImagesId | null;
}
/** Represents the initializer for the table public.companies */
export interface CompaniesInitializer {
  /** Default value: gen_random_uuid() */
  id?: CompaniesId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  title: string;
  ownerId: UsersId;
  address: string;
  phone: string;
  email: string;
  dateOfFounding?: Date | null;
  cin?: string | null;
  imageId?: ImagesId | null;
}
/** Represents the mutator for the table public.companies */
export interface CompaniesMutator {
  id?: CompaniesId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  title?: string;
  ownerId?: UsersId;
  address?: string;
  phone?: string;
  email?: string;
  dateOfFounding?: Date | null;
  cin?: string | null;
  imageId?: ImagesId | null;
}
