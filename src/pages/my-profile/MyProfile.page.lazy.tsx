import { sharedHooks } from "@/shared/hooks";

export const MyProfilePageLazy = sharedHooks.useLazyWithRetry(() =>
  import("./MyProfile.page").then((module) => ({
    default: module.MyProfilePage,
  }))
);
