import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { User, UserRequest } from "../model";
import type { AxiosError } from "axios";
import { userService } from "../api/service";
import type { ApiErrorResponse } from "@/shared/types";

export function useCreateUserMutation(): UseMutationResult<
  User,
  AxiosError<ApiErrorResponse>,
  UserRequest
> {
  return useMutation({
    mutationFn: (body: UserRequest) => userService.createUser(body),
  });
}
