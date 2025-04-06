import { infer as zodInfer, number, object, string } from "zod";

export const LocationsSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  ownerId: string().uuid().nonempty(),
  companyId: string().uuid().nonempty(),
  address: string().nullish(),
  boundingBox: number().array().nullish(),
  placeId: number().nullish(),
  phone: string().nullish(),
  email: string().nullish(),
  latitude: number().nullish(),
  longitude: number().nullish(),
});

export const LocationsInitializerSchema = object({
  title: string().nonempty("Title cannot be empty."),
  address: string().nullish(),
  phone: string().nullish(),
  email: string().nullish(),
  latitude: number().nullish(),
  longitude: number().nullish(),
  boundingBox: number().array().nullish(),
  placeId: number().nullish(),
});
export const LocationsMutatorSchema = object({
  title: string().optional(),
  address: string().nullish(),
  phone: string().nullish(),
  email: string().nullish(),
  latitude: number().nullish(),
  longitude: number().nullish(),
  boundingBox: number().array().nullish(),
  placeId: number().nullish(),
});

export const LocationsUsersSchema = object({
  id: string().uuid().nonempty(),
  locationId: string().uuid(),
  userId: string().uuid(),
  roleId: string().uuid(),
});

export const LocationsUsersInitializerSchema = object({
  userId: string().uuid().nonempty("User must be selected."),
  roleId: string().uuid().nonempty("Role must be selected."),
});

export type LocationsType = zodInfer<typeof LocationsSchema>;
export type LocationsInitalizerType = zodInfer<typeof LocationsInitializerSchema>;
export type LocationsMutatorType = zodInfer<typeof LocationsMutatorSchema>;

export type LocationsUsersType = zodInfer<typeof LocationsUsersSchema>;
export type LocationsUsersInitalizerType = zodInfer<typeof LocationsUsersInitializerSchema>;
