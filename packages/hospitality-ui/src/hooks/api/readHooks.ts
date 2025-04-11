import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities } from "../../types";
import { fetchFunction, getSearchParams, urlFunction } from "../../utils";

export type useReadProps<F> = {
  id: string;
  model: AvailableEntities;
  fields: (keyof Omit<F, "created_at" | "updated_at">)[];
};

export function useRead<F>(
  { id, model, fields }: useReadProps<F>,
  options?: Pick<UseQueryOptions<F>, "enabled" | "staleTime"> & { urlSuffix?: string }
) {
  const reset = useResetAtom(userAtom);
  const searchParams = getSearchParams<useReadProps<F>["fields"], F>(fields);

  return useQuery<F>({
    queryKey: [model, "list", fields, options?.urlSuffix || ""].filter(Boolean),
    queryFn: () =>
      fetchFunction<F>({ method: "GET", model, id, searchParams, userReset: reset, urlSuffix: options?.urlSuffix || "" }),
    enabled: !!(options?.enabled ?? true),
    staleTime: options?.staleTime,
  });
}

export function useImage(id: string, options?: Pick<UseQueryOptions, "enabled"> & { urlSuffix?: string }) {
  const reset = useResetAtom(userAtom);
  return useQuery<string>({
    queryKey: ["files", id],
    queryFn: () => urlFunction({ id, userReset: reset, urlSuffix: options?.urlSuffix || "" }),
    enabled: !!(options?.enabled ?? true),
    staleTime: 60 * 60 * 8 * 1000,
  });
}
