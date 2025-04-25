import { infer as zodInfer, number, object, string } from "zod";

import { ProductsSchema } from "./productTypes";

export const PurchasesSchema = object({
  id: string().uuid().nonempty(),
  createdAt: string().datetime().nonempty(),
  deletedAt: string().datetime(),
  purchasedAt: string().datetime().nonempty(),
  companyId: string().uuid().nonempty(),
  locationId: string().uuid().nonempty(),
  ownerId: string().uuid().nonempty(),
  url: string().url().nullable(),
  total: number().min(0).nonnegative(),
  paymentType: number().min(0).max(6).nonnegative(),
  transactionType: number().min(0).max(1).nonnegative(),
  invoiceType: number().min(0).max(4).nonnegative(),
  taxId: string().nullish(),
  invoiceCounterExtension: string().nullish(),
  invoiceNumber: string().nonempty(),
  currencyTitle: string().nonempty(),
});

export const PurchesItemsSchema = object({
  id: string().uuid().nonempty(),
  createdAt: string().datetime().nonempty(),
  deletedAt: string().datetime(),
  title: string().nonempty(),
  companyId: string().uuid().nonempty(),
  locationId: string().uuid().nonempty(),
  parentId: string().uuid().nonempty(),
  ownerId: string().uuid().nonempty(),
  productId: string().uuid(),
  pricePerUnit: number().nonnegative().default(0),
  quantity: number().nonnegative().default(0),
  unitOfMeasurement: string().default("Unknown"),
}).merge(ProductsSchema.pick({ weight: true, weightUnit: true, volume: true, volumeUnit: true }));

export const PurhcaseItemsModifySchema = object({
  products: object({
    productId: string().uuid().nonempty("Only items with a matching product can be modified."),
    expirationDate: string().optional(),
    quantity: number().min(1).nonnegative(),
    unitOfMeasurement: string().default("Unknown"),
  })
    .array()
    .default([]),
});

export type PurchasesType = zodInfer<typeof PurchasesSchema>;
export type PurchaseItemsType = zodInfer<typeof PurchesItemsSchema>;
