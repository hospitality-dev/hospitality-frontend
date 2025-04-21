import { Outlet, Tabs, useLocation } from "@hospitality/hospitality-ui";

const tabs = [
  { id: "dashboard", title: "Dashboard", link: "/reports/dashboard" },
  { id: "purchases", title: "Purchases", link: "/reports/purchases" },
  { id: "generated-reports", title: "Generated reports", link: "/reports/generated-reports" },
];

export function ReportsLayout() {
  const location = useLocation();
  return (
    <div>
      <Tabs active={location.href.split("/").at(-1) || tabs[0]?.id} tabs={tabs} />
      <Outlet />
    </div>
  );
}
