import type { ImagesId } from "./Images";
/** Identifier type for public.products */
export type ProductsId = string & { __brand: "ProductsId" };
/** Represents the table public.products */
export default interface Products {
  id: ProductsId;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  title: string;
  description: string | null;
  weight: string | null;
  volume: string | null;
  barcode: string | null;
  imageId: ImagesId | null;
}
/** Represents the initializer for the table public.products */
export interface ProductsInitializer {
  /** Default value: gen_random_uuid() */
  id?: ProductsId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date | null;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  title: string;
  description?: string | null;
  weight?: string | null;
  volume?: string | null;
  barcode?: string | null;
  imageId?: ImagesId | null;
}
/** Represents the mutator for the table public.products */
export interface ProductsMutator {
  id?: ProductsId;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  title?: string;
  description?: string | null;
  weight?: string | null;
  volume?: string | null;
  barcode?: string | null;
  imageId?: ImagesId | null;
}
