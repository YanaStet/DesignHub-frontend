import type { AxiosError } from "axios";
import { showToast } from "../utils/showToast";
import type { ApiErrorResponse } from "../types/auth";

const generalErrorCode = "Validation.General";

export const handleApiError = (error: AxiosError<ApiErrorResponse, any>) => {
  const apiErrors = error.response?.data.errors || [];

  const filteredApiErrors =
    apiErrors.length > 1
      ? apiErrors.filter((error) => error.code !== generalErrorCode)
      : apiErrors;

  if (filteredApiErrors.length) {
    filteredApiErrors.forEach((error) => {
      showToast("warning", error.description);
    });
    return;
  }

  if (error.response?.data.detail) {
    showToast(
      error.response?.data.status < 500 ? "warning" : "error",
      error.response?.data.detail
    );
  }
};
