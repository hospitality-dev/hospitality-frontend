import ky from "ky";
import kebabcase from "lodash.kebabcase";
import snakecase from "lodash.snakecase";

import {
  AvailableEntities,
  AvailableSearchableEntities,
  FormattedEntity,
  RequestFilters,
  ResponseType,
  TableStateType,
} from "../types";
import { handleUnauthenticated } from "./response";

export function getSearchParams<F>(
  fields: (keyof FormattedEntity<F>)[],
  filters?: RequestFilters<F>,
  sort?: TableStateType<F>["sort"],
  relations?: F extends { relations: infer R } ? R : never
) {
  const searchParams = new URLSearchParams();

  searchParams.append("fields", (fields || []).map((f) => (typeof f === "string" ? snakecase(f) : f)).join(","));
  if (filters) {
    searchParams.append("filters", JSON.stringify(filters));
  }
  if (relations) {
    searchParams.append("relations", JSON.stringify(relations));
  }
  if (sort) {
    searchParams.append("sortField", snakecase(String(sort.field)));
    searchParams.append("sortType", snakecase(sort.type));
  }

  return searchParams;
}

export async function fetchFunction<DataType>({
  method = "GET",
  model,
  id,
  payload,
  searchParams,
  urlSuffix,
  userReset,
}: {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  model: AvailableEntities;
  id?: string;
  payload?: string;
  urlSuffix?: string;
  searchParams?: URLSearchParams;
  userReset: () => void;
}): Promise<DataType> {
  const result = await ky(`${kebabcase(model)}${id ? "/" + id : ""}${urlSuffix ? `/${urlSuffix}` : ""}`, {
    method,
    throwHttpErrors: true,
    headers:
      method !== "GET" && method !== "DELETE"
        ? {
            "Content-Type": "application/json",
          }
        : undefined,
    searchParams,
    prefixUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
    credentials: "include",
    body: payload,
    hooks: {
      afterResponse: [(_, __, res) => handleUnauthenticated(_, __, res, userReset)],
    },
  });
  const contentType = result.headers.get("content-type");
  if (contentType === "application/json") {
    return (await result.json<ResponseType<DataType>>())?.data;
  } else if (contentType === "text/plain") {
    return result.text() as DataType;
  }
  return {} as DataType;
}

export async function authFetchFunction<DataType>({
  method = "GET",
  userReset,
  route,
}: {
  route: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  userReset: () => void;
}): Promise<DataType> {
  try {
    const result = await ky(route, {
      method,
      prefixUrl: `${import.meta.env.VITE_SERVER_URL}/auth`,
      credentials: "include",
      hooks: {
        afterResponse: [(_, __, res) => handleUnauthenticated(_, __, res, userReset)],
      },
    }).json<ResponseType<DataType>>();
    return result?.data;
  } catch (error) {
    console.error(error);
    return {} as DataType;
  }
}

export async function searchFunction<DataType>({
  model,
  searchQuery,
  userReset,
}: {
  model: AvailableSearchableEntities;
  searchQuery: string;
  urlSuffix?: string;
  searchParams?: URLSearchParams;
  userReset: () => void;
}): Promise<DataType> {
  const result = await ky
    .get(`search/${model}`, {
      throwHttpErrors: true,
      searchParams: `search_query=${searchQuery}`,
      prefixUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
      credentials: "include",
      hooks: {
        afterResponse: [(_, __, res) => handleUnauthenticated(_, __, res, userReset)],
      },
    })
    .json<ResponseType<DataType>>();

  return result?.data;
}

export async function uploadFunction<DataType>({
  payload,
  userReset,
  urlSuffix,
}: {
  payload: FormData;
  userReset: () => void;
  urlSuffix?: string;
}): Promise<DataType> {
  const result = await ky(`files${urlSuffix ? `/${urlSuffix}` : ""}`, {
    method: "POST",
    throwHttpErrors: true,
    prefixUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/`,
    credentials: "include",
    body: payload,
    hooks: {
      afterResponse: [(_, __, res) => handleUnauthenticated(_, __, res, userReset)],
    },
  }).json<ResponseType<DataType>>();

  return result?.data;
}

export async function urlFunction({
  id,
  urlPrefix,
  urlSuffix,
  userReset,
  payload,
  method = "GET",
  headers,
}: {
  id?: string;
  urlPrefix?: string;
  urlSuffix?: string;
  userReset: () => void;
  payload?: string;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
}): Promise<string> {
  const result = await ky(`url${urlPrefix ? `/${urlPrefix}` : ""}${id ? `/${id}` : ""}${urlSuffix ? `/${urlSuffix}` : ""}`, {
    method,
    body: payload,
    throwHttpErrors: true,
    prefixUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
    headers: method === "POST" ? { ...(headers || {}), "Content-Type": "application/json" } : headers || undefined,
    credentials: "include",
    hooks: {
      afterResponse: [(_, __, res) => handleUnauthenticated(_, __, res, userReset)],
    },
  });
  return result.text();
}

export async function downloadFunction({ id }: { id: string; userReset: () => void }) {
  const blob = await ky(`files/download/${id}`, {
    method: "GET",
    throwHttpErrors: true,
    prefixUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/`,
    credentials: "include",
  }).blob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Inventory Report.pdf";
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}
