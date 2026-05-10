import { sharedHooks } from "@/shared/hooks";

export const AdminPageLazy = sharedHooks.useLazyWithRetry(() =>
  import("./Admin.page").then((module) => ({
    default: module.AdminPage,
  }))
);
