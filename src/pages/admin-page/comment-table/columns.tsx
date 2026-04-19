import type { ColumnDef } from "@tanstack/react-table";
import { useQueryClient, type UseMutateFunction } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/types";
import { showToast } from "@/shared/utils/showToast";
import { handleApiError } from "@/shared/api/apiError";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/shadcn-ui/ui/dropdown-menu";
import { Icon } from "@/shared/shadcn-ui/ui/icon";
import { Button } from "@/shared/shadcn-ui/ui/button";
import clsx from "clsx";
import { COMMENT_KEYS, type Comment } from "@/entities/comments/model";

export const getCommentColumns = (mutate: UseMutateFunction<Comment, AxiosError<ApiErrorResponse, any>, string, unknown>): ColumnDef<Comment>[] => {
    const queryClient = useQueryClient();

    const handleBanComment = (id: string) => {
        mutate(id, {
            onSuccess: () => {
                showToast('success', 'Comment banned successfully')
                queryClient.invalidateQueries({ queryKey: [COMMENT_KEYS.COMMENTS] })
            },
            onError: (er) => {
                handleApiError(er)
            }
        })
    }

    return [{
        accessorKey: "content",
        header: "Content"
    },
    {
        accessorKey: "design",
        header: "Design",
        cell: ({ row }) => {
            const comment = row.original;
            return (
                <span>{comment.design.title}</span>
            );
        }
    },
    {
        accessorKey: "author",
        header: "Author",
        cell: ({ row }) => {
            const work = row.original;
            return (
                <span>{work.author.firstName} {work.author.lastName}</span>
            );
        }
    },
    {
        accessorKey: "author.email",
        header: "Email",
        cell: ({ row }) => {
            const work = row.original;
            return (
                <span>{work.author.email}</span>
            );
        }
    },
    {
        accessorKey: "isHidden",
        header: "Status",
        cell: ({ row }) => {
            const comment = row.original;
            return (
                <span className={clsx("p-2 rounded-full", comment.isHidden ? "bg-red-950 text-red-300" : "bg-green-950 text-green-300")}>{comment.isHidden ? "Hidden" : "Visible"}</span>

            );
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const comment = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-primary-1 border-0">
                            <Icon name="ThreeDots" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-primary-1 text-gray-4"
                        align="center">
                        <DropdownMenuItem onClick={() => handleBanComment(comment._id)}>Ban</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }]
}
