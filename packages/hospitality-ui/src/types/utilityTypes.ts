export type valueof<T> = T[keyof T];

export type RelationKeys<T> = {
  [K in keyof T as K extends `relation__${infer R}` ? R : never]: T[K];
};

export type FieldKeys<T, Excluded extends "created_at" | "updated_at"> = Exclude<
  {
    [K in keyof T]: K extends `relation__${string}` ? never : K;
  }[keyof T],
  Excluded
>;
