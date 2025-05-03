import { array, infer as zodInfer, minLength, nullable, number, object, record, string } from "@zod/mini";

export const AddressesSchema = object({
  osmType: string(),
  placeId: number(),
  lat: number(),
  lng: number(),
  type: string(),
  displayName: string(),
  name: string(),
  extratags: nullable(record(string(), string())),
  namedetails: nullable(record(string(), string())),
  boundingbox: array(number()),
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
    coordinates: array(number()).check(minLength(2)),
  }),
});

export type AddressesType = zodInfer<typeof AddressesSchema>;
