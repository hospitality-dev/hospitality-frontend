import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableSearchableEntities } from "../../types";
import { searchFunction } from "../../utils";

export function useSearch<F>(
  { model, searchQuery }: { model: AvailableSearchableEntities; searchQuery: string },
  options?: Pick<UseQueryOptions<F>, "enabled">
) {
  const userReset = useResetAtom(userAtom);
  return useQuery({
    queryKey: [model, "search", searchQuery],
    queryFn: () => searchFunction<F>({ model, searchQuery, userReset }),
    enabled: options?.enabled === undefined || !!options?.enabled,
  });
}
