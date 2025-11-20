import { sharedHooks } from "@/shared/hooks";

export const WorkPageLazy = sharedHooks.useLazyWithRetry(() =>
  import("./Work.page").then((module) => ({ default: module.WorkPage }))
);
