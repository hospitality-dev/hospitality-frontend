import { RouterProvider } from "@tanstack/react-router";

import { router } from "./routes";

export function App() {
  return <RouterProvider context={{ user: null }} router={router} />;
}
