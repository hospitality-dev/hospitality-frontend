import type { imagesId } from "./Images";
export type usersId = string;
/** Represents the table public.users */
export default interface Users {
  id: usersId;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  first_name: string;
  last_name: string;
  username: string;
  pw_hsh: string;
  email: string | null;
  phone: string | null;
  date_of_birth: Date | null;
  date_of_employment: Date | null;
  date_of_termination: Date | null;
  image_id: imagesId | null;
}
/** Represents the initializer for the table public.users */
export interface UsersInitializer {
  /** Default value: gen_random_uuid() */
  id?: usersId;
  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
  deleted_at?: Date | null;
  first_name: string;
  last_name: string;
  username: string;
  pw_hsh: string;
  email?: string | null;
  phone?: string | null;
  date_of_birth?: Date | null;
  date_of_employment?: Date | null;
  date_of_termination?: Date | null;
  image_id?: imagesId | null;
}
/** Represents the mutator for the table public.users */
export interface UsersMutator {
  id?: usersId;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  first_name?: string;
  last_name?: string;
  username?: string;
  pw_hsh?: string;
  email?: string | null;
  phone?: string | null;
  date_of_birth?: Date | null;
  date_of_employment?: Date | null;
  date_of_termination?: Date | null;
  image_id?: imagesId | null;
}
