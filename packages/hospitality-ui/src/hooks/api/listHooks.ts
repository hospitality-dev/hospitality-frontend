import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities, valueof } from "../../types";
import { fetchFunction, getSearchParams } from "../../utils";

export type useListProps<F> = {
  model: AvailableEntities;
  placeholderData?: F[];
  fields: (keyof Omit<F, "created_at" | "updated_at">)[];
};

export function useList<F extends Record<keyof F, valueof<F>>>(
  { model, fields, placeholderData = [] }: useListProps<F>,
  options?: Pick<UseQueryOptions<F>, "enabled" | "placeholderData"> & { urlSuffix?: string }
) {
  const reset = useResetAtom(userAtom);
  const searchParams = getSearchParams<useListProps<F>["fields"]>(fields);

  return useQuery<F[]>({
    queryKey: [model, "list", options?.urlSuffix || ""],
    queryFn: () => fetchFunction<F[]>({ method: "GET", model, searchParams, userReset: reset, urlSuffix: options?.urlSuffix }),
    placeholderData,
    enabled: !!(options?.enabled ?? true),
  });
}
