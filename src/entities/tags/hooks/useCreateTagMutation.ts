import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { Tag } from "../model";
import type { HttpError } from "@/shared/api/api";
import { tagService } from "../api/service";

export function useCreateTagMutation(): UseMutationResult<
  Tag,
  HttpError,
  string
> {
  return useMutation({
    mutationFn: (name: string) => tagService.createTag(name),
  });
}
