import type { locationsId } from "./Locations";
import type { productsCategoriesId } from "./ProductsCategories";
import type { imagesId } from "./Images";
export type productsId = string;
/** Represents the table public.products */
export default interface Products {
  id: productsId;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  title: string;
  locationId: locationsId;
  description: string | null;
  weight: string | null;
  volume: string | null;
  barcode: string | null;
  categoryId: productsCategoriesId;
  subcategoryId: productsCategoriesId | null;
  imageId: imagesId | null;
}
/** Represents the initializer for the table public.products */
export interface ProductsInitializer {
  /** Default value: gen_random_uuid() */
  id?: productsId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date | null;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  title: string;
  locationId: locationsId;
  description?: string | null;
  weight?: string | null;
  volume?: string | null;
  barcode?: string | null;
  categoryId: productsCategoriesId;
  subcategoryId?: productsCategoriesId | null;
  imageId?: imagesId | null;
}
/** Represents the mutator for the table public.products */
export interface ProductsMutator {
  id?: productsId;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  title?: string;
  locationId?: locationsId;
  description?: string | null;
  weight?: string | null;
  volume?: string | null;
  barcode?: string | null;
  categoryId?: productsCategoriesId;
  subcategoryId?: productsCategoriesId | null;
  imageId?: imagesId | null;
}
