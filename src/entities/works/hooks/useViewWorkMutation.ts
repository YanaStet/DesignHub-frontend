import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import { workService } from "../api/service";

export function useViewWorkMutation(
  workId: string,
): UseMutationResult<string, HttpError> {
  return useMutation({
    mutationFn: () => workService.viewWork(workId),
  });
}
