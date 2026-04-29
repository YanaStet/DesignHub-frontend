import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { Comment } from "../model";
import { commentService } from "../api/service";

export function useBanCommentMutation(): UseMutationResult<
  Comment,
  HttpError,
  {
    id: string;
    reason: string;
  }
> {
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      commentService.banComment(id, reason),
  });
}
