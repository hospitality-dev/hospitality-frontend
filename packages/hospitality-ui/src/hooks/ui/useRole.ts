import { useQuery } from "@tanstack/react-query";

import { DefaultRoleIds } from "../../enums";
import { RolesQuery } from "../../utils";
import { useAuth } from "../api";

export function useRole() {
  const auth = useAuth();
  const { data: rolesData = [] } = useQuery(RolesQuery);

  const role = rolesData.find((role) => role.id === auth.user?.roleId);

  return {
    isOwner:
      role?.title === "owner" &&
      role?.isDefault &&
      DefaultRoleIds.owner === auth.user?.roleId &&
      role.id === DefaultRoleIds.owner,
    isGeneralManager:
      role?.title === "general_manager" &&
      role?.isDefault &&
      DefaultRoleIds.generalManager === auth.user?.roleId &&
      role.id === DefaultRoleIds.generalManager,
    isLocationManager:
      role?.title === "location_manager" &&
      role?.isDefault &&
      DefaultRoleIds.locationManager === auth.user?.roleId &&
      role.id === DefaultRoleIds.locationManager,
  };
}
