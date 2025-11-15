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
