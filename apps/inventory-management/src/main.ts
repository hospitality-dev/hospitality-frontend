import { createLazyRoute } from "@hospitality/hospitality-ui";

import { ProductInventory } from "./pages";

export const ProductInventoryRoute = createLazyRoute("/inventory-management/$categoryId")({
  component: ProductInventory,
});
