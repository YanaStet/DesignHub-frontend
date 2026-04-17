import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { REPORT_KEYS, type Report } from "../model";
import type { AxiosError } from "axios";
import type { PaginationParams, PaginationResponse } from "@/shared/types";
import reportService from "../api/service";

export function useInfinityReportsQuery(
) {
    return useInfiniteQuery<
        PaginationResponse<Report>,
        AxiosError,
        InfiniteData<PaginationResponse<Report>>, // TData (дані після select, тут = InfiniteData)
        [string],
        number
    >({
        queryKey: [REPORT_KEYS.GET_PAGINATED_REPORTS],

        queryFn: ({ pageParam = 1 }) => {
            const params: PaginationParams = {
                limit: 12,
                page: pageParam,
            };

            return reportService.getPaginatedReports(params);
        },

        getNextPageParam: (lastPage) => {
            if (lastPage.data.length < 12) return undefined;

            return lastPage.page + 1; // next page number
        },

        initialPageParam: 1,
    });
}
