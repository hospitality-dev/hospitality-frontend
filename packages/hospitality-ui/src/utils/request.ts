import ky from "ky";
import snakecase from "lodash.snakecase";

import { AvailableEntities, ResponseType } from "../types";
import { formatDataResponseHook } from "./response";

export function getSearchParams<F, R>(fields: F, relations: R) {
  const searchParams = new URLSearchParams();

  if (Array.isArray(fields)) {
    searchParams.append("fields", fields.map((f) => (typeof f === "string" ? snakecase(f) : f)).join(","));
  }
  if (Array.isArray(relations) && relations.length) {
    searchParams.append("relations", relations.map((f) => (typeof f === "string" ? snakecase(f) : f)).join(","));
  }

  return searchParams;
}

export async function fetchFunction<DataType>({
  method = "GET",
  model,
  id,
  searchParams,
  userReset,
}: {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  model: AvailableEntities;
  id?: string;
  searchParams: URLSearchParams;
  userReset: () => void;
}): Promise<DataType> {
  try {
    const result = await ky(`${model}${id ? "/" + id : ""}`, {
      method,
      searchParams,
      prefixUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
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
