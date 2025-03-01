/** Identifier type for public.locations */
export type LocationsId = string & { __brand: "LocationsId" };
/** Represents the table public.locations */
export default interface Locations {
  id: LocationsId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  latitude: string | null;
  longitude: string | null;
}
/** Represents the initializer for the table public.locations */
export interface LocationsInitializer {
  /** Default value: gen_random_uuid() */
  id?: LocationsId;
  title: string;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  latitude?: string | null;
  longitude?: string | null;
}
/** Represents the mutator for the table public.locations */
export interface LocationsMutator {
  id?: LocationsId;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  latitude?: string | null;
  longitude?: string | null;
}
