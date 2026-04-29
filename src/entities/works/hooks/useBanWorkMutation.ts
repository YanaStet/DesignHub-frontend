import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { Work } from "../model";
import { workService } from "../api/service";

export function useBanWorkMutation(): UseMutationResult<
  Work,
  HttpError,
  {
    id: string;
    reason: string;
  }
> {
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      workService.banWork(id, reason),
  });
}
