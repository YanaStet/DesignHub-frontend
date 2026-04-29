import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { Work, WorkRequest } from "../model";
import { workService } from "../api/service";

export function useCreateWorkMutation(): UseMutationResult<
  Work,
  HttpError,
  WorkRequest
> {
  return useMutation({
    mutationFn: (body: WorkRequest) => workService.createWork(body),
  });
}
