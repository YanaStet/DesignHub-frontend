import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import { DESIGNER_PROFILE_KEYS, type DesignerProfile } from "../model";
import { designerProfileService } from "../api/service";

export function useDesignerProfileByIdQuery<TData = DesignerProfile>(
  designer_id: string,
  options?: Partial<UseQueryOptions<DesignerProfile, HttpError, TData>>
): UseQueryResult<TData> {
  return useQuery<DesignerProfile, HttpError, TData>({
    queryKey: [DESIGNER_PROFILE_KEYS.DESIGNER_PROFILE_BY_ID, designer_id],
    queryFn: () => designerProfileService.getDesignerProfileById(designer_id),
    ...options,
  });
}
