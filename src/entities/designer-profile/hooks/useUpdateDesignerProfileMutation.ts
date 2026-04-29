import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { DesignerProfile, DesignerProfileRequest } from "../model";
import type { HttpError } from "@/shared/api/api";
import { designerProfileService } from "../api/service";

export function useUpdateDesignerProfileMutation(): UseMutationResult<
  DesignerProfile,
  HttpError,
  DesignerProfileRequest
> {
  return useMutation({
    mutationFn: (body: DesignerProfileRequest) =>
      designerProfileService.updateMyDesignerProfile(body),
  });
}
