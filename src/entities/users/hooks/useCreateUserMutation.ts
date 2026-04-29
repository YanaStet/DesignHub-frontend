import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { User, UserRequest } from "../model";
import type { HttpError } from "@/shared/api/api";
import { userService } from "../api/service";

export function useCreateUserMutation(): UseMutationResult<
  User,
  HttpError,
  UserRequest
> {
  return useMutation({
    mutationFn: (body: UserRequest) => userService.createUser(body),
  });
}
