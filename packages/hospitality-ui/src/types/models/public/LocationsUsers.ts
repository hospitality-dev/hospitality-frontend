/** Identifier type for public.locations_users */
export type LocationsUsersId = string & { __brand: "LocationsUsersId" };
/** Represents the table public.locations_users */
export default interface LocationsUsers {
  id: LocationsUsersId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  locationId: string;
  userId: string;
  roleId: string;
}
/** Represents the initializer for the table public.locations_users */
export interface LocationsUsersInitializer {
  /** Default value: gen_random_uuid() */
  id?: LocationsUsersId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  locationId: string;
  userId: string;
  roleId: string;
}
/** Represents the mutator for the table public.locations_users */
export interface LocationsUsersMutator {
  id?: LocationsUsersId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  locationId?: string;
  userId?: string;
  roleId?: string;
}
