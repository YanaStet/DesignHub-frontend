import {
    useQuery,
    type UseQueryOptions,
    type UseQueryResult,
} from "@tanstack/react-query";
import { REPORT_KEYS, type Report } from "../model";
import type { HttpError } from "@/shared/api/api";
import reportService from "../api/service";

export function useReportByIdQuery<TData = Report>(
    id: string,
    options?: Partial<
        UseQueryOptions<Report, HttpError, TData>
    >,
): UseQueryResult<TData> {
    return useQuery<Report, HttpError, TData>({
        queryKey: [REPORT_KEYS.GET_REPORT, id],
        queryFn: () => reportService.getReport(id),
        ...options,
    });
}
