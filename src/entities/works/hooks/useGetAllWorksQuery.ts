import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { WORK_KEYS, type Work } from "../model";
import { AxiosError } from "axios";
import { workService } from "../service/service";

export function useGetAllWorksQuery<TData = Work[]>(
  options?: Partial<UseQueryOptions<Work[], AxiosError, TData>>
): UseQueryResult<TData> {
  return useQuery<Work[], AxiosError, TData>({
    queryKey: [WORK_KEYS.GET_ALL_WORK],
    queryFn: () => workService.getAllWorks(),
    ...options,
  });
}
