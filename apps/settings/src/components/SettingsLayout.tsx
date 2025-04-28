import { Outlet, Tabs, useLocation } from "@hospitality/hospitality-ui";

const tabs = [
  { id: "user", title: "User", link: "/settings/user" },
  { id: "location", title: "Location", link: "/settings/location" },
  { id: "products", title: "Products", link: "/settings/products" },
  { id: "Manufacturers", title: "Manufacturers", link: "/settings/manufacturers" },
  { id: "suppliers", title: "Suppliers", link: "/settings/suppliers" },
];

export function SettingsLayout() {
  const location = useLocation();
  return (
    <div className="flex h-full flex-col gap-y-2 overflow-hidden">
      <div>
        <Tabs active={location.href.split("/").at(-1) || tabs[0]?.id} isNavControlled setActive={() => {}} tabs={tabs} />
      </div>
      <div className="h-full max-h-full">
        <Outlet />
      </div>
    </div>
  );
}
