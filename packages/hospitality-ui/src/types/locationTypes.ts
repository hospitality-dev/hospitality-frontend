import { array, infer as zodInfer, nullable, object, optional, string, uuidv4 } from "@zod/mini";

import { ContactSchema } from "./contactTypes";

export const LocationsSchema = object({
  id: uuidv4(),
  title: string(),
  ownerId: uuidv4(),
  imageId: nullable(optional(uuidv4())),
  companyId: uuidv4(),
  contacts: array(ContactSchema),
});

export const LocationsInitializerSchema = object({
  title: string("Title cannot be empty."),
  contacts: array(ContactSchema),
});
export const LocationsMutatorSchema = object({
  id: uuidv4("Must have id"),
  title: optional(string()),
  contacts: array(ContactSchema),
});
export const LocationsUsersSchema = object({
  id: uuidv4(),
  locationId: uuidv4(),
  userId: uuidv4(),
  roleId: uuidv4(),
});

export const LocationsUsersInitializerSchema = object({
  userId: uuidv4("User must be selected."),
  roleId: uuidv4("Role must be selected."),
});

export type LocationsType = zodInfer<typeof LocationsSchema>;
export type LocationsInitalizerType = zodInfer<typeof LocationsInitializerSchema>;
export type LocationsMutatorType = zodInfer<typeof LocationsMutatorSchema>;

export type LocationsUsersType = zodInfer<typeof LocationsUsersSchema>;
export type LocationsUsersInitalizerType = zodInfer<typeof LocationsUsersInitializerSchema>;
