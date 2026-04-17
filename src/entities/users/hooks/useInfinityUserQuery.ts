import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { USER_KEYS, type PaginatedUsers, type User } from "../model";
import type { AxiosError } from "axios";
import { userService } from "../api/service";
import type { PaginationResponse } from "@/shared/types";

export function useInfinityUserQuery(
) {
    return useInfiniteQuery<
        PaginationResponse<User>,
        AxiosError,
        InfiniteData<PaginatedUsers>, // TData (дані після select, тут = InfiniteData)
        [string],
        number
    >({
        queryKey: [USER_KEYS.INFINITE_QUERY],

        queryFn: ({ pageParam = 1 }) => {
            const params = {
                limit: 12,
                page: pageParam,
            };

            return userService.getPaginatedUsers(params);
        },

        getNextPageParam: (lastPage) => {
            if (lastPage.data.length < 12) return undefined;

            return lastPage.page + 1; // next page number
        },

        initialPageParam: 1,
    });
}
