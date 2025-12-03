import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { Work } from "../model";
import { workService } from "../api/service";

export function useDeleteWorkMutation(
  workId: number
): UseMutationResult<Work, AxiosError<ApiErrorResponse>> {
  return useMutation({
    mutationFn: () => workService.deleteWork(workId),
  });
}
