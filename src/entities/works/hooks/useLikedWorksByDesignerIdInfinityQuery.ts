import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { WORK_KEYS, type Work, type WorkQueryParams } from "../model";
import type { AxiosError } from "axios";
import { workService } from "../api/service";
import type { PaginationResponse } from "@/shared/types";


export function useLikedWorksByDesignerIdIfinityQuery(
    userId: string,
    initialParams: Omit<WorkQueryParams, "page" | "limit">,
) {
    return useInfiniteQuery<
        PaginationResponse<Work>,
        AxiosError,
        InfiniteData<PaginationResponse<Work>>, // TData (дані після select, тут = InfiniteData)
        [string, string, typeof initialParams],
        number
    >({
        queryKey: [WORK_KEYS.LIKED_INFINITE_QUERY, userId, initialParams],
        enabled: !!userId,

        queryFn: ({ pageParam = 1 }) => {
            const params: WorkQueryParams = {
                ...initialParams,
                limit: 12,
                page: pageParam,
            };

            return workService.getLikedWorksByDesignerId(userId, params);
        },

        getNextPageParam: (lastPage) => {
            if (!lastPage?.data || lastPage.data.length < 12) return undefined;

            return lastPage.page + 1; // next page number
        },

        initialPageParam: 1,
    });
}
