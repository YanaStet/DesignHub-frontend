import type { User } from "@/entities/users/model";

export type Comment = {
  content: string;
  _id: string;
  design: string;
  author: User;
};

export type CommentRequest = {
  content: string;
  designId: string;
};

export type UpdateCommentRequest = {
  content: string;
};
