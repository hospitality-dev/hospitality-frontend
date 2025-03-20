import ky from "ky";
import kebabcase from "lodash.kebabcase";
import snakecase from "lodash.snakecase";

import { AvailableEntities, ResponseType } from "../types";
import { formatDataResponseHook } from "./response";

export function getSearchParams<F, T>(fields: F, filters?: T) {
  const searchParams = new URLSearchParams();

  if (Array.isArray(fields)) {
    searchParams.append("fields", fields.map((f) => (typeof f === "string" ? snakecase(f) : f)).join(","));
  }
  if (filters) {
    searchParams.append("filters", JSON.stringify(filters));
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
      afterResponse: [(_, __, res) => formatDataResponseHook(_, __, res, userReset)],
    },
  }).json<ResponseType<DataType>>();

  return result?.data;
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
        afterResponse: [(_, __, res) => formatDataResponseHook(_, __, res, userReset)],
      },
    }).json<ResponseType<DataType>>();
    return result?.data;
  } catch (error) {
    console.error(error);
    return {} as DataType;
  }
}
