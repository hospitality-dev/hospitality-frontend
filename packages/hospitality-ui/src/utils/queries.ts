import {
  LocationsAvailableProductsSettingsType,
  LocationsAvailableProductsType,
  ProductsCategoriesType,
} from "../types/productTypes";
import { fetchFunction, getSearchParams } from "./request";
export const locationsAvailableProductsFields: (keyof LocationsAvailableProductsType)[] = ["productId"];
export const productCategoryFields: (keyof ProductsCategoriesType)[] = ["id", "title", "companyId", "parentId", "isDefault"];

export const LocationsAvailableProductsQuery = {
  queryKey: ["locations_available_products"],
  queryFn: () =>
    fetchFunction<LocationsAvailableProductsSettingsType>({
      method: "GET",
      searchParams: getSearchParams<typeof locationsAvailableProductsFields, null>(locationsAvailableProductsFields),
      userReset: () => {},
      model: "locations_available_products",
      // * exceptions since this is neither reading a specific entity
      // * nor is it listing
      id: "00000000-0000-0000-0000-000000000000",
    }),
  staleTime: Infinity,
};

export const ProductCategoriesQuery = {
  queryKey: ["products_categories", "list"],
  queryFn: () =>
    fetchFunction<ProductsCategoriesType[]>({
      method: "GET",
      userReset: () => {},
      searchParams: getSearchParams<typeof productCategoryFields, ProductsCategoriesType>(productCategoryFields),
      model: "products_categories",
      urlSuffix: "list",
    }),
  staleTime: 5 * 60 * 1000,
};
