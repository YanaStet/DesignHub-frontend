import { sharedHooks } from "@/shared/hooks";

export const LoginPageLazy = sharedHooks.useLazyWithRetry(() =>
  import("./Login.page").then((module) => ({ default: module.LoginPage }))
);
