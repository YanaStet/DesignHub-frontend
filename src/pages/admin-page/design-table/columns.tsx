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
import { type Work } from "@/entities/works/model";

import type { Dispatch, SetStateAction } from "react";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { useNavigate } from "react-router-dom";

export const getWorkColumns = (
  setOpen: (open: boolean) => void,
  setSelectedData: Dispatch<SetStateAction<Work | null>>,
): ColumnDef<Work>[] => {
  const navigate = useNavigate();

  const handleBanWork = (work: Work) => {
    setOpen(true);
    setSelectedData(work);
  };

  const handleVisitDesign = (work: Work) => {
    navigate(`/works/${work._id}`);
  };

  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const work = row.original;
        return (
          <Typography variant="body2" className="text-white cursor-pointer hover:underline" onClick={() => handleVisitDesign(work)}>
            {work.title}
          </Typography>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
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
        const work = row.original;
        return (
          <span
            className={clsx(
              "p-2 rounded-full",
              work.isHidden
                ? "bg-red-950 text-red-300"
                : "bg-green-950 text-green-300",
            )}
          >
            {work.isHidden ? "Hidden" : "Visible"}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
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
              <DropdownMenuItem onClick={() => handleBanWork(user)}>
                {user.isHidden ? "Unban" : "Ban"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
