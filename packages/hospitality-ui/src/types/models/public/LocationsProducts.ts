import type { productsId } from "./Products";
import type { locationsId } from "./Locations";
import type { companiesId } from "./Companies";
export type locationsProductsId = string;
/** Represents the table public.locations_products */
export default interface LocationsProducts {
  id: locationsProductsId;
  count: BigInt;
  product_id: productsId | null;
  location_id: locationsId | null;
  company_id: companiesId | null;
}
/** Represents the initializer for the table public.locations_products */
export interface LocationsProductsInitializer {
  /** Default value: gen_random_uuid() */
  id?: locationsProductsId;
  /** Default value: 0 */
  count?: BigInt;
  product_id?: productsId | null;
  location_id?: locationsId | null;
  company_id?: companiesId | null;
}
/** Represents the mutator for the table public.locations_products */
export interface LocationsProductsMutator {
  id?: locationsProductsId;
  count?: BigInt;
  product_id?: productsId | null;
  location_id?: locationsId | null;
  company_id?: companiesId | null;
}
