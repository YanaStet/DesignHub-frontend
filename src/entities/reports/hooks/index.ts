import { useCreateReportMutation } from "./useCreateReportMutation";
import { useInfinityReportsQuery } from "./useInfinityReportsQuery";
import { usePaginatedReportsQuery } from "./usePaginatedReportsQuery";
import { useReportByIdQuery } from "./useReportByIdQuery";
import { useResolveReportMutation } from "./useResolveReportMutation";

export const reportHooks = {
    useCreateReportMutation,
    useInfinityReportsQuery,
    usePaginatedReportsQuery,
    useReportByIdQuery,
    useResolveReportMutation,
}