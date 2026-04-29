import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { Work, WorkRequest } from "../model";
import { workService } from "../api/service";

export function useUpdateWorkMutation(
  workId: string,
): UseMutationResult<Work, HttpError, Omit<WorkRequest, "coverImage" | "designFile">> {
  return useMutation({
    mutationFn: (body: Omit<WorkRequest, "coverImage" | "designFile">) => workService.updateWork(workId, body),
  });
}
