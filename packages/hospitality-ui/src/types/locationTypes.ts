import { infer as zodInfer, object, string } from "zod";

import { ContactSchema } from "./contactTypes";

export const LocationsSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  ownerId: string().uuid().nonempty(),
  imageId: string().uuid().nullish(),
  companyId: string().uuid().nonempty(),
  contacts: ContactSchema.array().default([]),
});

export const LocationsInitializerSchema = object({
  title: string().nonempty("Title cannot be empty."),
  contacts: ContactSchema.array(),
});
export const LocationsMutatorSchema = object({
  id: string().uuid().nonempty("Must have id"),
  title: string().nonempty("Location title cannot be empty.").optional(),
  contacts: ContactSchema.array(),
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
