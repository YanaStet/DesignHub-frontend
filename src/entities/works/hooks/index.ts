import { useCreateWorkMutation } from "./useCreateWorkMutation";
import { useDeleteWorkMutation } from "./useDeleteWorkMutation";
import { useGetAllWorksQuery } from "./useGetAllWorksQuery";
import { useGetWorkByIdQuery } from "./useGetWorkByIdQuery";
import { useUpdateWorkMutation } from "./useUpdateWorkMutation";
import { useWorkByDesignerIdInfiniteQuery } from "./useWorkByDesignerIdInfiniteQuery";
import { useWorkInfiniteQuery } from "./useWorkInfiniteQuery";
import { useWorksByDesignerIdQuery } from "./useWorksByDesignerIdQuery";

export const WorkHooks = {
  useGetAllWorksQuery,
  useWorkInfiniteQuery,
  useGetWorkByIdQuery,
  useWorksByDesignerIdQuery,
  useWorkByDesignerIdInfiniteQuery,
  useCreateWorkMutation,
  useDeleteWorkMutation,
  useUpdateWorkMutation,
};
