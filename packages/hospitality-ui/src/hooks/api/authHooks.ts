import { useMutation } from "@tanstack/react-query";
import ky from "ky";

import { LoginParams } from "../../types";

export function useLogin() {
  const mutation = useMutation({
    mutationFn: async ({ value }: { value: LoginParams }) => ky.post("http://localhost:4000/auth/login", { json: value }),
  });
  return mutation;
}

export function useAuth() {}
