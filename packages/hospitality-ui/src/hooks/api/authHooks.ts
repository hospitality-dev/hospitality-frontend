import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect, useLocation, useNavigate } from "@tanstack/react-router";
import { useAtom, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import ky from "ky";
import { useLayoutEffect } from "react";

import { locationAtom, userAtom } from "../../atoms";
import { loginResponseSchema } from "../../schemas";
import { LocationsType, LoginParamsType, LoginResponseType, ResponseType } from "../../types";
import { authFetchFunction } from "../../utils";
import { useList } from "./listHooks";

export function useLogin() {
  const setUser = useSetAtom(userAtom);

  const params = useLocation();
  const navigate = useNavigate();
  const { mutate: login } = useMutation({
    mutationFn: async ({ value }: { value: LoginParamsType }) => {
      if (!params.search.code_challenge || !params.search.state) {
        return redirect({ to: "/" });
      }
      const res = await ky
        .get<ResponseType<LoginResponseType>>(`${import.meta.env.VITE_SERVER_URL}/auth/callback`, {
          credentials: "include",
          retry: { limit: 0 },
          searchParams: new URLSearchParams([
            ["state", params.search.state],
            ["code", params.search.code_challenge],
            ["username", value.username],
            ["password", value.password],
          ]),
        })
        .json();
      if (res.ok === true && res.data.user.id) {
        const validation = loginResponseSchema.safeParse(res.data);
        if (validation.success) {
          localStorage.setItem("user_id", validation.data.user.id);
          setUser(validation.data);
          if (!validation.data.user?.locationId) {
            navigate({ to: "/location-select" });
          } else {
            navigate({ to: "/" });
          }
        } else console.error(validation);
      }
    },
  });
  return { login };
}
export function useAuth() {
  const userId = localStorage.getItem("user_id") || "";
  const [user, setUser] = useAtom(userAtom);
  const setLocation = useSetAtom(locationAtom);
  const reset = useResetAtom(userAtom);
  const res = useQuery<LoginResponseType>({
    queryKey: ["users", userId],
    queryFn: () => authFetchFunction<LoginResponseType>({ method: "GET", userReset: reset, route: "session" }),
    staleTime: 5 * 60 * 1000,
  });

  const { data: locations } = useUserLocations();

  useLayoutEffect(() => {
    if (!user && !!res?.data?.user) {
      const validation = loginResponseSchema.safeParse(res.data);
      if (validation.success) {
        setUser(validation.data);
        const location = locations?.find((loc) => loc.id === validation.data.user.locationId);
        if (location) setLocation(location);
      } else {
        console.error(validation);
      }
    }
  }, [user, res?.data]);

  return { user: user?.user, reset };
}
export function useSessionLocation() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (locationId: string) =>
      authFetchFunction<LoginResponseType>({ method: "GET", userReset: () => {}, route: `session/location/${locationId}` }),
    onSuccess: (data) => {
      setUser(data);
      navigate({ to: "/settings/location" });
    },
  });

  function changeLocation(locationId: string) {
    mutate(locationId);
  }

  return { changeLocation };
}
export function useUserLocations() {
  return useList<Pick<LocationsType, "id" | "title" | "companyId">>(
    { model: "locations", fields: ["id", "title", "companyId"] },
    { staleTime: 8 * 60 * 60 * 1000 }
  );
}
