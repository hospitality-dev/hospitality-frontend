import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities } from "../../types";
import { fetchFunction } from "../../utils";

export function useUpdate<F extends { id: string }>(
  model: AvailableEntities,
  options?: { refetchModels?: AvailableEntities[] } & UseMutationOptions<unknown, unknown, { value: F }>
) {
  const userReset = useResetAtom(userAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { value: F }) => {
      return fetchFunction({
        method: "PATCH",
        id: payload.value.id,
        payload: JSON.stringify(payload.value),
        model,
        userReset,
      });
    },

    onSuccess: (...props) => {
      queryClient.invalidateQueries({ queryKey: [model] });
      if (options?.refetchModels?.length) {
        for (let index = 0; index < options.refetchModels.length; index++) {
          queryClient.refetchQueries({ queryKey: [options.refetchModels[index]] });
        }
      }
      if (options?.onSuccess) {
        options?.onSuccess(...props);
      }
    },
  });
}
