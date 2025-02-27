import type { idproducts } from "./Products";
import type { idlocations } from "./Locations";
import type { idcompanies } from "./Companies";
/** Identifier type for products_locations */
export type idproducts_locations = string & { __flavor?: "id" };
/** Represents the table public.products_locations */
export default interface ProductsLocations {
  id: idproducts_locations;
  count: BigInt;
  productId: idproducts | null;
  locationId: idlocations | null;
  companyId: idcompanies | null;
}
/** Represents the initializer for the table public.products_locations */
export interface ProductsLocationsInitializer {
  /** Default value: gen_random_uuid() */
  id?: idproducts_locations;
  /** Default value: 0 */
  count?: BigInt;
  productId?: idproducts | null;
  locationId?: idlocations | null;
  companyId?: idcompanies | null;
}
/** Represents the mutator for the table public.products_locations */
export interface ProductsLocationsMutator {
  id?: idproducts_locations;
  count?: BigInt;
  productId?: idproducts | null;
  locationId?: idlocations | null;
  companyId?: idcompanies | null;
}
