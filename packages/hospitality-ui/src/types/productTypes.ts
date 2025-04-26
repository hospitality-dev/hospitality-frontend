import { boolean, enum as enum_, infer as zodInfer, number, object, record, string, z } from "zod";

import { VolumeUnitsSchema, WeightUnitsSchema, WidthHeightUnitsSchema } from "./worldTypes";

export const ProductShapeSchema = enum_([
  "can",
  "cardboard_box",
  "metal_box",
  "plastic_box",
  "crate",
  "plastic_bottle",
  "glass_bottle",
  "vacuum_packaging",
  "barrel",
  "plastic_cup",
  "plastic_bag",
  "jar",
  "tube",
  "pouch",
  "sack",
]);

export type ProductShape = z.infer<typeof ProductShapeSchema>;

// #region PRODUCTS

export const ProductsSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  companyId: string().uuid().nullable(),
  description: string().nullable(),
  weight: number().min(0).nullable(),
  volume: number().min(0).nullable(),
  weightUnit: WeightUnitsSchema.nullable(),
  volumeUnit: VolumeUnitsSchema.nullable(),
  barcode: string().max(13).nullable(),
  categoryId: string().uuid().nonempty(),
  subCategoryId: string().uuid().nullable(),
  imageId: string().uuid().nullable(),
  manufacturerId: string().uuid().nullable(),
  brandId: string().uuid().nullable(),
  brandTitle: string().nullish(),
  manufacturerTitle: string().nullish(),
  shape: ProductShapeSchema.nullable(),
  width: string().nullable().optional(),
  height: string().nullable().optional(),
  widthUnit: WidthHeightUnitsSchema.nullable(),
  heightUnit: WidthHeightUnitsSchema.nullable(),
});

export const ProductsInitalizerSchema = object({
  title: string().nonempty("Title cannot be empty."),
  description: string().nullable(),
  weight: number().min(0).nullable(),
  weightUnit: WeightUnitsSchema.nullable(),
  volumeUnit: VolumeUnitsSchema.nullable(),
  volume: number().min(0).nullable(),
  barcode: string().max(13).nullable(),
  categoryId: string().uuid().nonempty("Category must be selected."),
  subCategoryId: string().uuid().nullable(),
  imageId: string().uuid().nullable(),
  manufacturerId: string().uuid().nullable(),
  brandId: string().uuid().nullable(),
});

export const ProductsMutatorSchema = object({
  title: string().nonempty("Title cannot be empty."),
  description: string().nullable(),
  weight: number().min(0).nullable(),
  volume: number().min(0).nullable(),
  weightUnit: WeightUnitsSchema.nullable(),
  volumeUnit: VolumeUnitsSchema.nullable(),
  barcode: string().max(13).nullable(),
  categoryId: string().uuid().nonempty("Category must be selected."),
  subCategoryId: string().uuid().nullable(),
  imageId: string().uuid().nullable(),
});

export const ProductsWithCountSchema = ProductsSchema.extend({ count: number(), hasAboutToExpire: boolean() });
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
  expirationDate: string(),
});

export const LocationsAvailableProductsInitalizerSchema = object({
  productId: string().uuid().nonempty("Product must be selected."),
});

export const LocationsAvailableProductsMutatorSchema = object({
  id: string().uuid().nonempty("Product must be selected."),
  amount: number().min(1, "Cannot be 0"),
  expirationDate: string()
    .nullish()
    .superRefine((arg, ctx) => {
      if (!arg) return arg;
      const [d, m] = arg.split(".");
      const day = Number(d);
      if (day > 31 || day < 1) {
        ctx.addIssue({ code: "custom", message: "Day is invalid." });
      }
      // JS date months are 0-11 (0 is January, etc.)
      const month = Number(m) - 1;
      if (month > 11 || month < 0) {
        ctx.addIssue({ code: "custom", message: "Month is invalid." });
      }
    })
    .transform((arg) => {
      if (!arg) return arg;
      const date = new Date();

      const [d, m, y] = arg.split(".");
      const day = Number(d);
      // JS date months are 0-11 (0 is January, etc.)
      const month = Number(m) - 1;
      const year = Number(y);
      date.setUTCDate(day);
      date.setUTCMonth(month);
      date.setUTCFullYear(year);
      date.setHours(0, 0, 0, 0);
      return date.toISOString();
    }),
});

export const LocationsProductsGroupedByExpirationSchema = object({
  createdAt: string().datetime(),
  productId: string().uuid(),
  expirationDate: string().nullish(),
  purchasedAt: string().nullish(),
  count: number(),
}).merge(ProductsSchema.pick({ weight: true, weightUnit: true, volume: true, volumeUnit: true }));
// #endregion LOCATIONS_AVAILABLE_PRODUCTS

// #region LOCATIONS_PRODUCTS
export const LocationsProductsSchema = object({
  id: string().uuid().nonempty(),
  createdAt: z.string().datetime().nonempty(),
  deletedAt: z.string().datetime(),
  locationId: string().uuid().nonempty(),
  productId: string().uuid().nonempty(),
  expirationDate: string().nullish(),
  packingDate: string().nullish(),
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
export type LocationsProductsGroupedByExpirationType = zodInfer<typeof LocationsProductsGroupedByExpirationSchema>;
