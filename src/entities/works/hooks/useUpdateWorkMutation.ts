import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { Work, WorkRequest } from "../model";
import { workService } from "../api/service";

export function useUpdateWorkMutation(
  workId: string,
): UseMutationResult<Work, AxiosError<ApiErrorResponse>, Omit<WorkRequest, "coverImage" | "designFile">> {
  return useMutation({
    mutationFn: (body: Omit<WorkRequest, "coverImage" | "designFile">) => workService.updateWork(workId, body),
  });
}
