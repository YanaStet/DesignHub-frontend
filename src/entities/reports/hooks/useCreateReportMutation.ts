import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { CreateReport, Report } from "../model";
import reportService from "../api/service";

export function useCreateReportMutation(
): UseMutationResult<Report, HttpError, CreateReport> {
    return useMutation({
        mutationFn: (body: CreateReport) => reportService.createReport(body),
    });
}
