/** Identifier type for locations */
export type idlocations = string & { __flavor?: "id" };
/** Represents the table public.locations */
export default interface Locations {
  id: idlocations;
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
  id?: idlocations;
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
  id?: idlocations;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  latitude?: string | null;
  longitude?: string | null;
}
