import type { CompaniesId } from "./Companies";
import type { LocationsId } from "./Locations";
/** Identifier type for public.companies_locations */
export type CompaniesLocationsId = string & { __brand: "CompaniesLocationsId" };
/** Represents the table public.companies_locations */
export default interface CompaniesLocations {
  id: CompaniesLocationsId;
  companyId: CompaniesId;
  locationId: LocationsId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
/** Represents the initializer for the table public.companies_locations */
export interface CompaniesLocationsInitializer {
  /** Default value: gen_random_uuid() */
  id?: CompaniesLocationsId;
  companyId: CompaniesId;
  locationId: LocationsId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
}
/** Represents the mutator for the table public.companies_locations */
export interface CompaniesLocationsMutator {
  id?: CompaniesLocationsId;
  companyId?: CompaniesId;
  locationId?: LocationsId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
