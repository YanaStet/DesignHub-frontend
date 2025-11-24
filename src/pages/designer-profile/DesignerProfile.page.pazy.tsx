import { sharedHooks } from "@/shared/hooks";

export const DesignerProfilePageLazy = sharedHooks.useLazyWithRetry(() =>
  import("./DesignerProfile").then((module) => ({
    default: module.DesignerProfilePage,
  }))
);
