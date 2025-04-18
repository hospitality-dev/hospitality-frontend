import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";
import kebabCase from "lodash.kebabcase";

import { userAtom } from "../../atoms";
import { AllowedUploadTypes, AvailableEntities, FilesCategories } from "../../types";
import { fetchFunction, formatStringToISO, uploadFunction } from "../../utils";

export function useCreate<F>(
  model: AvailableEntities,
  options?: { invalidateModels?: AvailableEntities[] } & UseMutationOptions<unknown, unknown, { value: F }>
) {
  const userReset = useResetAtom(userAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { value: F }) => {
      return fetchFunction({ method: "POST", payload: JSON.stringify(payload.value), model, userReset });
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
    onSuccess: (...props) => {
      queryClient.invalidateQueries({ queryKey: [model] });
      if (options?.invalidateModels?.length) {
        for (let index = 0; index < options.invalidateModels.length; index++) {
          queryClient.invalidateQueries({ predicate: (q) => q.queryKey?.[0] === options?.invalidateModels?.[index] });
        }
      }
      if (options?.onSuccess) {
        options?.onSuccess(...props);
      }
    },
  });
}

export function useAddInventoryProducts() {
  const userReset = useResetAtom(userAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { value: { id?: string; barcode?: string; amount: number; expirationDate?: string | null } }) => {
      const formattedExpirationDate = payload.value.expirationDate ? formatStringToISO(payload.value.expirationDate) : null;
      return fetchFunction({
        method: "POST",
        payload: JSON.stringify({ ...payload.value, expirationDate: formattedExpirationDate }),
        model: "locations_products",
        userReset,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations_products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUploadFiles(
  { uploadType }: { uploadType: AllowedUploadTypes },
  opts?: { invalidateModels?: AvailableEntities[] }
) {
  const userReset = useResetAtom(userAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string; value: FormData }) => {
      return uploadFunction({ payload: payload.value, userReset, urlSuffix: `${kebabCase(uploadType)}/${payload.id}` });
    },

    onSuccess: () => {
      if (opts?.invalidateModels?.length) {
        for (let index = 0; index < opts.invalidateModels.length; index++) {
          queryClient.invalidateQueries({ predicate: (q) => q.queryKey?.[0] === opts?.invalidateModels?.[index] });
        }
      }
    },
  });
}

export function useGenerateFile(
  { type, id }: { type: FilesCategories; id?: string },
  options?: { invalidateModels?: AvailableEntities[] } & UseMutationOptions<unknown, unknown>
) {
  const userReset = useResetAtom(userAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const url = await fetchFunction<string>({
        method: "GET",
        model: "files",
        userReset,
        urlSuffix: `generate/${kebabCase(type)}${id ? `/${id}` : ""}`,
      });
      if (url) window.open(url);
      return null;
    },
    onError: options?.onError,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["files"] }),
  });
}
