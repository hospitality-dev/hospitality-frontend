import {
  array,
  date,
  extend,
  gt,
  gte,
  infer as zodInfer,
  lte,
  nullable,
  number,
  object,
  optional,
  pick,
  string,
  url,
  uuidv4,
} from "@zod/mini";

import { ProductsSchema } from "./productTypes";

export const PurchasesSchema = object({
  id: uuidv4(),
  createdAt: date(),
  deletedAt: nullable(date()),
  purchasedAt: date(),
  companyId: uuidv4(),
  locationId: uuidv4(),
  ownerId: uuidv4(),
  url: url(),
  total: number().check(gt(0)),
  paymentType: number().check(gte(0), lte(6)),
  transactionType: number().check(gte(0), lte(1)),
  invoiceType: number().check(gte(0), lte(4)),
  taxId: nullable(optional(string())),
  invoiceCounterExtension: nullable(optional(string())),
  invoiceNumber: string(),
  currencyTitle: string(),
});

export const PurchesItemsSchema = extend(
  object({
    id: uuidv4(),
    createdAt: date(),
    deletedAt: nullable(date()),
    title: string(),
    companyId: uuidv4(),
    locationId: uuidv4(),
    parentId: uuidv4(),
    ownerId: uuidv4(),
    productId: uuidv4(),
    pricePerUnit: number().check(gt(0)),
    quantity: number().check(gt(0)),
    unitOfMeasurement: string(),
  }),
  pick(ProductsSchema, { weight: true, weightUnit: true, volume: true, volumeUnit: true })
);

export const PurhcaseItemsModifySchema = object({
  products: array(
    object({
      id: nullable(uuidv4()),
      productId: uuidv4("Only items with a matching product can be modified."),
      expirationDate: optional(string()),
      quantity: number().check(gte(1)),
      unitOfMeasurement: string(),
    })
  ),
});

export type PurchasesType = zodInfer<typeof PurchasesSchema>;
export type PurchaseItemsType = zodInfer<typeof PurchesItemsSchema>;
