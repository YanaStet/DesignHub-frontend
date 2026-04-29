import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { WORK_KEYS, type Work } from "../model";
import type { HttpError } from "@/shared/api/api";
import { workService } from "../api/service";
import type { PaginationResponse } from "@/shared/types";

export function useWorksByDesignerIdQuery<TData = PaginationResponse<Work>>(
  userId: string,
  options?: Partial<UseQueryOptions<PaginationResponse<Work>, HttpError, TData>>,
): UseQueryResult<TData> {
  return useQuery<PaginationResponse<Work>, HttpError, TData>({
    queryKey: [WORK_KEYS.GET_ALL_WORK, userId],
    queryFn: () => workService.getWorksByDesignerId(userId),
    ...options,
  });
}
