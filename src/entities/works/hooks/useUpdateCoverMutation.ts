import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { Work } from "../model";
import { workService } from "../api/service";

export function useUpdateCoverMutation(
    workId: string,
): UseMutationResult<Work, AxiosError<ApiErrorResponse>, File> {
    return useMutation({
        mutationFn: (body: File) => workService.updateCoverImg(workId, body),
    });
}
