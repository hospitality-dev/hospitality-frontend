import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities, RequestFilters, TableStateType } from "../../types";
import { fetchFunction, getSearchParams } from "../../utils";

export type useListProps<F> = {
  model: AvailableEntities;
  fields: (keyof Omit<F, "created_at" | "updated_at">)[];
  filters?: RequestFilters<F>;
  sort?: TableStateType["sort"];
  placeholderData?: F[];
};

export function useList<F, O = F>(
  { model, fields, filters, placeholderData = [], sort }: useListProps<F>,
  options?: Pick<UseQueryOptions<F[], Error, O[]>, "enabled" | "placeholderData" | "staleTime" | "select"> & {
    urlSuffix?: string;
    searchParams?: string[][];
  }
) {
  const reset = useResetAtom(userAtom);
  const searchParams = getSearchParams<useListProps<F>["fields"], RequestFilters<F>>(fields, filters, sort);

  if (options?.searchParams && options?.searchParams?.length) {
    for (let index = 0; index < options.searchParams.length; index++) {
      searchParams.append(options.searchParams[index][0], options.searchParams[index][1]);
    }
  }

  return useQuery<F[], Error, O[]>({
    queryKey: [model, "list", fields, filters, sort, options?.urlSuffix || ""].filter(Boolean),
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
    staleTime: options?.staleTime,
    select: options?.select,
  });
}
