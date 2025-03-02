import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities, FieldKeys, RelationKeys, valueof } from "../../types";
import { fetchFunction, getSearchParams } from "../../utils";

export type useReadProps<F> = {
  id: string;
  model: AvailableEntities;
  fields: Extract<keyof F, FieldKeys<F, "created_at" | "updated_at">>[];
  relations: (keyof RelationKeys<F>)[];
};

export function useRead<F extends Record<keyof F, valueof<F>>>(
  { id, model, fields, relations }: useReadProps<F>,
  options?: Pick<UseQueryOptions<F>, "enabled">
) {
  const reset = useResetAtom(userAtom);
  const searchParams = getSearchParams<useReadProps<F>["fields"], useReadProps<F>["relations"]>(fields, relations);

  return useQuery<F>({
    queryKey: [model, id],
    queryFn: () => fetchFunction<F>({ method: "GET", model, id, searchParams, userReset: reset }),
    enabled: !!(options?.enabled ?? true),
  });
}
