import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { Work } from "../model";
import { workService } from "../api/service";

export function useDeleteWorkMutation(
  workId: string,
): UseMutationResult<Work, HttpError> {
  return useMutation({
    mutationFn: () => workService.deleteWork(workId),
  });
}
