import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableSearchableEntities } from "../../types";
import { searchFunction } from "../../utils";

export function useSearch<F, R = F>(
  { model, searchQuery }: { model: AvailableSearchableEntities; searchQuery: string },
  options?: Pick<UseQueryOptions<F[], unknown, R[]>, "enabled" | "select">
) {
  const userReset = useResetAtom(userAtom);
  return useQuery<F[], Error, R[]>({
    queryKey: [model, "search", searchQuery],
    queryFn: () => searchFunction<F[]>({ model, searchQuery, userReset }),
    enabled: options?.enabled === undefined || !!options?.enabled,
    select: options?.select,
  });
}
