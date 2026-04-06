export type ApiErrorResponse = {
  type: string;
  title: string;
  status: number;
  detail: string;
  errors?: {
    code: string;
    description: string;
    type: "Validation";
  }[];
};

export type PaginationResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
