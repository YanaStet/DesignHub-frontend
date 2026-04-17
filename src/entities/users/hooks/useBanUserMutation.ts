import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { User } from "../model";
import type { AxiosError } from "axios";
import { userService } from "../api/service";
import type { ApiErrorResponse } from "@/shared/types";

export function useBanUserMutation(): UseMutationResult<
    User,
    AxiosError<ApiErrorResponse>,
    string
> {
    return useMutation({
        mutationFn: (id: string) => userService.banUser(id),
    });
}
