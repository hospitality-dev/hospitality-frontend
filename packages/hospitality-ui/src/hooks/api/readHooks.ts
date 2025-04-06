import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities } from "../../types";
import { fetchFunction, getSearchParams } from "../../utils";

export type useReadProps<F> = {
  id: string;
  model: AvailableEntities;
  fields: (keyof Omit<F, "created_at" | "updated_at">)[];
};

export function useRead<F>(
  { id, model, fields }: useReadProps<F>,
  options?: Pick<UseQueryOptions<F>, "enabled"> & { urlSuffix?: string }
) {
  const reset = useResetAtom(userAtom);
  const searchParams = getSearchParams<useReadProps<F>["fields"], F>(fields);

  return useQuery<F>({
    queryKey: [model, id],
    queryFn: () =>
      fetchFunction<F>({ method: "GET", model, id, searchParams, userReset: reset, urlSuffix: options?.urlSuffix || "" }),
    enabled: !!(options?.enabled ?? true),
  });
}
