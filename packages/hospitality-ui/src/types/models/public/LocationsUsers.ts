import type { locationsId } from "./Locations";
import type { usersId } from "./Users";
import type { rolesId } from "./Roles";
export type locationsUsersId = string;
/** Represents the table public.locations_users */
export default interface LocationsUsers {
  id: locationsUsersId;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  location_id: locationsId;
  user_id: usersId;
  role_id: rolesId;
}
/** Represents the initializer for the table public.locations_users */
export interface LocationsUsersInitializer {
  /** Default value: gen_random_uuid() */
  id?: locationsUsersId;
  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
  deleted_at?: Date | null;
  location_id: locationsId;
  user_id: usersId;
  role_id: rolesId;
}
/** Represents the mutator for the table public.locations_users */
export interface LocationsUsersMutator {
  id?: locationsUsersId;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  location_id?: locationsId;
  user_id?: usersId;
  role_id?: rolesId;
}
