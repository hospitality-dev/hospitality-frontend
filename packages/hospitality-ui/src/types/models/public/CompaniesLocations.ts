import type { companiesId } from "./Companies";
import type { locationsId } from "./Locations";
export type companiesLocationsId = string;
/** Represents the table public.companies_locations */
export default interface CompaniesLocations {
  id: companiesLocationsId;
  companyId: companiesId;
  locationId: locationsId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
/** Represents the initializer for the table public.companies_locations */
export interface CompaniesLocationsInitializer {
  /** Default value: gen_random_uuid() */
  id?: companiesLocationsId;
  companyId: companiesId;
  locationId: locationsId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
}
/** Represents the mutator for the table public.companies_locations */
export interface CompaniesLocationsMutator {
  id?: companiesLocationsId;
  companyId?: companiesId;
  locationId?: locationsId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
