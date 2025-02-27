import type { idimages } from "./Images";
/** Identifier type for products */
export type idproducts = string & { __flavor?: "id" };
/** Represents the table public.products */
export default interface Products {
  id: idproducts;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  title: string;
  description: string | null;
  weight: string | null;
  volume: string | null;
  barcode: string | null;
  imageId: idimages | null;
}
/** Represents the initializer for the table public.products */
export interface ProductsInitializer {
  /** Default value: gen_random_uuid() */
  id?: idproducts;
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
  imageId?: idimages | null;
}
/** Represents the mutator for the table public.products */
export interface ProductsMutator {
  id?: idproducts;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  title?: string;
  description?: string | null;
  weight?: string | null;
  volume?: string | null;
  barcode?: string | null;
  imageId?: idimages | null;
}
