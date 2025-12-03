import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { DesignerProfile } from "../model";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import { designerProfileService } from "../api/service";

export function usePostAvatarMutation(): UseMutationResult<
  DesignerProfile,
  AxiosError<ApiErrorResponse>,
  File
> {
  return useMutation({
    mutationFn: (body: File) => designerProfileService.updateMyAvatar(body),
  });
}
