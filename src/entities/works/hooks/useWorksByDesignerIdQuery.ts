import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { WORK_KEYS, type Work } from "../model";
import { AxiosError } from "axios";
import { workService } from "../api/service";
import type { PaginationResponse } from "@/shared/types";

export function useWorksByDesignerIdQuery<TData = PaginationResponse<Work>>(
  userId: string,
  options?: Partial<UseQueryOptions<PaginationResponse<Work>, AxiosError, TData>>,
): UseQueryResult<TData> {
  return useQuery<PaginationResponse<Work>, AxiosError, TData>({
    queryKey: [WORK_KEYS.GET_ALL_WORK, userId],
    queryFn: () => workService.getWorksByDesignerId(userId),
    ...options,
  });
}
