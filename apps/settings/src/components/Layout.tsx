import { Outlet, Tabs } from "@hospitality/hospitality-ui";

const tabs = [{ title: "Users", link: "/settings/users" }, { title: "Locations" }, { title: "Products" }];

export function SettingsLayout() {
  return (
    <div className="flex flex-col gap-y-2">
      <Tabs tabs={tabs} />
      <Outlet />
    </div>
  );
}
