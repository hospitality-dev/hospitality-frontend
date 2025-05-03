import { date, infer as zodInfer, number, object, string } from "@zod/mini";

export const PurchasesPerFrequencySchema = object({
  purchasedAt: date(),
  supplierTitle: string(),
  storeTitle: string(),
  total: number(),
});

export type PurchasesPerFrequencyType = zodInfer<typeof PurchasesPerFrequencySchema>;
