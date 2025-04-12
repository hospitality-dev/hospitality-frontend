import { useNavigate } from "@tanstack/react-router";
import { MouseEvent } from "react";

import { Icons } from "../enums";
import { useAuth, useRead, useUserLocations } from "../hooks";
import { UsersType } from "../types";
import { getLoginRoute, getUserInfo } from "../utils";
import { Avatar } from "./Avatar";
import { Dropdown } from "./Dropdown";
export function Navbar() {
  const auth = useAuth();
  const { data: locations } = useUserLocations();
  const navigate = useNavigate();
  function routeToLogin(e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) {
    e.preventDefault();
    getLoginRoute();
  }

  const { data: userData } = useRead<UsersType>(
    {
      model: "users",
      id: auth.user?.id || "",
      fields: ["id", "firstName", "lastName", "imageId"],
    },
    { enabled: !!auth.user?.id, staleTime: Infinity }
  );

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
                    icon: Icons.locationChange,
                    isHidden: (locations?.length || 0) < 2,
                    onClick: () => navigate({ to: "/location-select" }),
                  },
                ]}>
                <Avatar imageId={userData?.imageId} label={getUserInfo(userData).title} onClick={() => {}} type="user_avatar" />
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
