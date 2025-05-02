import { useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities, AvailableStatisticsFrequencies, AvailableStatisticsTypes, FormattedEntity } from "../../types";
import { fetchFunction, getSearchParams, statisticsFunction, urlFunction } from "../../utils";

export type useReadProps<F> = {
  id: string;
  model: AvailableEntities;
  fields: (keyof FormattedEntity<F>)[];
};

export function useRead<F>(
  { id, model, fields }: useReadProps<F>,
  options?: Pick<UseQueryOptions<F>, "enabled" | "staleTime"> & { urlSuffix?: string }
) {
  const reset = useResetAtom(userAtom);
  const searchParams = getSearchParams<F>(fields);

  return useQuery<F>({
    queryKey: [model, "list", fields, options?.urlSuffix || ""].filter(Boolean),
    queryFn: () =>
      fetchFunction<F>({ method: "GET", model, id, searchParams, userReset: reset, urlSuffix: options?.urlSuffix || "" }),
    enabled: !!(options?.enabled ?? true),
    staleTime: options?.staleTime,
  });
}

export function useImage(id: string, options?: Pick<UseQueryOptions, "enabled"> & { urlSuffix?: string }) {
  const queryKey = ["files", "images", id];
  const queryClient = useQueryClient();
  const reset = useResetAtom(userAtom);
  const hasData = !!queryClient.getQueryData<string>(queryKey);

  return useQuery<string>({
    queryKey,
    queryFn: () =>
      urlFunction({
        id,
        userReset: reset,
        headers: hasData ? { "Cache-Control": "no-cache" } : undefined,
        urlSuffix: options?.urlSuffix || "",
      }),
    enabled: !!(options?.enabled ?? true),
    staleTime: 60 * 60 * 8 * 1000,
  });
}

export function useStatistics<F>(
  { type, frequency }: { type: AvailableStatisticsTypes; frequency: AvailableStatisticsFrequencies },
  options?: Pick<UseQueryOptions<F[]>, "enabled" | "staleTime"> & { urlSuffix?: string }
) {
  const reset = useResetAtom(userAtom);

  return useQuery<F[]>({
    queryKey: [type, frequency, "statistics", options?.urlSuffix || ""].filter(Boolean),
    queryFn: () =>
      statisticsFunction<F[]>({
        type,
        frequency,
        userReset: reset,
        urlSuffix: options?.urlSuffix || "",
      }),
    enabled: !!(options?.enabled ?? true),
    staleTime: options?.staleTime,
  });
}
