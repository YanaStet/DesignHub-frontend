import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { CommentRequest, Comment } from "../model";
import { commentService } from "../api/service";

export function useCreateCommentMutation(): UseMutationResult<
  Comment,
  HttpError,
  CommentRequest
> {
  return useMutation({
    mutationFn: (body: CommentRequest) => commentService.createComment(body),
  });
}
