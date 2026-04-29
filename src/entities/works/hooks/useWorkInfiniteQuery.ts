import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { WORK_KEYS, type Work, type WorkQueryParams } from "../model";
import type { HttpError } from "@/shared/api/api";
import { workService } from "../api/service";
import type { PaginationResponse } from "@/shared/types";

export function useWorkInfiniteQuery(
  initialParams: Omit<WorkQueryParams, "page" | "limit">,
) {
  return useInfiniteQuery<
    PaginationResponse<Work>,
    HttpError,
    InfiniteData<PaginationResponse<Work>>, // TData (дані після select, тут = InfiniteData)
    [string, typeof initialParams],
    number
  >({
    queryKey: [WORK_KEYS.INFINITE_QUERY, initialParams],

    queryFn: ({ pageParam = 1 }) => {
      const params: WorkQueryParams = {
        ...initialParams,
        limit: 12,
        page: pageParam,
      };

      return workService.getPaginatedWorks(params);
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data || lastPage.data.length < 12) return undefined;

      return lastPage.page + 1; // next page number
    },

    initialPageParam: 1,
  });
}
