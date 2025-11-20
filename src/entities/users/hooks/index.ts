import { useCreateUserMutation } from "./useCreateUserMutation";
import { useGetAllUserQuery } from "./useGetAllUsersQuery";
import { useGetMeQuery } from "./useGetMeQuery";
import { useGetUserBiIdQuery } from "./useGetUserByIdQuery";

export const UserHooks = {
  useGetAllUserQuery,
  useCreateUserMutation,
  useGetMeQuery,
  useGetUserBiIdQuery,
};
