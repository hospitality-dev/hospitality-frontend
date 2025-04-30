import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableSearchableEntities, OptionType } from "../../types";
import { formatForOptions, searchFunction } from "../../utils";

export function useSearch<F extends { id: string; title: string }>(
  { model, searchQuery }: { model: AvailableSearchableEntities; searchQuery: string },
  options?: Pick<UseQueryOptions<F>, "enabled" | "select">
) {
  const userReset = useResetAtom(userAtom);
  return useQuery<F[], unknown, OptionType[]>({
    queryKey: [model, "search", searchQuery],
    queryFn: () => searchFunction<F[]>({ model, searchQuery, userReset }),
    enabled: options?.enabled === undefined || !!options?.enabled,
    select: (data) => formatForOptions(data, false),
  });
}
