import { boolean, infer as zodInfer, object, string } from "zod";

import { ContactSchema } from "./contactTypes";

export const ManufacturersSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  ownerId: string().uuid().nonempty(),
  companyId: string().uuid().nonempty(),
  isDefault: boolean().default(false),
  availabilityId: string().uuid().nullable().default(null),
  contacts: ContactSchema.array().default([]),
});

export const ManufacturersInitializerSchema = object({
  title: string().nonempty(),
  contacts: ContactSchema.array().default([]),
});

export const ManufacturersMutatorSchema = object({
  title: string().optional(),
  contacts: ContactSchema.array().optional(),
});

export type ManufacturersType = zodInfer<typeof ManufacturersSchema>;
export type ManufacturersInitalizerType = zodInfer<typeof ManufacturersInitializerSchema>;
export type ManufacturersMutatorType = zodInfer<typeof ManufacturersMutatorSchema>;
