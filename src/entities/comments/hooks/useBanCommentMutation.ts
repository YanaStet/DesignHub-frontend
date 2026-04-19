import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { Comment } from "../model";
import { commentService } from "../api/service";

export function useBanCommentMutation(
): UseMutationResult<Comment, AxiosError<ApiErrorResponse>, string> {
    return useMutation({
        mutationFn: (commentId: string) => commentService.banComment(commentId),
    });
}
