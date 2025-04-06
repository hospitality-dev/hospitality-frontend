import { infer as zodInfer, number, object, record, string } from "zod";

export const AddressesSchema = object({
  osmType: string(),
  placeId: number(),
  lat: number(),
  lng: number(),
  type: string(),
  displayName: string(),
  name: string(),
  extratags: record(string(), string()).nullable(),
  namedetails: record(string(), string()).nullable(),
  boundingbox: number().array(),
  address: object({
    houseNumber: string(),
    road: string(),
    neighbourhood: string(),
    suburb: string(),
    city: string(),
    county: string(),
    state: string(),
    postcode: string(),
    country: string(),
    countryCode: string(),
  }),
  geometry: object({
    type: string(),
    coordinates: number().array().length(2),
  }),
});

export type AddressesType = zodInfer<typeof AddressesSchema>;
