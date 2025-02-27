import type { idcompanies } from "./Companies";
import type { idlocations } from "./Locations";
/** Identifier type for companies_locations */
export type idcompanies_locations = string & { __flavor?: "id" };
/** Represents the table public.companies_locations */
export default interface CompaniesLocations {
  id: idcompanies_locations;
  companyId: idcompanies;
  locationId: idlocations;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
/** Represents the initializer for the table public.companies_locations */
export interface CompaniesLocationsInitializer {
  /** Default value: gen_random_uuid() */
  id?: idcompanies_locations;
  companyId: idcompanies;
  locationId: idlocations;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
}
/** Represents the mutator for the table public.companies_locations */
export interface CompaniesLocationsMutator {
  id?: idcompanies_locations;
  companyId?: idcompanies;
  locationId?: idlocations;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
