import type { User } from "@/entities/users/model";
import type { Work } from "@/entities/works/model";

export type Comment = {
  content: string;
  id: string;
  design: Work;
  author: User;
};

export type CommentRequest = {
  content: string;
  designId: string;
};

export type UpdateCommentRequest = {
  content: string;
};
