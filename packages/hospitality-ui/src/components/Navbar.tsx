import { useNavigate } from "@tanstack/react-router";
import { MouseEvent } from "react";

import { Icons } from "../enums";
import { useAuth, useUserLocations } from "../hooks";
import { getLoginRoute, getUserInfo } from "../utils";
import { Avatar } from "./Avatar";
import { Dropdown } from "./Dropdown";

export function Navbar() {
  const auth = useAuth();
  const { data: locations } = useUserLocations();
  const name = auth.user ? getUserInfo(auth.user).title : "";
  const navigate = useNavigate();
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
              <Dropdown
                items={[
                  {
                    id: "change_location",
                    title: "Change location",
                    icon: Icons["location-change"],
                    isHidden: (locations?.length || 0) < 2,
                    onClick: () => navigate({ to: "/location-select" }),
                  },
                ]}>
                <Avatar label={name} onClick={() => {}} />
              </Dropdown>
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
