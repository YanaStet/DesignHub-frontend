import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { UserRequest } from "../model";
import type { HttpError } from "@/shared/api/api";
import { userService } from "../api/service";
import type { AuthResponse } from "@/entities/auth/model/types";

export function useCreateUserMutation(): UseMutationResult<
  AuthResponse,
  HttpError,
  UserRequest
> {
  return useMutation({
    mutationFn: (body: UserRequest) => userService.createUser(body),
  });
}
