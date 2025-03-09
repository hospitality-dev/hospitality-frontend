import type { locationsId } from "./Locations";
import type { usersId } from "./Users";
import type { rolesId } from "./Roles";
export type locationsUsersId = string;
/** Represents the table public.locations_users */
export default interface LocationsUsers {
  id: locationsUsersId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  locationId: locationsId;
  userId: usersId;
  roleId: rolesId;
}
/** Represents the initializer for the table public.locations_users */
export interface LocationsUsersInitializer {
  /** Default value: gen_random_uuid() */
  id?: locationsUsersId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  locationId: locationsId;
  userId: usersId;
  roleId: rolesId;
}
/** Represents the mutator for the table public.locations_users */
export interface LocationsUsersMutator {
  id?: locationsUsersId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  locationId?: locationsId;
  userId?: usersId;
  roleId?: rolesId;
}
