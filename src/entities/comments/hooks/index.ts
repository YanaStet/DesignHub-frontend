import { useBanCommentMutation } from "./useBanCommentMutation";
import { useCommentsByWorkIdQuery } from "./useCommentsByWorkIdQuery";
import { useCreateCommentMutation } from "./useCreateCommentMutation";
import { useDeleteCommentMutation } from "./useDeleteCommentMutation";
import { useInfinityCommentsQuery } from "./useInfinityCommentsQuery";
import { useUpdateCommentMutation } from "./useUpdateCommentMutation";

export const commentHooks = {
  useCommentsByWorkIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useInfinityCommentsQuery,
  useBanCommentMutation
};
