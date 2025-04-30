import {
  BarcodeScanner,
  CreateBrand,
  CreateManufacturer,
  CreatePurchase,
  CreateSupplier,
  Drawer,
  Modal,
  ModifyPurchase,
  Navbar,
  Outlet,
  Progress,
  Sidebar,
  Spinner,
  UpdateSupplier,
  useBarcodeScanner,
  useDialog,
  useDialogValue,
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
const AddUserFromLocation = lazy(() =>
  import("@hospitality/hospitality-ui").then((module) => ({
    default: module.AddUserFromLocation,
  }))
);
const UploadDrawer = lazy(() =>
  import("@hospitality/hospitality-ui").then((module) => ({
    default: module.UploadDrawer,
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
  const { openDialog } = useDialog();
  const { isLg } = useScreenSize();
  const drawer = useDrawerValue();
  const dialog = useDialogValue();
  return (
    <main className="bg-layout relative flex h-screen w-screen flex-nowrap overflow-hidden">
      <button onClick={() => openDialog({ title: "Test", type: "create_manufacturer" })}>click</button>
      <Modal>{dialog.type === "create_manufacturer" ? <CreateManufacturer /> : null}</Modal>
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
          {drawer.type === "add_user_from_location" ? <AddUserFromLocation /> : null}
          {drawer.type === "upload" ? <UploadDrawer data={drawer.data} /> : null}
          {drawer.type === "create_purchases" ? <CreatePurchase data={drawer.data} /> : null}
          {drawer.type === "modify_purchase" ? <ModifyPurchase data={drawer.data} /> : null}
          {drawer.type === "create_manufacturer" ? <CreateManufacturer /> : null}
          {drawer.type === "create_brand" ? <CreateBrand data={drawer.data} /> : null}
          {drawer.type === "create_supplier" ? <CreateSupplier /> : null}
          {drawer.type === "update_supplier" ? <UpdateSupplier data={drawer.data} /> : null}
        </Suspense>
      </Drawer>
      {scannerState.isOpen ? <BarcodeScanner /> : null}
      {isLg ? <Sidebar sections={sections} /> : null}
      <div className="flex w-full flex-col">
        <Navbar />
        <Progress />
        <div className="h-full overflow-auto p-4">
          <Outlet />
        </div>
        {isLg ? null : <Sidebar sections={sections} />}
      </div>
    </main>
  );
}
