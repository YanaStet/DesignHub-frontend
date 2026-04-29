import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { LIKE_KEYS, type LikeResponse } from "../model";
import type { HttpError } from "@/shared/api/api";
import { likeService } from "../api/service";

export function useGetLikesQuery(
  designId: string,
): UseQueryResult<LikeResponse> {
  return useQuery<LikeResponse, HttpError>({
    queryKey: [LIKE_KEYS.LIKES, designId],
    queryFn: () => likeService.getLikesByDesignId(designId),
    enabled: !!designId,
  });
}
