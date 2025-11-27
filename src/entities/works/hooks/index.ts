import { useGetAllWorksQuery } from "./useGetAllWorksQuery";
import { useGetWorkByIdQuery } from "./useGetWorkByIdQuery";
import { useWorkByDesignerIdInfiniteQuery } from "./useWorkByDesignerIdInfiniteQuery";
import { useWorkInfiniteQuery } from "./useWorkInfiniteQuery";
import { useWorksByDesignerIdQuery } from "./useWorksByDesignerIdQuery";

export const WorkHooks = {
  useGetAllWorksQuery,
  useWorkInfiniteQuery,
  useGetWorkByIdQuery,
  useWorksByDesignerIdQuery,
  useWorkByDesignerIdInfiniteQuery,
};
