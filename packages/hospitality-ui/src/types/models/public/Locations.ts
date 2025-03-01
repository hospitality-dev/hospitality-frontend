export type locationsId = string;
/** Represents the table public.locations */
export default interface Locations {
  id: locationsId;
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
  id?: locationsId;
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
  id?: locationsId;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  latitude?: string | null;
  longitude?: string | null;
}
