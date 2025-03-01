import type { ImagesId } from "./Images";
import type { CompaniesId } from "./Companies";
/** Identifier type for public.users */
export type UsersId = string & { __brand: "UsersId" };
/** Represents the table public.users */
export default interface Users {
  id: UsersId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  firstName: string;
  lastName: string;
  username: string;
  email: string | null;
  phone: string | null;
  dateOfBirth: Date | null;
  dateOfEmployment: Date | null;
  dateOfTermination: Date | null;
  imageId: ImagesId | null;
  defaultCompanyId: CompaniesId;
}
/** Represents the initializer for the table public.users */
export interface UsersInitializer {
  /** Default value: gen_random_uuid() */
  id?: UsersId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  firstName: string;
  lastName: string;
  username: string;
  email?: string | null;
  phone?: string | null;
  dateOfBirth?: Date | null;
  dateOfEmployment?: Date | null;
  dateOfTermination?: Date | null;
  imageId?: ImagesId | null;
  defaultCompanyId: CompaniesId;
}
/** Represents the mutator for the table public.users */
export interface UsersMutator {
  id?: UsersId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string | null;
  phone?: string | null;
  dateOfBirth?: Date | null;
  dateOfEmployment?: Date | null;
  dateOfTermination?: Date | null;
  imageId?: ImagesId | null;
  defaultCompanyId?: CompaniesId;
}
