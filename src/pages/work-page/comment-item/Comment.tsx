import type { Comment } from "@/entities/comments/model";
import type { StarIcon } from "@/pages/designer-profile/DesignerProfile";
import { BASE_URL } from "@/shared/api";
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
import clsx from "clsx";
import { useMemo } from "react";

type CommentProps = {
  comment: Comment;
  designerAvatarUrl: string | null;
};

export function CommentItem({ comment, designerAvatarUrl }: CommentProps) {
  const { me } = useMe();
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
    <div className="flex gap-5 w-full mb-5">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={BASE_URL + designerAvatarUrl}
          alt="@shadcn"
          className="object-cover"
        />
        <AvatarFallback>
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
                <Icon name="Comment" className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-primary-1 text-gray-4"
                align="center"
              >
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Typography className="text-gray-6">{comment.comment_text}</Typography>
      </div>
    </div>
  );
}
