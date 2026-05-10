import { useBanWorkMutation } from "./useBanWorkMutation";
import { useCreateWorkMutation } from "./useCreateWorkMutation";
import { useDeleteWorkMutation } from "./useDeleteWorkMutation";
import { useGetAllWorksQuery } from "./useGetAllWorksQuery";
import { useGetWorkByIdQuery } from "./useGetWorkByIdQuery";
import { useLikedWorksByDesignerIdInfinityQuery } from "./useLikedWorksByDesignerIdInfinityQuery";
import { useUpdateContentMutation } from "./useUpdateContentMutation";
import { useUpdateCoverMutation } from "./useUpdateCoverMutation";
import { useUpdateWorkMutation } from "./useUpdateWorkMutation";
import { useViewWorkMutation } from "./useViewWorkMutation";
import { useWorkByDesignerIdInfiniteQuery } from "./useWorkByDesignerIdInfiniteQuery";
import { useWorkInfiniteQuery } from "./useWorkInfiniteQuery";

export const WorkHooks = {
  useGetAllWorksQuery,
  useWorkInfiniteQuery,
  useGetWorkByIdQuery,
  useWorkByDesignerIdInfiniteQuery,
  useCreateWorkMutation,
  useDeleteWorkMutation,
  useUpdateWorkMutation,
  useViewWorkMutation,
  useUpdateCoverMutation,
  useUpdateContentMutation,
  useLikedWorksByDesignerIdInfinityQuery,
  useBanWorkMutation
};
