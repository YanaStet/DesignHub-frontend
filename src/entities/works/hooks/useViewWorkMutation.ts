import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import { workService } from "../api/service";

export function useViewWorkMutation(
  workId: number
): UseMutationResult<string, AxiosError<ApiErrorResponse>> {
  return useMutation({
    mutationFn: () => workService.viewWork(workId),
  });
}
