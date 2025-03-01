import type { ProductsId } from "./Products";
import type { LocationsId } from "./Locations";
import type { CompaniesId } from "./Companies";
/** Identifier type for public.products_locations */
export type ProductsLocationsId = string & { __brand: "ProductsLocationsId" };
/** Represents the table public.products_locations */
export default interface ProductsLocations {
  id: ProductsLocationsId;
  count: BigInt;
  productId: ProductsId | null;
  locationId: LocationsId | null;
  companyId: CompaniesId | null;
}
/** Represents the initializer for the table public.products_locations */
export interface ProductsLocationsInitializer {
  /** Default value: gen_random_uuid() */
  id?: ProductsLocationsId;
  /** Default value: 0 */
  count?: BigInt;
  productId?: ProductsId | null;
  locationId?: LocationsId | null;
  companyId?: CompaniesId | null;
}
/** Represents the mutator for the table public.products_locations */
export interface ProductsLocationsMutator {
  id?: ProductsLocationsId;
  count?: BigInt;
  productId?: ProductsId | null;
  locationId?: LocationsId | null;
  companyId?: CompaniesId | null;
}
