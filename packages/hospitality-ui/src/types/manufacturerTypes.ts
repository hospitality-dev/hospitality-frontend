import { array, boolean, infer as zodInfer, nullable, object, optional, string, uuidv4 } from "@zod/mini";

import { ContactSchema } from "./contactTypes";

export const ManufacturersSchema = object({
  id: uuidv4(),
  title: string(),
  ownerId: uuidv4(),
  companyId: uuidv4(),
  isDefault: boolean(),
  availabilityId: nullable(uuidv4()),
  contacts: array(ContactSchema),
});

export const ManufacturersInitializerSchema = object({
  title: string(),
  contacts: array(ContactSchema),
});

export const ManufacturersMutatorSchema = object({
  title: optional(string()),
  contacts: optional(array(ContactSchema)),
});

export type ManufacturersType = zodInfer<typeof ManufacturersSchema>;
export type ManufacturersInitalizerType = zodInfer<typeof ManufacturersInitializerSchema>;
export type ManufacturersMutatorType = zodInfer<typeof ManufacturersMutatorSchema>;
