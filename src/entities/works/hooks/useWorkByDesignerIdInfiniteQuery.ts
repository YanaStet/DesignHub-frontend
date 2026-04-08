import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { WORK_KEYS, type Work, type WorkQueryParams } from "../model";
import type { AxiosError } from "axios";
import { workService } from "../api/service";
import type { PaginationResponse } from "@/shared/types";


export function useWorkByDesignerIdInfiniteQuery(
  userId: string,
  initialParams: Omit<WorkQueryParams, "skip" | "limit">,
) {
  return useInfiniteQuery<
    PaginationResponse<Work>,
    AxiosError,
    InfiniteData<PaginationResponse<Work>>, // TData (дані після select, тут = InfiniteData)
    [string, string, typeof initialParams],
    number
  >({
    queryKey: [WORK_KEYS.INFINITE_QUERY, userId, initialParams],
    enabled: !!userId,

    queryFn: ({ pageParam = 0 }) => {
      const params: WorkQueryParams = {
        ...initialParams,
        limit: 12,
        skip: pageParam,
      };

      return workService.getWorksByDesignerId(userId, params);
    },

    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce(
        (sum, page) => sum + page.data.length,
        0,
      );

      if (lastPage.data.length < 12) return undefined;

      return totalLoaded; // skip for next page
    },

    initialPageParam: 0,
  });
}
