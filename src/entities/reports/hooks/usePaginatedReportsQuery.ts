import {
    useQuery,
    type UseQueryOptions,
    type UseQueryResult,
} from "@tanstack/react-query";
import { REPORT_KEYS, type Report } from "../model";
import { AxiosError } from "axios";
import type { PaginationParams, PaginationResponse } from "@/shared/types";
import reportService from "../api/service";

export function usePaginatedReportsQuery<TData = PaginationResponse<Report>>(
    params: PaginationParams,
    options?: Partial<
        UseQueryOptions<PaginationResponse<Report>, AxiosError, TData>
    >,
): UseQueryResult<TData> {
    return useQuery<PaginationResponse<Report>, AxiosError, TData>({
        queryKey: [REPORT_KEYS.GET_ALL_REPORTS, params],
        queryFn: () => reportService.getPaginatedReports(params),
        ...options,
    });
}
