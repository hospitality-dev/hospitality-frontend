import type { companiesId } from "./Companies";
export type productsCategoriesId = string;
/** Represents the table public.products_categories */
export default interface ProductsCategories {
  id: productsCategoriesId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  title: string;
  parentId: productsCategoriesId | null;
  companyId: companiesId | null;
  isDefault: boolean;
}
/** Represents the initializer for the table public.products_categories */
export interface ProductsCategoriesInitializer {
  /** Default value: gen_random_uuid() */
  id?: productsCategoriesId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  title: string;
  parentId?: productsCategoriesId | null;
  companyId?: companiesId | null;
  isDefault: boolean;
}
/** Represents the mutator for the table public.products_categories */
export interface ProductsCategoriesMutator {
  id?: productsCategoriesId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  title?: string;
  parentId?: productsCategoriesId | null;
  companyId?: companiesId | null;
  isDefault?: boolean;
}
