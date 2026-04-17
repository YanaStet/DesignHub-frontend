import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { CreateReport, Report } from "../model";
import reportService from "../api/service";

export function useCreateReportMutation(
): UseMutationResult<Report, AxiosError<ApiErrorResponse>, CreateReport> {
    return useMutation({
        mutationFn: (body: CreateReport) => reportService.createReport(body),
    });
}
