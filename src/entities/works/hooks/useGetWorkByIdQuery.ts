import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { WORK_KEYS, type Work } from "../model";
import type { HttpError } from "@/shared/api/api";
import { workService } from "../api/service";

export function useGetWorkByIdQuery<TData = Work>(
  workId: string,
  options?: Partial<UseQueryOptions<Work, HttpError, TData>>,
): UseQueryResult<TData> {
  return useQuery<Work, HttpError, TData>({
    queryKey: [WORK_KEYS.GET_ALL_WORK, workId],
    queryFn: () => workService.getWorkById(workId),
    ...options,
  });
}
