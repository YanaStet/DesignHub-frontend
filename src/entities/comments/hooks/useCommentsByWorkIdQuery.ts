import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { COMMENT_KEYS, type Comment } from "../model";
import { commentService } from "../api/service";

export function useCommentsByWorkIdQuery<TData = Comment[]>(
  workId: number,
  options?: Partial<UseQueryOptions<Comment[], AxiosError, TData>>
): UseQueryResult<TData> {
  return useQuery<Comment[], AxiosError, TData>({
    queryKey: [COMMENT_KEYS.COMMENTS],
    queryFn: () => commentService.getByWorkIdComments(workId),
    ...options,
  });
}
