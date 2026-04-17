import type { User } from "@/entities/users/model";
import type { ColumnDef } from "@tanstack/react-table";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import { showToast } from "@/shared/utils/showToast";
import { handleApiError } from "@/shared/api/apiError";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/shadcn-ui/ui/dropdown-menu";
import { Icon } from "@/shared/shadcn-ui/ui/icon";
import { Button } from "@/shared/shadcn-ui/ui/button";
import clsx from "clsx";

export const getUserColumns = (mutate: UseMutateFunction<User, AxiosError<ApiErrorResponse, any>, string, unknown>): ColumnDef<User>[] => {
    const handleBanUser = (id: string) => {
        mutate(id, {
            onSuccess: () => {
                showToast('success', 'User banned successfully')
            },
            onError: (er) => {
                handleApiError(er)
            }
        })
    }

    return [{
        accessorKey: "firstName",
        header: "First Name"
    },
    {
        accessorKey: "lastName",
        header: "Last Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "isBanned",
        header: "Status",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <span className={clsx("p-2 rounded-full", user.isBanned ? "bg-red-950 text-red-300" : "bg-green-950 text-green-300")}>{user.isBanned ? "Banned" : "Active"}</span>

            );
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-primary-1 border-0">
                            <Icon name="ThreeDots" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-primary-1 text-gray-4"
                        align="center">
                        <DropdownMenuItem onClick={() => handleBanUser(user._id)}>Ban</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }]
}
