import { infer as zodInfer, object, string } from "zod";

import { ContactInitializerSchema, ContactMutatorSchema, ContactSchema } from "./contactTypes";

export const LocationsSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  ownerId: string().uuid().nonempty(),
  companyId: string().uuid().nonempty(),
  contacts: ContactSchema.array().default([]),
});

export const LocationsInitializerSchema = object({
  title: string().nonempty("Title cannot be empty."),
  contacts: ContactInitializerSchema.array().default([]),
});
export const LocationsMutatorSchema = object({
  title: string().optional(),
  contacts: ContactInitializerSchema.or(ContactMutatorSchema).array().default([]),
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
