import { CountriesType, RolesType } from "../types";
import {
  LocationsAvailableProductsSettingsType,
  LocationsAvailableProductsType,
  ProductsCategoriesType,
} from "../types/productTypes";
import { fetchFunction, getSearchParams } from "./request";
export const locationsAvailableProductsFields: (keyof LocationsAvailableProductsType)[] = ["productId"];
export const productCategoryFields: (keyof ProductsCategoriesType)[] = ["id", "title", "companyId", "parentId", "isDefault"];
export const rolesFields: (keyof RolesType)[] = ["id", "title", "isDefault", "companyId"];

export const LocationsAvailableProductsQuery = {
  queryKey: ["locations_available_products"],
  queryFn: () =>
    fetchFunction<LocationsAvailableProductsSettingsType>({
      method: "GET",
      searchParams: getSearchParams<LocationsAvailableProductsSettingsType>(locationsAvailableProductsFields),
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
      searchParams: getSearchParams<ProductsCategoriesType>(productCategoryFields),
      model: "products_categories",
      urlSuffix: "list",
    }),
  staleTime: 5 * 60 * 1000,
};

export const RolesQuery = {
  queryKey: ["roles", "list"],
  queryFn: () =>
    fetchFunction<RolesType[]>({
      method: "GET",
      userReset: () => {},
      searchParams: getSearchParams<RolesType>(rolesFields),
      model: "roles",
      urlSuffix: "list",
    }),
  staleTime: Infinity,
};

export const CurrenciesQuery = {
  queryKey: ["countries", "list", ["currencyName", "currencySymbol"]],
  queryFn: () =>
    fetchFunction<Pick<CountriesType, "currencyName" | "currencySymbol" | "id">[]>({
      method: "GET",
      userReset: () => {},
      searchParams: getSearchParams<RolesType>(rolesFields),
      model: "countries",
      urlSuffix: "list",
    }),
  staleTime: Infinity,
};
