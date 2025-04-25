import { boolean, infer as zodInfer, object, string } from "zod";

import { ContactSchema } from "./contactTypes";

export const StoresSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  parentId: string().uuid().nonempty(),
  ownerId: string().uuid().nonempty(),
  companyId: string().uuid().nonempty(),
  isDefault: boolean().default(false),
  contacts: ContactSchema.array().default([]),
});

export const StoresInitializerSchema = object({
  title: string().nonempty(),
  contacts: ContactSchema.array().default([]),
});

export const StoresMutatorSchema = object({
  title: string().optional(),
  contacts: ContactSchema.array().optional(),
});

export type StoresType = zodInfer<typeof StoresSchema>;
export type StoresInitalizerType = zodInfer<typeof StoresInitializerSchema>;
export type StoresMutatorType = zodInfer<typeof StoresMutatorSchema>;
