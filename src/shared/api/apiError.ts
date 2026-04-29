import { HttpError } from "./api";
import { showToast } from "../utils/showToast";
import type { ApiErrorResponse } from "../types/auth";

const generalErrorCode = "Validation.General";

export const handleApiError = (error: unknown) => {
  if (error instanceof HttpError) {
    const data = error.body as ApiErrorResponse | undefined;

    if (!data) {
      showToast("error", error.message || "An unknown error occurred");
      return;
    }

    const apiErrors = data.errors || [];

    const filteredApiErrors =
      apiErrors.length > 1
        ? apiErrors.filter((err) => err.code !== generalErrorCode)
        : apiErrors;

    if (filteredApiErrors.length) {
      filteredApiErrors.forEach((err) => {
        showToast("warning", err.description);
      });
      return;
    }

    if (data.detail) {
      showToast(error.status < 500 ? "warning" : "error", data.detail);
      return;
    }
  }

  if (error instanceof Error) {
    showToast("error", error.message || "An unknown error occurred");
    return;
  }

  showToast("error", "An unknown error occurred");
};
