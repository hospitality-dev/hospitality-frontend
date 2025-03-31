import { boolean, infer as zodInfer, number, object, record, string, z } from "zod";

// #region PRODUCTS

export const ProductsSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  companyId: string().uuid().nullable(),
  description: string().nullable(),
  weight: number().min(0).nullable(),
  volume: number().min(0).nullable(),
  barcode: string().max(13).nullable(),
  categoryId: string().uuid().nonempty(),
  subCategoryId: string().uuid().nullable(),
  imageId: string().uuid().nullable(),
});

export const ProductsInitalizerSchema = object({
  title: string().nonempty("Title cannot be empty."),
  description: string().nullable(),
  weight: number().min(0).nullable(),
  volume: number().min(0).nullable(),
  barcode: string().max(13).nullable(),
  categoryId: string().uuid().nonempty("Category must be selected."),
  subCategoryId: string().uuid().nullable(),
  imageId: string().uuid().nullable(),
});

export const ProductsMutatorSchema = object({
  title: string().nonempty("Title cannot be empty."),
  description: string().nullable(),
  weight: number().min(0).nullable(),
  volume: number().min(0).nullable(),
  barcode: string().max(13).nullable(),
  categoryId: string().uuid().nonempty("Category must be selected."),
  subCategoryId: string().uuid().nullable(),
  imageId: string().uuid().nullable(),
});

export const ProductsWithCountSchema = ProductsSchema.extend({ count: number() });
// #endregion PRODUCTS

// #region PRODUCTS_CATEGORIES
export const ProductsCategoriesSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  companyId: string().uuid().nullable(),
  parentId: string().uuid().nonempty(),
  isDefault: boolean(),
});

export const ProductsCategoriesInitalizerSchema = object({
  title: string().nonempty("Title cannot be empty."),
  parentId: string().uuid().nullish(),
});

export const ProductsCategoriesMutatorSchema = object({
  title: string().optional(),
  parentId: string().uuid().optional(),
});
// #endregion PRODUCTS_CATEGORIES

// #region LOCATIONS_AVAILABLE_PRODUCTS
export const LocationsAvailableProductsSchema = object({
  id: string().uuid().nonempty(),
  locationId: string().uuid().nonempty(),
  productId: string().uuid().nonempty(),
});

export const LocationsAvailableProductsInitalizerSchema = object({
  productId: string().uuid().nonempty("Product must be selected."),
});

export const LocationsAvailableProductsMutatorSchema = object({
  productId: string().uuid().nonempty("Product must be selected."),
});
// #endregion LOCATIONS_AVAILABLE_PRODUCTS

// #region LOCATIONS_PRODUCTS
export const LocationsProductsSchema = object({
  id: string().uuid().nonempty(),
  createdAt: z.string().datetime().nonempty(),
  deletedAt: z.string().datetime().nonempty(),
  locationId: string().uuid().nonempty(),
  productId: string().uuid().nonempty(),
});

export const LocationsProductsInitalizerSchema = object({
  productId: string().uuid().nonempty("Product must be selected."),
  amount: number().min(1, "Must add at least 1 product."),
});

// #endregion LOCATIONS_PRODUCTS

export const LocationsAvailableProductsSettingsSchema = record(string().uuid(), string().uuid());

export type ProductsType = zodInfer<typeof ProductsSchema>;
export type ProductsInitalizerType = zodInfer<typeof ProductsInitalizerSchema>;
export type ProductsMutatorType = zodInfer<typeof ProductsMutatorSchema>;

export type ProductsCategoriesType = zodInfer<typeof ProductsCategoriesSchema>;
export type ProductsCategoriesInitalizerType = zodInfer<typeof ProductsCategoriesInitalizerSchema>;
export type ProductsCategoriesMutatorType = zodInfer<typeof ProductsCategoriesMutatorSchema>;

export type LocationsAvailableProductsType = zodInfer<typeof LocationsAvailableProductsSchema>;
export type LocationsAvailableProductsInitalizerType = zodInfer<typeof LocationsAvailableProductsInitalizerSchema>;
export type LocationsAvailableProductsMutatorType = zodInfer<typeof LocationsAvailableProductsMutatorSchema>;

export type LocationsProductsMutatorType = zodInfer<typeof LocationsAvailableProductsInitalizerSchema>;

export type LocationsAvailableProductsSettingsType = zodInfer<typeof LocationsAvailableProductsSettingsSchema>;
export type ProductsWithCountType = zodInfer<typeof ProductsWithCountSchema>;
