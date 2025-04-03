import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities, RequestFilters } from "../../types";
import { fetchFunction, getSearchParams } from "../../utils";

export type useListProps<F> = {
  model: AvailableEntities;
  fields: (keyof Omit<F, "created_at" | "updated_at">)[];
  filters?: RequestFilters<F>;
  placeholderData?: F[];
};

export function useList<F>(
  { model, fields, filters, placeholderData = [] }: useListProps<F>,
  options?: Pick<UseQueryOptions<F>, "enabled" | "placeholderData"> & { urlSuffix?: string; searchParams?: string[][] }
) {
  const reset = useResetAtom(userAtom);
  const searchParams = getSearchParams<useListProps<F>["fields"], RequestFilters<F>>(fields, filters);

  if (options?.searchParams && options?.searchParams?.length) {
    for (let index = 0; index < options.searchParams.length; index++) {
      searchParams.append(options.searchParams[index][0], options.searchParams[index][1]);
    }
  }

  return useQuery<F[]>({
    queryKey: [model, "list", fields, filters, options?.urlSuffix || ""].filter(Boolean),
    queryFn: () =>
      fetchFunction<F[]>({
        method: "GET",
        model,
        searchParams,
        userReset: reset,
        urlSuffix: `list${options?.urlSuffix ? `/${options?.urlSuffix}` : ""}`,
      }),
    placeholderData,
    enabled: !!(options?.enabled ?? true),
  });
}
