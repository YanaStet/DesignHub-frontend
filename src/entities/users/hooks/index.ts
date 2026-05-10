import { useBanUserMutation } from "./useBanUserMutation";
import { useCreateUserMutation } from "./useCreateUserMutation";
import { useGetAllUserQuery } from "./useGetAllUsersQuery";
import { useGetMeQuery } from "./useGetMeQuery";
import { useGetUserByIdQuery } from "./useGetUserByIdQuery";
import { useInfinityUserQuery } from "./useInfinityUserQuery";
import { usePaginatedUsersQuery } from "./usePaginatedUsersQuery";

export const UserHooks = {
  useGetAllUserQuery,
  useCreateUserMutation,
  useGetMeQuery,
  useGetUserByIdQuery,
  usePaginatedUsersQuery,
  useInfinityUserQuery,
  useBanUserMutation
};
