import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { Work } from "../model";
import { workService } from "../api/service";

export function useBanWorkMutation(): UseMutationResult<
  Work,
  AxiosError<ApiErrorResponse>,
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
