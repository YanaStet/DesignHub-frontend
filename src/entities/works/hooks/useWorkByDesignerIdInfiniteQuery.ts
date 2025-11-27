import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { WORK_KEYS, type Work, type WorkQueryParams } from "../model";
import type { AxiosError } from "axios";
import { workService } from "../api/service";

export type WorksPageData = { data: Work[] };

export function useWorkByDesignerIdInfiniteQuery(
  userId: number,
  initialParams: Omit<WorkQueryParams, "skip" | "limit">
) {
  return useInfiniteQuery<
    WorksPageData,
    AxiosError,
    InfiniteData<WorksPageData>, // TData (дані після select, тут = InfiniteData)
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

      return workService
        .getWorksByDesignerId(userId, params)
        .then((works) => ({ data: works }));
    },

    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce(
        (sum, page) => sum + page.data.length,
        0
      );

      if (lastPage.data.length < 12) return undefined;

      return totalLoaded; // skip for next page
    },

    initialPageParam: 0,
  });
}
