import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import { COMMENT_KEYS, type Comment } from "../model";
import { commentService } from "../api/service";

export function useCommentsByWorkIdQuery<TData = Comment[]>(
  workId: string,
  options?: Partial<UseQueryOptions<Comment[], HttpError, TData>>,
): UseQueryResult<TData> {
  return useQuery<Comment[], HttpError, TData>({
    queryKey: [COMMENT_KEYS.COMMENTS, 'by-work', workId],
    queryFn: () => commentService.getByWorkIdComments(workId),
    ...options,
  });
}
