import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AuthRequest, AuthResponse } from "../model/types";
import { authService } from "../api/service";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";

export function useLoginMutation(): UseMutationResult<
  AuthResponse, // Тип успішної відповіді (data)
  AxiosError<ApiErrorResponse>, // Тип помилки (error)
  AuthRequest // Тип аргументів, які передаються в mutate()
> {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: AuthRequest) => authService.login(credentials),

    onSuccess: (data) => {
      localStorage.setItem("access-token", data.access_token);
      navigate("/");
    },
  });
}
