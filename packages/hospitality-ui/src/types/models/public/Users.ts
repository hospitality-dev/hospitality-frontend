import type { imagesId } from "./Images";
export type usersId = string;
/** Represents the table public.users */
export default interface Users {
  id: usersId;
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
  isVerified: boolean;
  imageId: imagesId | null;
}
/** Represents the initializer for the table public.users */
export interface UsersInitializer {
  /** Default value: gen_random_uuid() */
  id?: usersId;
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
  /** Default value: false */
  isVerified?: boolean;
  imageId?: imagesId | null;
}
/** Represents the mutator for the table public.users */
export interface UsersMutator {
  id?: usersId;
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
  isVerified?: boolean;
  imageId?: imagesId | null;
}
