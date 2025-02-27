import { MouseEvent } from "react";

import { useLogin } from "../hooks";

export function Navbar() {
  const { loginRoute } = useLogin();
  function routeToLogin(e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) {
    e.preventDefault();
    loginRoute();
  }
  return (
    <div className="h-16 w-full bg-gray-100 px-4 shadow">
      <nav className="h-full">
        <ul className="flex h-full items-center justify-end">
          <li>
            <a href="#" onClick={routeToLogin}>
              Login
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
