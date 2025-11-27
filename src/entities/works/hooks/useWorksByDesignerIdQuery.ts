import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { WORK_KEYS, type Work } from "../model";
import { AxiosError } from "axios";
import { workService } from "../api/service";

export function useWorksByDesignerIdQuery<TData = Work[]>(
  userId: number,
  options?: Partial<UseQueryOptions<Work[], AxiosError, TData>>
): UseQueryResult<TData> {
  return useQuery<Work[], AxiosError, TData>({
    queryKey: [WORK_KEYS.GET_ALL_WORK, userId],
    queryFn: () => workService.getWorksByDesignerId(userId),
    ...options,
  });
}
