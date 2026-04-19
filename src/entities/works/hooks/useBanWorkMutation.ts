import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { Work } from "../model";
import { workService } from "../api/service";

export function useBanWorkMutation(
): UseMutationResult<Work, AxiosError<ApiErrorResponse>, string> {
    return useMutation({
        mutationFn: (workId: string) => workService.banWork(workId),
    });
}
