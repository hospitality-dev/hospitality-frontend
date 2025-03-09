import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities, FieldKeys, FormattedEntity, RelationKeys, valueof } from "../../types";
import { fetchFunction, getSearchParams } from "../../utils";

export type useListProps<F> = {
  model: AvailableEntities;
  fields: Extract<keyof F, FieldKeys<F, "created_at" | "updated_at">>[];
  relations: (keyof RelationKeys<F>)[];
};

export function useList<F extends Record<keyof F, valueof<F>>>(
  { model, fields, relations }: useListProps<F>,
  options?: Pick<UseQueryOptions<F>, "enabled">
) {
  const reset = useResetAtom(userAtom);
  const searchParams = getSearchParams<useListProps<F>["fields"], useListProps<F>["relations"]>(fields, relations);

  return useQuery<FormattedEntity<F>[]>({
    queryKey: [model, "list"],
    queryFn: () => fetchFunction<FormattedEntity<F>[]>({ method: "GET", model, searchParams, userReset: reset }),
    enabled: !!(options?.enabled ?? true),
  });
}
