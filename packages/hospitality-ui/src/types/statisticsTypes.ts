import { infer as zodInfer, number, object, string } from "zod";

export const PurchasesPerFrequencySchema = object({
  purchasedAt: string().datetime().nonempty(),
  supplierTitle: string().nonempty(),
  storeTitle: string().nonempty(),
  total: number().nonnegative(),
});

export type PurchasesPerFrequencyType = zodInfer<typeof PurchasesPerFrequencySchema>;
