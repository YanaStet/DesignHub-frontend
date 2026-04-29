import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { Comment } from "../model";
import { commentService } from "../api/service";

export function useDeleteCommentMutation(
  commentId: string,
): UseMutationResult<Comment, HttpError> {
  return useMutation({
    mutationFn: () => commentService.deleteComment(commentId),
  });
}
