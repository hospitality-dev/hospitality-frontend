export type productsCategoriesId = string;
/** Represents the table public.products_categories */
export default interface ProductsCategories {
  id: productsCategoriesId;
  title: string;
  parentId: productsCategoriesId | null;
}
/** Represents the initializer for the table public.products_categories */
export interface ProductsCategoriesInitializer {
  /** Default value: gen_random_uuid() */
  id?: productsCategoriesId;
  title: string;
  parentId?: productsCategoriesId | null;
}
/** Represents the mutator for the table public.products_categories */
export interface ProductsCategoriesMutator {
  id?: productsCategoriesId;
  title?: string;
  parentId?: productsCategoriesId | null;
}
