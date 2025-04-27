import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities, FormattedEntity, RequestFilters, TableStateType } from "../../types";
import { fetchFunction, getSearchParams } from "../../utils";

export type useListProps<F> = {
  model: AvailableEntities;
  fields: (keyof FormattedEntity<F>)[];
  filters?: RequestFilters<F>;
  sort?: TableStateType<F>["sort"];
  placeholderData?: F[];
  relations?: F extends { relations: infer R } ? R : never;
};

export function useList<F, O = F>(
  { model, fields, filters, placeholderData = [], sort, relations }: useListProps<F>,
  options?: Pick<UseQueryOptions<F[], Error, O[]>, "enabled" | "placeholderData" | "staleTime" | "select"> & {
    urlSuffix?: string;
    searchParams?: string[][];
  }
) {
  const reset = useResetAtom(userAtom);
  const searchParams = getSearchParams<F>(fields, filters, sort, relations);

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
