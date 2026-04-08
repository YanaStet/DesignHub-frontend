import { WORK_KEYS, type Work } from "@/entities/works/model";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { Link } from "react-router-dom";
import { Icon } from "../shadcn-ui/ui/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn-ui/ui/dropdown-menu";
import { WorkHooks } from "@/entities/works/hooks";
import { CustomAlertDialog } from "./CustomAlertDialog";
import { useState } from "react";
import { showToast } from "../utils/showToast";
import { useQueryClient } from "@tanstack/react-query";
import { handleApiError } from "../api/apiError";
import { useMe } from "../store/meStore";
import { ROUTE_PATHS } from "../utils/routes";
import { EditWorkDialog } from "@/pages/my-profile/edit-work-dialog/EditWorkDialog";

type WorkCardProps = {
  work: Work;
  myProfile?: boolean;
};

export function WorkCard({ work, myProfile }: WorkCardProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { mutate: deleteWork, isPending: isDeleteLoading } =
    WorkHooks.useDeleteWorkMutation(work._id);

  const { me } = useMe();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteWork(
      {},
      {
        onSuccess: () => {
          showToast("success", "You successfuly deleted your work.");
          setOpenDelete(false);
          queryClient.invalidateQueries({
            queryKey: [WORK_KEYS.INFINITE_QUERY],
          });
        },
        onError: (er) => {
          handleApiError(er);
          setOpenDelete(false);
        },
      },
    );
  };

  return (
    <>
      <Link
        to={`/works/${work._id}`}
        className="relative flex p-3 gap-3 flex-col bg-primary-1 rounded-2xl hover:scale-103 transition-transform duration-400"
      >
        {myProfile && (
          <div className="absolute top-4 right-4 text-gray-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Icon name="Hamburger" className="w-5 h-5 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-primary-1 text-gray-4"
                align="center"
              >
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDelete(true);
                  }}
                >
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenEdit(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <div className="w-50 h-30 2xl:w-70 2xl:h-40 flex justify-center overflow-hidden">
          {work.coverUrl !== null ? (
            <img
              src={work.coverUrl}
              alt="Photo"
              className="object-cover w-full rounded-2xl"
            />
          ) : (
            <div className="w-50 h-30 2xl:w-80 2xl:h-50 bg-gray-1 rounded-2xl flex items-center justify-center">
              <div className="w-15 h-15 rounded-full bg-gray-2" />
            </div>
          )}
        </div>
        <div className="flex gap-1 flex-row items-center">
          <Link
            to={
              work.author._id === me?._id
                ? ROUTE_PATHS.PROFILE
                : `/users/${work.author._id}`
            }
            onClick={(event) => event.stopPropagation()}
          >
            <Typography
              variant="body4"
              className="text-primary-3 hover:underline"
            >
              {work.author.firstName} {work.author.lastName}
            </Typography>
          </Link>
          <span className="h-1 w-1 rounded-full bg-primary-3" />
          <Typography variant="body4" className="text-primary-3">
            {new Date(work.createdAt).toISOString().split("T")[0]}
          </Typography>
        </div>
        <Typography variant="h4" className="text-gray-4 w-50 truncate">
          {work.title}
        </Typography>
        <Typography
          variant="body4"
          className="text-gray-4 w-50 break-words truncate"
        >
          {work.description}
        </Typography>
        {work.tags && (
          <div className="mt-2 flex flex-wrap gap-2 max-w-50 max-h-10 overflow-y-auto custom-scrollbar-container">
            {work.tags.map((tag) => (
              <div
                key={tag._id}
                className="text-gray-1 px-2 py-1 rounded-xl bg-gray-3 text-xs"
              >
                {tag.name}
              </div>
            ))}
          </div>
        )}
      </Link>
      <CustomAlertDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        title="Are you sure?"
        onConfirm={handleDelete}
        confirmLabel="Delete"
        description="Your work will be deleted permanently."
        loading={isDeleteLoading}
      />
      <EditWorkDialog
        open={openEdit}
        setOpen={setOpenEdit}
        defaultValues={work}
      />
    </>
  );
}
