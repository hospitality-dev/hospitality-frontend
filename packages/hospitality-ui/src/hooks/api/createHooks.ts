import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";

import { userAtom } from "../../atoms";
import { AvailableEntities } from "../../types";
import { fetchFunction } from "../../utils";

export function useCreate<F>(model: AvailableEntities, options?: { invalidateModels?: AvailableEntities[] }) {
  const userReset = useResetAtom(userAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { value: F }) => {
      return fetchFunction({ method: "POST", payload: JSON.stringify(payload.value), model, userReset });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [model] });
      if (options?.invalidateModels?.length) {
        for (let index = 0; index < options.invalidateModels.length; index++) {
          queryClient.invalidateQueries({ predicate: (q) => q.queryKey?.[0] === options?.invalidateModels?.[index] });
        }
      }
    },
  });
}

export function useAddInventoryProducts() {
  const userReset = useResetAtom(userAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { value: { id?: string; barcode?: string; amount: number } }) => {
      return fetchFunction({ method: "POST", payload: JSON.stringify(payload.value), model: "locations_products", userReset });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations_products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
