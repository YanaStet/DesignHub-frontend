import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { Comment, UpdateCommentRequest } from "../model";
import { commentService } from "../api/service";

export function useUpdateCommentMutation(
  commentId: number
): UseMutationResult<
  Comment,
  AxiosError<ApiErrorResponse>,
  UpdateCommentRequest
> {
  return useMutation({
    mutationFn: (body: UpdateCommentRequest) =>
      commentService.updateComment(commentId, body),
  });
}
