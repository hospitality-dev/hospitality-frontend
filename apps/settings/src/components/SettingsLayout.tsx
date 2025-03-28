import { Outlet, Tabs, useLocation } from "@hospitality/hospitality-ui";

const tabs = [
  // { id: "users", title: "Users", link: "/settings/users" },
  { id: "locations", title: "Locations", link: "/settings/locations" },
  { id: "products", title: "Products", link: "/settings/products" },
];

export function SettingsLayout() {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-y-2 overflow-hidden">
      <Tabs active={location.href.split("/").at(-1) || tabs[0]?.id} setActive={() => {}} tabs={tabs} />
      <div className="max-h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
