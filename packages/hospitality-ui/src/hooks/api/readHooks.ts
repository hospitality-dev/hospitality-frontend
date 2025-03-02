import { queryOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import ky from "ky";

import { AvailableEntities, FieldKeys, RelationKeys, ResponseType, valueof } from "../../types";
import { getSearchParams } from "../../utils";

const serverUrl = import.meta.env.VITE_SERVER_URL;
export type useReadProps<F> = {
  id: string;
  model: AvailableEntities;
  fields: Extract<keyof F, FieldKeys<F, "created_at" | "updated_at">>[];
  relations: (keyof RelationKeys<F>)[];
};

export function getReadQueryOptions<F extends Record<keyof F, valueof<F>>>(
  { id, model, fields, relations }: useReadProps<F>,
  options?: Pick<UseQueryOptions<F>, "enabled">
) {
  const searchParams = getSearchParams<useReadProps<F>["fields"], useReadProps<F>["relations"]>(fields, relations);

  return queryOptions({
    queryKey: [model, id],
    enabled: !!(options?.enabled ?? true),
    queryFn: () =>
      ky
        .get(`${model}/${id}`, {
          searchParams,
          prefixUrl: `${serverUrl}/api/v1`,
          credentials: "include",
          hooks: {
            afterResponse: [
              async (_request, _options, response) => {
                const res = await response.json<ResponseType<F>>();
                if (res.ok) return new Response(JSON.stringify(res));
              },
            ],
          },
        })
        .json<ResponseType<F>>(),
  });
}

export function useRead<F extends Record<keyof F, valueof<F>>>(
  props: useReadProps<F>,
  options?: Pick<UseQueryOptions<F>, "enabled">
) {
  return useQuery(getReadQueryOptions(props, options));
}
