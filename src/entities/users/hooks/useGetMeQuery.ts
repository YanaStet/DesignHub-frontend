import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { USER_KEYS, type User } from "../model";
import { userService } from "../api/service";
import type { HttpError } from "@/shared/api/api";

export function useGetMeQuery<TData = User>(
  options?: Partial<UseQueryOptions<User, HttpError, TData>>
): UseQueryResult<TData> {
  return useQuery<User, HttpError, TData>({
    queryKey: [USER_KEYS.GET_ME],
    queryFn: () => userService.getMe(),
    ...options,
  });
}
