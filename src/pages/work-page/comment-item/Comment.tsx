import { commentHooks } from "@/entities/comments/hooks";
import {
  COMMENT_KEYS,
  type Comment,
  type UpdateCommentRequest,
} from "@/entities/comments/model";
import { CustomAlertDialog } from "@/shared/custom-ui/CustomAlertDialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/shadcn-ui/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/shadcn-ui/ui/dropdown-menu";
import { Icon } from "@/shared/shadcn-ui/ui/icon";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { useMe } from "@/shared/store/meStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AddCommentDialog } from "../add-comment-dialog/AddCommentDialog";
import { showToast } from "@/shared/utils/showToast";
import { handleApiError } from "@/shared/api/apiError";
import { DesignerProfileHooks } from "@/entities/designer-profile/hooks";
import { Button } from "@/shared/shadcn-ui/ui/button";

type CommentProps = {
  comment: Comment;
  setOpenCommentReportDialog: (open: boolean) => void;
  setTargetCommentId: (id: string) => void;
};

export function CommentItem({ comment, setOpenCommentReportDialog, setTargetCommentId }: CommentProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { me } = useMe();
  const queryClient = useQueryClient();

  const { data: profile } = DesignerProfileHooks.useDesignerProfileByIdQuery(
    comment.author._id
  );
  const { mutate, isPending } = commentHooks.useDeleteCommentMutation(
    comment._id
  );
  const { mutate: edit, isPending: isEditLoading } =
    commentHooks.useUpdateCommentMutation(comment._id);

  const handleDelete = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          showToast("success", "Comment was successfuly deleted.");
          queryClient.invalidateQueries({ queryKey: [COMMENT_KEYS.COMMENTS] });
          setOpenDelete(false);
        },
        onError: (er) => handleApiError(er),
      }
    );
  };

  const handleEdit = (body: UpdateCommentRequest) => {
    edit(body, {
      onSuccess: () => {
        showToast("success", "Comment was successfuly edited.");
        queryClient.invalidateQueries({ queryKey: [COMMENT_KEYS.COMMENTS] });
        setOpenEdit(false);
      },
      onError: (er) => handleApiError(er),
    });
  };

  return (
    <div className="flex gap-5 w-full mb-5 p-3 rounded-2xl bg-primary-2">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={profile?.avatar || undefined}
          alt="@shadcn"
          className="object-cover"
        />
        <AvatarFallback className="text-gray-1">
          {comment.author.firstName[0]}
          {comment.author.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <Typography className="text-gray-6">
              {comment.author.firstName} {comment.author.lastName}
            </Typography>
            <Button onClick={() => {
              setOpenCommentReportDialog(true)
              setTargetCommentId(comment._id)
            }} className="bg-transparent hover:bg-transparent hover:scale-120 transition-all cursor-pointer duration-300">
              <Icon name="Report" className="w-5 text-white" />
            </Button>
          </div>

          {comment.author._id === me?._id && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="flex items-center">
                <Icon name="Hamburger" className="w-4 h-4 text-gray-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-primary-1 text-gray-4"
                align="center"
              >
                <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Typography className="text-gray-6">{comment.content}</Typography>
      </div>
      <CustomAlertDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        title="Are you absolutely sure?"
        description="This action will permanently delete your comment."
        onConfirm={handleDelete}
        loading={isPending}
      />
      <AddCommentDialog
        isEdit
        workId={comment.design._id}
        open={openEdit}
        setOpen={setOpenEdit}
        handleEditComment={handleEdit}
        isLoading={isEditLoading}
      />
    </div>
  );
}
