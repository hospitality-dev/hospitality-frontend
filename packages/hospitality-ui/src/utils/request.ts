import snakecase from "lodash.snakecase";

export function getSearchParams<F, R>(fields: F, relations: R) {
  const searchParams = new URLSearchParams();

  if (Array.isArray(fields)) {
    searchParams.append("fields", fields.map((f) => (typeof f === "string" ? snakecase(f) : f)).join(","));
  }
  if (Array.isArray(relations)) {
    searchParams.append("relations", relations.map((f) => (typeof f === "string" ? snakecase(f) : f)).join(","));
  }

  return searchParams;
}
