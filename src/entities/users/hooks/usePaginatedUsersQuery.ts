import {
    useQuery,
    type UseQueryOptions,
    type UseQueryResult,
} from "@tanstack/react-query";
import { USER_KEYS, type PaginatedUsers } from "../model";
import { userService } from "../api/service";
import { AxiosError } from "axios";
import type { PaginationParams } from "@/shared/types";

export function usePaginatedUsersQuery<TData = PaginatedUsers>(
    params: PaginationParams,
    options?: Partial<UseQueryOptions<PaginatedUsers, AxiosError, TData>>
): UseQueryResult<TData> {
    return useQuery<PaginatedUsers, AxiosError, TData>({
        queryKey: [USER_KEYS.GET_ALL_USER],
        queryFn: () => userService.getPaginatedUsers(params),
        ...options,
    });
}
