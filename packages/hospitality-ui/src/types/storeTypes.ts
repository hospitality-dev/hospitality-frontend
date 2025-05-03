import { array, boolean, infer as zodInfer, object, optional, string, uuidv4 } from "@zod/mini";

import { ContactSchema } from "./contactTypes";

export const StoresSchema = object({
  id: uuidv4(),
  title: string(),
  parentId: uuidv4(),
  ownerId: uuidv4(),
  companyId: uuidv4(),
  isDefault: boolean(),
  contacts: array(ContactSchema),
});

export const StoresInitializerSchema = object({
  title: string(),
  contacts: array(ContactSchema),
});

export const StoresMutatorSchema = object({
  title: optional(string()),
  contacts: optional(array(ContactSchema)),
});

export type StoresType = zodInfer<typeof StoresSchema>;
export type StoresInitalizerType = zodInfer<typeof StoresInitializerSchema>;
export type StoresMutatorType = zodInfer<typeof StoresMutatorSchema>;
