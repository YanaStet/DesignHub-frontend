import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { User } from "../model";
import type { HttpError } from "@/shared/api/api";
import { userService } from "../api/service";

export function useBanUserMutation(): UseMutationResult<
  User,
  HttpError,
  {
    id: string;
    reason: string;
  }
> {
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      userService.banUser(id, reason),
  });
}
