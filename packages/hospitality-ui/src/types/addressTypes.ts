import { infer as zodInfer, number, object, record, string } from "zod";

export const AddressesSchema = object({
  features: object({
    type: string(),
    properties: object({
      geocoding: object({
        placeId: number(),
        type: string(),
        label: string(),
        name: string(),
        county: string(),
        state: string(),
        country: string(),
        admin: record(string(), string()),
        extra: record(string(), string()).nullable(),
      }),
    }),
    geometry: object({
      type: string(),
      coordinates: number().array().length(2),
    }),
  }).array(),
});

export type AddressesType = zodInfer<typeof AddressesSchema>;
