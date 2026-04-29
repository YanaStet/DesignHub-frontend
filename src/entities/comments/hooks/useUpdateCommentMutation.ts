import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { Comment, UpdateCommentRequest } from "../model";
import { commentService } from "../api/service";

export function useUpdateCommentMutation(
  commentId: string,
): UseMutationResult<
  Comment,
  HttpError,
  UpdateCommentRequest
> {
  return useMutation({
    mutationFn: (body: UpdateCommentRequest) =>
      commentService.updateComment(commentId, body),
  });
}
