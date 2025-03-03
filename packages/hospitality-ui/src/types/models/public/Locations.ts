import type { companiesId } from "./Companies";
export type locationsId = string;
/** Represents the table public.locations */
export default interface Locations {
  id: locationsId;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  title: string;
  company_id: companiesId;
  latitude: string | null;
  longitude: string | null;
}
/** Represents the initializer for the table public.locations */
export interface LocationsInitializer {
  /** Default value: gen_random_uuid() */
  id?: locationsId;
  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
  deleted_at?: Date | null;
  title: string;
  company_id: companiesId;
  latitude?: string | null;
  longitude?: string | null;
}
/** Represents the mutator for the table public.locations */
export interface LocationsMutator {
  id?: locationsId;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  title?: string;
  company_id?: companiesId;
  latitude?: string | null;
  longitude?: string | null;
}
