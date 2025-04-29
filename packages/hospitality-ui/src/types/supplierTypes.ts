import { boolean, infer as zodInfer, object, string } from "zod";

import { ContactSchema } from "./contactTypes";

export const SuppliersSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  ownerId: string().uuid().nonempty(),
  companyId: string().uuid().nonempty(),
  isDefault: boolean().default(false),
  contacts: ContactSchema.array().default([]),
});

export const SuppliersInitializerSchema = object({
  title: string().nonempty(),
  contacts: ContactSchema.array().default([]).optional(),
});

export const SuppliersMutatorSchema = object({
  id: string().uuid(),
  title: string().optional(),
  contacts: ContactSchema.array().optional(),
});

export type SuppliersType = zodInfer<typeof SuppliersSchema>;
export type SuppliersInitalizerType = zodInfer<typeof SuppliersInitializerSchema>;
export type SuppliersMutatorType = zodInfer<typeof SuppliersMutatorSchema>;
