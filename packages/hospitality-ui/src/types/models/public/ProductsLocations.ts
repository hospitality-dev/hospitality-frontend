import type { productsId } from "./Products";
import type { locationsId } from "./Locations";
import type { companiesId } from "./Companies";
export type productsLocationsId = string;
/** Represents the table public.products_locations */
export default interface ProductsLocations {
  id: productsLocationsId;
  count: BigInt;
  productId: productsId | null;
  locationId: locationsId | null;
  companyId: companiesId | null;
}
/** Represents the initializer for the table public.products_locations */
export interface ProductsLocationsInitializer {
  /** Default value: gen_random_uuid() */
  id?: productsLocationsId;
  /** Default value: 0 */
  count?: BigInt;
  productId?: productsId | null;
  locationId?: locationsId | null;
  companyId?: companiesId | null;
}
/** Represents the mutator for the table public.products_locations */
export interface ProductsLocationsMutator {
  id?: productsLocationsId;
  count?: BigInt;
  productId?: productsId | null;
  locationId?: locationsId | null;
  companyId?: companiesId | null;
}
