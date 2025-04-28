import { CountriesType, RolesType } from "../types";
import { ProductsCategoriesType } from "../types/productTypes";
import { fetchFunction, getSearchParams } from "./request";
export const productCategoryFields: (keyof ProductsCategoriesType)[] = ["id", "title", "companyId", "parentId", "isDefault"];
export const rolesFields: (keyof RolesType)[] = ["id", "title", "isDefault", "companyId"];

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
