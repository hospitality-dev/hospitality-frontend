import { infer as zodInfer, number, object, string } from "zod";

export const LocationsSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  ownerId: string().uuid().nonempty(),
  companyId: string().uuid().nonempty(),
  address: string().nullish(),
  phone: string().nullish(),
  email: string().nullish(),
  latitude: number().nullish(),
  longitude: number().nullish(),
});

export const LocationsInitializerSchema = object({
  title: string().nonempty("Location title cannot be empty."),
  address: string().nullish(),
  phone: string().nullish(),
  email: string().nullish(),
  latitude: number().nullish(),
  longitude: number().nullish(),
});
export const LocationsMutatorSchema = object({
  title: string().optional(),
  address: string().nullish(),
  phone: string().nullish(),
  email: string().nullish(),
  latitude: number().nullish(),
  longitude: number().nullish(),
});

export type Locations = zodInfer<typeof LocationsSchema>;
export type LocationsInitalizer = zodInfer<typeof LocationsInitializerSchema>;
export type LocationsMutator = zodInfer<typeof LocationsMutatorSchema>;
