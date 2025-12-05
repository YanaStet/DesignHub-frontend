import { commentHooks } from "@/entities/comments/hooks";
import {
  COMMENT_KEYS,
  type Comment,
  type UpdateCommentRequest,
} from "@/entities/comments/model";
import type { StarIcon } from "@/pages/designer-profile/DesignerProfile";
import { BASE_URL } from "@/shared/api";
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
import clsx from "clsx";
import { useMemo, useState } from "react";
import { AddCommentDialog } from "../add-comment-dialog/AddCommentDialog";
import { showToast } from "@/shared/utils/showToast";
import { handleApiError } from "@/shared/api/apiError";
import { DesignerProfileHooks } from "@/entities/designer-profile/hooks";

type CommentProps = {
  comment: Comment;
};

export function CommentItem({ comment }: CommentProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { me } = useMe();
  const queryClient = useQueryClient();

  const { data: profile } = DesignerProfileHooks.useDesignerProfileByIdQuery(
    comment.author_id
  );
  const { mutate, isPending } = commentHooks.useDeleteCommentMutation(
    comment.id
  );
  const { mutate: edit, isPending: isEditLoading } =
    commentHooks.useUpdateCommentMutation(comment.id);

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

  const stars: StarIcon[] = useMemo(() => {
    const s: StarIcon[] = [];
    for (let i = 0; i < Math.floor(comment.rating_score || 0); i++) {
      s.push("full");
    }
    if (comment.rating_score % 1 >= 0.5) {
      s.push("half");
    }
    while (s.length < 5) {
      s.push("empty");
    }
    return s;
  }, [comment]);

  return (
    <div className="flex gap-5 w-full mb-5 p-3 rounded-2xl bg-primary-2">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={BASE_URL + profile?.avatar_url}
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
          <Typography className="text-gray-6">
            {comment.author.firstName} {comment.author.lastName}
          </Typography>
          <div className="flex items-center">
            {stars?.map((star) => (
              <div className="w-4 h-4">
                {star === "half" ? (
                  <Icon name="HalfStar" className="text-amber-300"></Icon>
                ) : (
                  <Icon
                    name="Star"
                    className={clsx(
                      star === "full" && "text-amber-300",
                      star === "empty" && "text-primary-2"
                    )}
                  ></Icon>
                )}
              </div>
            ))}
          </div>
          {comment.author_id === me?.id && (
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
        <Typography className="text-gray-6">{comment.comment_text}</Typography>
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
        workId={comment.work_id}
        open={openEdit}
        setOpen={setOpenEdit}
        handleEditComment={handleEdit}
        isLoading={isEditLoading}
      />
    </div>
  );
}
