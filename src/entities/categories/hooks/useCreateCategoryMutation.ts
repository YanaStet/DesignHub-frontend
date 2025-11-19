import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { Category } from "../model";
import type { AxiosError } from "axios";
import { categoryService } from "../api/service";
import type { ApiErrorResponse } from "@/shared/types";

export function useCreateCategoryMutation(): UseMutationResult<
  Category,
  AxiosError<ApiErrorResponse>,
  string
> {
  return useMutation({
    mutationFn: (name: string) => categoryService.createCategory(name),
  });
}
