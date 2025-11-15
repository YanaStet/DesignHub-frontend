import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { USER_KEYS, type User } from "../model";
import { userService } from "../api/service";
import { AxiosError } from "axios";

export function useGetUserBiIdQuery<TData = User>(
  userId: number,
  options?: Partial<UseQueryOptions<User, AxiosError, TData>>
): UseQueryResult<TData> {
  return useQuery<User, AxiosError, TData>({
    queryKey: [USER_KEYS.GET_USER_BY_ID],
    queryFn: () => userService.getUserById(userId),
    ...options,
  });
}
