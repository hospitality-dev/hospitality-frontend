import {
  BarcodeScanner,
  Drawer,
  Navbar,
  Outlet,
  Sidebar,
  Spinner,
  useBarcodeScanner,
  useDrawerValue,
  useScreenSize,
} from "@hospitality/hospitality-ui";
import { lazy, Suspense } from "react";

import { Modules } from "../enums";

const ProductsCategories = lazy(() =>
  import("@hospitality/hospitality-ui").then((module) => ({
    default: module.ProductsCategoriesDrawer,
  }))
);
const CreateProduct = lazy(() =>
  import("@hospitality/hospitality-ui").then((module) => ({
    default: module.CreateProduct,
  }))
);
const ManageProductInventory = lazy(() =>
  import("@hospitality/hospitality-ui").then((module) => ({
    default: module.ManageProductInventory,
  }))
);
const AddNewUser = lazy(() =>
  import("@hospitality/hospitality-ui").then((module) => ({
    default: module.AddNewUser,
  }))
);

const sections = [
  {
    title: "MODULES",
    links: Modules.map((module) => ({ title: module.title, to: `/${module.id}`, icon: module.icon })),
  },
];

export function Layout() {
  const { scannerState } = useBarcodeScanner();
  const { isLg } = useScreenSize();
  const drawer = useDrawerValue();
  return (
    <main className="bg-layout relative flex h-screen w-screen flex-nowrap overflow-hidden">
      <Drawer>
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Spinner />
            </div>
          }>
          {drawer.type === "products_categories" ? <ProductsCategories /> : null}
          {drawer.type === "create_products" && drawer.data ? <CreateProduct data={drawer.data} /> : null}
          {drawer.type === "manage_product_inventory" && drawer.data ? <ManageProductInventory data={drawer.data} /> : null}
          {drawer.type === "add_new_user" ? <AddNewUser /> : null}
        </Suspense>
      </Drawer>
      {scannerState.isOpen ? <BarcodeScanner /> : null}
      {isLg ? <Sidebar sections={sections} /> : null}
      <div className="flex w-full flex-col">
        <Navbar />
        <div className="overflow-auto p-4">
          <Outlet />
        </div>
        {isLg ? null : <Sidebar sections={sections} />}
      </div>
    </main>
  );
}
