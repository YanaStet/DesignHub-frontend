import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DESIGNER_PROFILE_KEYS, type DesignerProfile } from "../model";
import { designerProfileService } from "../api/service";

export function useDesignerProfileByIdQuery<TData = DesignerProfile>(
  designer_id: number,
  options?: Partial<UseQueryOptions<DesignerProfile, AxiosError, TData>>
): UseQueryResult<TData> {
  return useQuery<DesignerProfile, AxiosError, TData>({
    queryKey: [DESIGNER_PROFILE_KEYS.DESIGNER_PROFILE_ME, designer_id],
    queryFn: () => designerProfileService.getDesignerProfileById(designer_id),
    ...options,
  });
}
