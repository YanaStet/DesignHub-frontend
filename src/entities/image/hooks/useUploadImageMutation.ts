import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import { imageService } from "../api/service";

export function useUploadImageMutation(): UseMutationResult<
  { file_url: string },
  HttpError,
  File
> {
  return useMutation({
    mutationFn: (body: File) => imageService.postImage(body),
  });
}
