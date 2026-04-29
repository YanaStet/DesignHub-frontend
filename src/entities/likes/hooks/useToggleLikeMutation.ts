import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { ToggleLikeResponse } from "../model";
import { likeService } from "../api/service";

export function useToggleLikeMutation(
  designId: string,
): UseMutationResult<ToggleLikeResponse, HttpError, void> {
  return useMutation({
    mutationFn: () => likeService.toggleLike(designId),
  });
}
