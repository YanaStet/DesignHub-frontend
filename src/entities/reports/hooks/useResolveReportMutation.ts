import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { Report } from "../model";
import reportService from "../api/service";

export type props = {
    reportId: string;
    body: { status: 'Resolved' | 'Dismissed' }
}

export function useResolveReportMutation(
): UseMutationResult<Report, HttpError, props> {
    return useMutation({
        mutationFn: ({ reportId, body }: props) => reportService.resolveReport(reportId, body),
    });
}
