import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { Report } from "../model";
import reportService from "../api/service";

export type props = {
    reportId: string;
    body: { status: 'Resolved' | 'Dismissed' }
}

export function useResolveReportMutation(
): UseMutationResult<Report, AxiosError<ApiErrorResponse>, props> {
    return useMutation({
        mutationFn: ({ reportId, body }: props) => reportService.resolveReport(reportId, body),
    });
}
