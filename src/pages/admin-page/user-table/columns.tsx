import type { User } from "@/entities/users/model";
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
import type { Dispatch, SetStateAction } from "react";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { useNavigate } from "react-router-dom";

export const getUserColumns = (
  setOpen: (open: boolean) => void,
  setSelectedData: Dispatch<SetStateAction<User | null>>,
): ColumnDef<User>[] => {
  const navigate = useNavigate();
  const handleBanUser = (user: User) => {
    setOpen(true);
    setSelectedData(user);
  };

  const handleVisitUserProfile = (user: User) => {
    navigate(`/users/${user._id}`);
  }

  return [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Typography variant="body2" className="text-white cursor-pointer hover:underline" onClick={() => handleVisitUserProfile(user)}>
            {user.email}
          </Typography>
        );
      },
    },
    {
      accessorKey: "isBanned",
      header: "Status",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <span
            className={clsx(
              "p-2 rounded-full",
              user.isBanned
                ? "bg-red-950 text-red-300"
                : "bg-green-950 text-green-300",
            )}
          >
            {user.isBanned ? "Banned" : "Active"}
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
              <DropdownMenuItem onClick={() => handleBanUser(user)}>
                {user.isBanned ? "Unban" : "Ban"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
