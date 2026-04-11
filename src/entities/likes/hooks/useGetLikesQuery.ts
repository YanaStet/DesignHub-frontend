import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { LIKE_KEYS, type LikeResponse } from "../model";
import type { AxiosError } from "axios";
import { likeService } from "../api/service";

export function useGetLikesQuery(
  designId: string,
): UseQueryResult<LikeResponse> {
  return useQuery<LikeResponse, AxiosError>({
    queryKey: [LIKE_KEYS.LIKES, designId],
    queryFn: () => likeService.getLikesByDesignId(designId),
    enabled: !!designId,
  });
}
