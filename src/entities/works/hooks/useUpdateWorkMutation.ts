import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { Work, WorkRequest } from "../model";
import { workService } from "../api/service";

export function useUpdateWorkMutation(
  workId: number
): UseMutationResult<Work, AxiosError<ApiErrorResponse>, WorkRequest> {
  return useMutation({
    mutationFn: (body: WorkRequest) => workService.updateWork(workId, body),
  });
}
