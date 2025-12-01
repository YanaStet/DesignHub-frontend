import { useCommentsByWorkIdQuery } from "./useCommentsByWorkIdQuery";
import { useCreateCommentMutation } from "./useCreateCommentMutation";
import { useDeleteCommentMutation } from "./useDeleteCommentMutation";
import { useUpdateCommentMutation } from "./useUpdateCommentMutation";

export const commentHooks = {
  useCommentsByWorkIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
};
