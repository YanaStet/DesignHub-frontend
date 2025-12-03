import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { DesignerProfile, DesignerProfileRequest } from "../model";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import { designerProfileService } from "../api/service";

export function useUpdateDesignerProfileMutation(): UseMutationResult<
  DesignerProfile,
  AxiosError<ApiErrorResponse>,
  DesignerProfileRequest
> {
  return useMutation({
    mutationFn: (body: DesignerProfileRequest) =>
      designerProfileService.updateMyDesignerProfile(body),
  });
}
