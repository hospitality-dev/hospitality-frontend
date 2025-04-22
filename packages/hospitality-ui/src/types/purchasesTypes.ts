import { infer as zodInfer, number, object, string } from "zod";

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
  address: string().nullish(),
  businessTitle: string().nonempty(),
  businessLocationTitle: string().nullish(),
  taxId: string().nullish(),
  invoiceCounterExtension: string().nullish(),
  invoiceNumber: string().nonempty(),
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
});

export type PurchasesType = zodInfer<typeof PurchasesSchema>;
export type PurchaseItemsType = zodInfer<typeof PurchesItemsSchema>;
