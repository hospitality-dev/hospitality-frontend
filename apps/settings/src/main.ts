import { createLazyRoute } from "@hospitality/hospitality-ui";

import { Users } from "./pages";
export { SettingsLayout } from "./components";
export const SettingsUsersRoute = createLazyRoute("/settings/users")({
  component: Users,
});
