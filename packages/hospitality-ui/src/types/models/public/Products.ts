import type { imagesId } from "./Images";
export type productsId = string;
/** Represents the table public.products */
export default interface Products {
  id: productsId;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
  title: string;
  description: string | null;
  weight: string | null;
  volume: string | null;
  barcode: string | null;
  image_id: imagesId | null;
}
/** Represents the initializer for the table public.products */
export interface ProductsInitializer {
  /** Default value: gen_random_uuid() */
  id?: productsId;
  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date | null;
  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date | null;
  deleted_at?: Date | null;
  title: string;
  description?: string | null;
  weight?: string | null;
  volume?: string | null;
  barcode?: string | null;
  image_id?: imagesId | null;
}
/** Represents the mutator for the table public.products */
export interface ProductsMutator {
  id?: productsId;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  title?: string;
  description?: string | null;
  weight?: string | null;
  volume?: string | null;
  barcode?: string | null;
  image_id?: imagesId | null;
}
