import { array, boolean, infer as zodInfer, nullable, object, optional, string, uuidv4 } from "@zod/mini";

import { ContactSchema } from "./contactTypes";

export const BrandsSchema = object({
  id: uuidv4(),
  title: string(),
  isDefault: boolean(),
  companyId: uuidv4(),
  availabilityId: nullable(uuidv4()),
  contacts: array(ContactSchema),
});

export const BrandsInitializerSchema = object({
  title: string(),
  contacts: array(ContactSchema),
});

export const BrandsMutatorSchema = object({
  title: optional(string()),
  contacts: optional(array(ContactSchema)),
});

export type BrandsType = zodInfer<typeof BrandsSchema>;
export type BrandsInitalizerType = zodInfer<typeof BrandsInitializerSchema>;
export type BrandsMutatorType = zodInfer<typeof BrandsMutatorSchema>;
