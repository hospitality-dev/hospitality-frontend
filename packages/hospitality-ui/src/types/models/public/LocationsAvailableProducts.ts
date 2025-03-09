import type { productsId } from "./Products";
import type { locationsId } from "./Locations";
export type locationsAvailableProductsId = string;
/** Represents the table public.locations_available_products */
export default interface LocationsAvailableProducts {
  id: locationsAvailableProductsId;
  productId: productsId;
  locationId: locationsId;
}
/** Represents the initializer for the table public.locations_available_products */
export interface LocationsAvailableProductsInitializer {
  /** Default value: gen_random_uuid() */
  id?: locationsAvailableProductsId;
  productId: productsId;
  locationId: locationsId;
}
/** Represents the mutator for the table public.locations_available_products */
export interface LocationsAvailableProductsMutator {
  id?: locationsAvailableProductsId;
  productId?: productsId;
  locationId?: locationsId;
}
