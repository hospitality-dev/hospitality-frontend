import {
  array,
  boolean,
  date,
  enum as enum_,
  extend,
  gte,
  infer as zodInfer,
  maxLength,
  nonnegative,
  nullable,
  number,
  object,
  optional,
  overwrite,
  pick,
  record,
  string,
  uuidv4,
} from "@zod/mini";

import { FormattedEntity } from "./utilityTypes";
import { VolumeUnitsSchema, WeightUnitsSchema, WidthHeightUnitsSchema } from "./worldTypes";

export const ProductShapeSchema = enum_([
  "can",
  "cardboard_box",
  "cardboard_bottle",
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

export type ProductShape = zodInfer<typeof ProductShapeSchema>;

// #region PRODUCTS

export const ProductsSchema = object({
  id: uuidv4(),
  title: string(),
  companyId: nullable(uuidv4()),
  description: nullable(string()),
  weight: nullable(number().check(nonnegative())),
  volume: nullable(number().check(nonnegative())),
  weightUnit: nullable(WeightUnitsSchema),
  volumeUnit: nullable(VolumeUnitsSchema),
  barcode: nullable(string().check(maxLength(13))),
  categoryId: uuidv4("Category must be selected."),
  subCategoryId: nullable(uuidv4()),
  imageId: nullable(uuidv4()),
  manufacturerId: nullable(uuidv4()),
  brandId: nullable(uuidv4()),
  shape: nullable(ProductShapeSchema),
  width: optional(nullable(string())),
  height: optional(nullable(string())),
  widthUnit: nullable(WidthHeightUnitsSchema),
  heightUnit: nullable(WidthHeightUnitsSchema),
  availabilityId: nullable(uuidv4()),
  relation__manufacturerTitle: string(),
  relation__brandTitle: nullable(optional(string())),
  relations: object({
    brands: optional(array(enum_(["id", "title"]))),
    manufacturers: optional(array(enum_(["id", "title"]))),
  }),
});

export const ProductsInitalizerSchema = object({
  title: string("Title cannot be empty."),
  description: nullable(string()),
  weight: nullable(number().check(gte(1))),
  weightUnit: nullable(WeightUnitsSchema),
  volumeUnit: nullable(VolumeUnitsSchema),
  volume: nullable(number().check(gte(1))),
  barcode: nullable(string().check(maxLength(13))),
  categoryId: uuidv4("Category must be selected."),
  subCategoryId: nullable(uuidv4()),
  imageId: nullable(uuidv4()),
  manufacturerId: nullable(uuidv4()),
  brandId: nullable(uuidv4()),
});

export const ProductsMutatorSchema = object({
  title: string("Title cannot be empty."),
  description: nullable(string()),
  weight: nullable(number().check(gte(1))),
  weightUnit: nullable(WeightUnitsSchema),
  volumeUnit: nullable(VolumeUnitsSchema),
  volume: nullable(number().check(gte(1))),
  barcode: nullable(string().check(maxLength(13))),
  categoryId: uuidv4("Category must be selected."),
  subCategoryId: nullable(uuidv4()),
  imageId: nullable(uuidv4()),
  manufacturerId: nullable(uuidv4()),
  brandId: nullable(uuidv4()),
});

export const ProductsWithCountSchema = extend(ProductsSchema, {});
// #endregion PRODUCTS

// #region PRODUCTS_CATEGORIES
export const ProductsCategoriesSchema = object({
  id: uuidv4(),
  title: string(),
  companyId: nullable(uuidv4()),
  parentId: uuidv4(),
  isDefault: boolean(),
});

export const ProductsCategoriesInitalizerSchema = object({
  title: string("Title cannot be empty."),
  parentId: nullable(optional(uuidv4())),
});

export const ProductsCategoriesMutatorSchema = object({
  title: optional(string()),
  parentId: optional(uuidv4()),
});
// #endregion PRODUCTS_CATEGORIES

// #region LOCATIONS_AVAILABLE_PRODUCTS
export const LocationsAvailableProductsSchema = object({
  id: uuidv4(),
  locationId: uuidv4(),
  productId: uuidv4(),
  expirationDate: string(),
});

export const LocationsAvailableProductsInitalizerSchema = object({
  productId: uuidv4("Product must be selected."),
});

export const LocationsAvailableProductsMutatorSchema = object({
  id: uuidv4("Product must be selected."),
  amount: number().check(gte(1, "Cannot be 0")),
  expirationDate: nullable(optional(string())).check(
    (arg) => {
      if (arg.value) {
        const [d, m] = arg.value.split(".");
        const day = Number(d);
        if (day > 31 || day < 1) {
          arg.issues.push({ code: "custom", input: arg.value, message: "Day is invalid." });
        }
        // JS date months are 0-11 (0 is January, etc.)
        const month = Number(m) - 1;
        if (month > 11 || month < 0) {
          arg.issues.push({ code: "custom", input: arg.value, message: "Month is invalid." });
        }
      }
    },
    overwrite<string | null>((arg) => {
      if (!arg) return null;
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
    })
  ),
});

export const LocationsProductsGroupedByExpirationSchema = extend(
  object({
    createdAt: date(),
    productId: uuidv4(),
    expirationDate: nullable(optional(string())),
    purchasedAt: nullable(date()),
    count: number(),
  }),
  pick(ProductsSchema, { weight: true, weightUnit: true, volume: true, volumeUnit: true })
);
// #endregion LOCATIONS_AVAILABLE_PRODUCTS

// #region LOCATIONS_PRODUCTS
export const LocationsProductsSchema = object({
  id: uuidv4(),
  createdAt: date(),
  deletedAt: date(),
  locationId: uuidv4(),
  productId: uuidv4(),
  expirationDate: nullable(optional(string())),
  packingDate: nullable(optional(string())),
});

export const LocationsProductsInitalizerSchema = object({
  productId: uuidv4("Product must be selected."),
  amount: number().check(gte(1, "Must add at least 1 product.")),
});

// #endregion LOCATIONS_PRODUCTS

export const LocationsAvailableProductsSettingsSchema = record(uuidv4(), uuidv4());

export type ProductsType = FormattedEntity<zodInfer<typeof ProductsSchema>>;
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
