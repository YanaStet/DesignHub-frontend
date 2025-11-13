import { sharedHooks } from "@/shared/hooks";

export const HomePageLazy = sharedHooks.useLazyWithRetry(() =>
  import("./Home.page").then((module) => ({ default: module.HomePage }))
);
