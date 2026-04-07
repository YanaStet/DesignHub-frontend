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
    Work[],
    AxiosError,
    InfiniteData<PaginationResponse<Work>>, // TData (дані після select, тут = InfiniteData)
    [string, typeof initialParams],
    number
  >({
    queryKey: [WORK_KEYS.INFINITE_QUERY, initialParams],

    queryFn: ({ pageParam = 0 }) => {
      const params: WorkQueryParams = {
        ...initialParams,
        limit: 12,
        skip: pageParam,
      };

      console.log(workService
        .getWorksByDesignerId(userId, params))
      return workService
        .getWorksByDesignerId(userId, params)
    },

    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce(
        (sum, page) => {
          return sum + page.length
        },
        0,
      );

      if (lastPage.length < 12) return undefined;

      return totalLoaded; // skip for next page
    },

    initialPageParam: 0,
  });
}
