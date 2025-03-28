import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities } from "../../types";
import { fetchFunction } from "../../utils";

export function useDelete(model: AvailableEntities, options?: { invalidateModels?: AvailableEntities[] }) {
  const userReset = useResetAtom(userAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return fetchFunction({ method: "DELETE", model, id, userReset });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [model] });

      if (options?.invalidateModels?.length) {
        for (let index = 0; index < options.invalidateModels.length; index++) {
          queryClient.invalidateQueries({ queryKey: [options.invalidateModels[index]] });
        }
      }
    },
  });
}

export function useRemoveProducts(options?: { invalidateModels?: AvailableEntities[] }) {
  const userReset = useResetAtom(userAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ value }: { value: { amount: number; id: string } }) => {
      return fetchFunction({
        method: "DELETE",
        model: "locations_products",
        id: value?.id,
        urlSuffix: `amount/${value.amount}`,
        userReset,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["locations_products"] });

      if (options?.invalidateModels?.length) {
        for (let index = 0; index < options.invalidateModels.length; index++) {
          queryClient.invalidateQueries({ queryKey: [options.invalidateModels[index]] });
        }
      }
    },
  });
}
