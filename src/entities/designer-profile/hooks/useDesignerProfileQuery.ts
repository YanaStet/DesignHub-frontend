import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DESIGNER_PROFILE_KEYS, type DesignerProfile } from "../model";
import { designerProfileService } from "../api/service";

export function useDesignerProfileQuery<TData = DesignerProfile>(
  options?: Partial<UseQueryOptions<DesignerProfile, AxiosError, TData>>
): UseQueryResult<TData> {
  return useQuery<DesignerProfile, AxiosError, TData>({
    queryKey: [DESIGNER_PROFILE_KEYS.DESIGNER_PROFILE_ME],
    queryFn: () => designerProfileService.getMyDesignerProfile(),
    ...options,
  });
}
