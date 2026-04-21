import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/shadcn-ui/ui/dropdown-menu";
import { Icon } from "@/shared/shadcn-ui/ui/icon";
import { Button } from "@/shared/shadcn-ui/ui/button";
import clsx from "clsx";
import { type Comment } from "@/entities/comments/model";
import type { Dispatch, SetStateAction } from "react";

export const getCommentColumns = (
  setOpen: (open: boolean) => void,
  setSelectedData: Dispatch<SetStateAction<Comment | null>>,
): ColumnDef<Comment>[] => {
  const handleBanComment = (comment: Comment) => {
    setOpen(true);
    setSelectedData(comment);
  };

  return [
    {
      accessorKey: "content",
      header: "Content",
    },
    {
      accessorKey: "design",
      header: "Design",
      cell: ({ row }) => {
        const comment = row.original;
        return <span>{comment.design.title}</span>;
      },
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => {
        const work = row.original;
        return (
          <span>
            {work.author.firstName} {work.author.lastName}
          </span>
        );
      },
    },
    {
      accessorKey: "author.email",
      header: "Email",
      cell: ({ row }) => {
        const work = row.original;
        return <span>{work.author.email}</span>;
      },
    },
    {
      accessorKey: "isHidden",
      header: "Status",
      cell: ({ row }) => {
        const comment = row.original;
        return (
          <span
            className={clsx(
              "p-2 rounded-full",
              comment.isHidden
                ? "bg-red-950 text-red-300"
                : "bg-green-950 text-green-300",
            )}
          >
            {comment.isHidden ? "Hidden" : "Visible"}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const comment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary-1 border-0"
              >
                <Icon name="ThreeDots" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-primary-1 text-gray-4"
              align="center"
            >
              <DropdownMenuItem onClick={() => handleBanComment(comment)}>
                {comment.isHidden ? "Unban" : "Ban"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
