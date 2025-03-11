import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities, valueof } from "../../types";
import { fetchFunction } from "../../utils";

export function useCreate<F extends Record<keyof F, valueof<F>>>(model: AvailableEntities, payload: F) {
  const userReset = useResetAtom(userAtom);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetchFunction({ method: "POST", payload: JSON.stringify(payload), model, userReset }),
    meta: {
      model,
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [model] });
    },
  });
}
