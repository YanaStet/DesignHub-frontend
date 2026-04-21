import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { commentService } from "../api/service";
import type { PaginationParams, PaginationResponse } from "@/shared/types";
import { COMMENT_KEYS, type Comment } from "../model";

export function useInfinityCommentsQuery() {
  return useInfiniteQuery<
    PaginationResponse<Comment>,
    AxiosError,
    InfiniteData<PaginationResponse<Comment>>, // TData (дані після select, тут = InfiniteData)
    [string, string],
    number
  >({
    queryKey: [COMMENT_KEYS.COMMENTS, "infinity"],

    queryFn: ({ pageParam = 1 }) => {
      const params: PaginationParams = {
        limit: 12,
        page: pageParam,
      };

      return commentService.getPaginatedComments(params);
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data || lastPage.data.length < 12) return undefined;

      return lastPage.page + 1; // next page number
    },

    initialPageParam: 1,
  });
}
