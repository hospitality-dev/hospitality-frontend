import { LocationsAvailableProducts, LocationsAvailableProductsSettings, ProductsCategories } from "../types";
import { fetchFunction, getSearchParams } from "./request";
export const locationsAvailableProductsFields: (keyof LocationsAvailableProducts)[] = ["productId"];
export const productCategoryFields: (keyof ProductsCategories)[] = ["id", "title", "companyId", "parentId", "isDefault"];

export const LocationsAvailableProductsQuery = {
  queryKey: ["locations_available_products"],
  queryFn: () =>
    fetchFunction<LocationsAvailableProductsSettings>({
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
    fetchFunction<ProductsCategories[]>({
      method: "GET",
      userReset: () => {},
      searchParams: getSearchParams<typeof productCategoryFields, ProductsCategories>(productCategoryFields),
      model: "products_categories",
      urlSuffix: "list",
    }),
  staleTime: 5 * 60 * 1000,
};
