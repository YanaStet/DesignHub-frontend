import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { WORK_KEYS, type Work, type WorkQueryParams } from "../model";
import { AxiosError } from "axios";
import { workService } from "../api/service";
import type { PaginationResponse } from "@/shared/types";

export function useGetAllWorksQuery<TData = Work[]>(
  params: WorkQueryParams,
  options?: Partial<UseQueryOptions<PaginationResponse<Work>, AxiosError, TData>>
): UseQueryResult<TData> {
  return useQuery<PaginationResponse<Work>, AxiosError, TData>({
    queryKey: [WORK_KEYS.GET_ALL_WORK, params],
    queryFn: () => workService.getPaginatedWorks(params),
    ...options,
  });
}
