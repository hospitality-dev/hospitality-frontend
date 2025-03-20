import { LocationsAvailableProducts, LocationsAvailableProductsSettings } from "../types";
import { fetchFunction, getSearchParams } from "./request";
const locationsAvailableProductsFields: (keyof LocationsAvailableProducts)[] = ["productId"];

export const LocationsAvailableProductsQuery = {
  queryKey: ["locations_available_products"],
  queryFn: () =>
    fetchFunction<LocationsAvailableProductsSettings>({
      method: "GET",
      searchParams: getSearchParams<typeof locationsAvailableProductsFields, null>(locationsAvailableProductsFields),
      userReset: () => {},
      model: "locations_available_products",
    }),
  staleTime: Infinity,
};
