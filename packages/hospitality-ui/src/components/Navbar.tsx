import { MouseEvent } from "react";

import { useAuth } from "../hooks";
import { getLoginRoute, getUserInfo } from "../utils";
import { Avatar } from "./Avatar";

export function Navbar() {
  const auth = useAuth();
  const name = auth.user ? getUserInfo(auth.user).title : "";
  function routeToLogin(e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) {
    e.preventDefault();
    getLoginRoute();
  }

  return (
    <div className="h-16 min-h-16 w-full bg-gray-100 px-4 shadow">
      <nav className="h-full">
        <ul className="flex h-full items-center justify-end">
          <li>
            {auth.user ? (
              <Avatar label={name} />
            ) : (
              <a href="#" onClick={routeToLogin}>
                Login
              </a>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
