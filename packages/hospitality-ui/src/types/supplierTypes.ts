import { array, boolean, infer as zodInfer, object, optional, string, uuidv4 } from "@zod/mini";

import { ContactSchema } from "./contactTypes";

export const SuppliersSchema = object({
  id: uuidv4(),
  title: string(),
  ownerId: uuidv4(),
  companyId: uuidv4(),
  isDefault: boolean(),
  contacts: array(ContactSchema),
});

export const SuppliersInitializerSchema = object({
  title: string(),
  contacts: optional(array(ContactSchema)),
});

export const SuppliersMutatorSchema = object({
  id: uuidv4(),
  title: optional(string()),
  contacts: optional(array(ContactSchema)),
});

export type SuppliersType = zodInfer<typeof SuppliersSchema>;
export type SuppliersInitalizerType = zodInfer<typeof SuppliersInitializerSchema>;
export type SuppliersMutatorType = zodInfer<typeof SuppliersMutatorSchema>;
