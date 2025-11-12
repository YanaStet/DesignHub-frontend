import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { USER_KEYS, type User } from "../model";
import { userService } from "../service/service";
import { AxiosError } from "axios";

export function useGetAllUserQuery<TData = User[]>(
  options?: Partial<UseQueryOptions<User[], AxiosError, TData>>
): UseQueryResult<TData> {
  return useQuery<User[], AxiosError, TData>({
    queryKey: [USER_KEYS.GET_ALL_USER],
    queryFn: () => userService.getAllUsers(),
    ...options,
  });
}
