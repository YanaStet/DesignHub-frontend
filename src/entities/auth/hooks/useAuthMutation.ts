import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AuthRequest, AuthResponse } from "../model/types";
import { authService } from "../api/service";
import { useNavigate } from "react-router-dom";
import type { HttpError } from "@/shared/api/api";

export function useLoginMutation(): UseMutationResult<
  AuthResponse, // Тип успішної відповіді (data)
  HttpError, // Тип помилки (error)
  AuthRequest // Тип аргументів, які передаються в mutate()
> {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: AuthRequest) => authService.login(credentials),

    onSuccess: () => {
      navigate("/");
    },
  });
}
