import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { WORK_KEYS, type Work, type WorkQueryParams } from "../model";
import type { HttpError } from "@/shared/api/api";
import { workService } from "../api/service";
import type { PaginationResponse } from "@/shared/types";

export function useGetAllWorksQuery<TData = PaginationResponse<Work>>(
  params: WorkQueryParams,
  options?: Partial<
    UseQueryOptions<PaginationResponse<Work>, HttpError, TData>
  >,
): UseQueryResult<TData> {
  return useQuery<PaginationResponse<Work>, HttpError, TData>({
    queryKey: [WORK_KEYS.GET_ALL_WORK, params],
    queryFn: () => workService.getPaginatedWorks(params),
    ...options,
  });
}
