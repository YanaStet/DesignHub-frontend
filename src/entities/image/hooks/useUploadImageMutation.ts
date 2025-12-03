import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import { imageService } from "../api/service";

export function useUploadImageMutation(): UseMutationResult<
  { file_url: string },
  AxiosError<ApiErrorResponse>,
  File
> {
  return useMutation({
    mutationFn: (body: File) => imageService.postImage(body),
  });
}
