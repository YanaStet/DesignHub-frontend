import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AuthRequest, AuthResponse } from "../model/types";
import { authService } from "../api/service";
import type { HttpError } from "@/shared/api/api";

export function useLoginMutation(): UseMutationResult<
  AuthResponse, // Тип успішної відповіді (data)
  HttpError, // Тип помилки (error)
  AuthRequest // Тип аргументів, які передаються в mutate()
> {
  return useMutation({
    mutationFn: (credentials: AuthRequest) => authService.login(credentials),
  });
}

export function useGoogleLoginMutation(): UseMutationResult<
  AuthResponse,
  HttpError,
  string // idToken
> {
  return useMutation({
    mutationFn: (idToken: string) => authService.googleLogin(idToken),
  });
}
