import { boolean, infer as zodInfer, object, string } from "zod";

import { ContactSchema } from "./contactTypes";

export const BrandsSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  isDefault: boolean().default(false),
  companyId: string().uuid().nonempty(),
  contacts: ContactSchema.array().default([]),
});

export const BrandsInitializerSchema = object({
  title: string().nonempty(),
  contacts: ContactSchema.array().default([]),
});

export const BrandsMutatorSchema = object({
  title: string().optional(),
  contacts: ContactSchema.array().optional(),
});

export type BrandsType = zodInfer<typeof BrandsSchema>;
export type BrandsInitalizerType = zodInfer<typeof BrandsInitializerSchema>;
export type BrandsMutatorType = zodInfer<typeof BrandsMutatorSchema>;
