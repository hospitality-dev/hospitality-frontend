import type { locationsAvailableProductsId } from "./LocationsAvailableProducts";
import type { locationsId } from "./Locations";
export type locationsProductsId = string;
/** Represents the table public.locations_products */
export default interface LocationsProducts {
  id: locationsProductsId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  availableProductId: locationsAvailableProductsId | null;
  locationId: locationsId;
}
/** Represents the initializer for the table public.locations_products */
export interface LocationsProductsInitializer {
  /** Default value: gen_random_uuid() */
  id?: locationsProductsId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  availableProductId?: locationsAvailableProductsId | null;
  locationId: locationsId;
}
/** Represents the mutator for the table public.locations_products */
export interface LocationsProductsMutator {
  id?: locationsProductsId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  availableProductId?: locationsAvailableProductsId | null;
  locationId?: locationsId;
}
