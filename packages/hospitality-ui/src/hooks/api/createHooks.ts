import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities } from "../../types";
import { fetchFunction } from "../../utils";

export function useCreate<F>(model: AvailableEntities) {
  const userReset = useResetAtom(userAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { value: F }) => {
      return fetchFunction({ method: "POST", payload: JSON.stringify(payload.value), model, userReset });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [model] });
    },
  });
}
