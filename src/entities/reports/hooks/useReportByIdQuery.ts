import {
    useQuery,
    type UseQueryOptions,
    type UseQueryResult,
} from "@tanstack/react-query";
import { REPORT_KEYS, type Report } from "../model";
import { AxiosError } from "axios";
import reportService from "../api/service";

export function useReportByIdQuery<TData = Report>(
    id: string,
    options?: Partial<
        UseQueryOptions<Report, AxiosError, TData>
    >,
): UseQueryResult<TData> {
    return useQuery<Report, AxiosError, TData>({
        queryKey: [REPORT_KEYS.GET_REPORT, id],
        queryFn: () => reportService.getReport(id),
        ...options,
    });
}
