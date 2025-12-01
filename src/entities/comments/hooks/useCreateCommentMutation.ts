import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { CommentRequest, Comment } from "../model";
import { commentService } from "../api/service";

export function useCreateCommentMutation(): UseMutationResult<
  Comment,
  AxiosError<ApiErrorResponse>,
  CommentRequest
> {
  return useMutation({
    mutationFn: (body: CommentRequest) => commentService.createComment(body),
  });
}
