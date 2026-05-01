import {
    useQuery,
    type UseQueryOptions,
    type UseQueryResult,
} from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import { COMMENT_KEYS, type Comment } from "../model";
import { commentService } from "../api/service";

export function useCommentByIdQuery<TData = Comment>(
    commentId: string,
    options?: Partial<UseQueryOptions<Comment, HttpError, TData>>,
): UseQueryResult<TData> {
    return useQuery<Comment, HttpError, TData>({
        queryKey: [COMMENT_KEYS.COMMENTS, 'by-id', commentId],
        queryFn: () => commentService.getCommentById(commentId),
        ...options,
    });
}
