import { Outlet } from "@hospitality/hospitality-ui";

export function SettingsLayout() {
  return (
    <div className="flex flex-col gap-y-2">
      <nav>
        <ul>
          <li>Locations</li>
          <li>Products</li>
          <li>Users</li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
