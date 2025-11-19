import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { Tag } from "../model";
import type { AxiosError } from "axios";
import { tagService } from "../api/service";
import type { ApiErrorResponse } from "@/shared/types";

export function useCreateTagMutation(): UseMutationResult<
  Tag,
  AxiosError<ApiErrorResponse>,
  string
> {
  return useMutation({
    mutationFn: (name: string) => tagService.createTag(name),
  });
}
