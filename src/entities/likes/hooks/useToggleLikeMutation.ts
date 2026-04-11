import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import type { ToggleLikeResponse } from "../model";
import { likeService } from "../api/service";

export function useToggleLikeMutation(
  designId: string,
): UseMutationResult<ToggleLikeResponse, AxiosError<ApiErrorResponse>, void> {
  return useMutation({
    mutationFn: () => likeService.toggleLike(designId),
  });
}
