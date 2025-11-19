import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { CATEGORY_KEYS, type Category } from "../model";
import { AxiosError } from "axios";
import { categoryService } from "../api/service";

export function useGetAllCategoriesQuery<TData = Category[]>(
  options?: Partial<UseQueryOptions<Category[], AxiosError, TData>>
): UseQueryResult<TData> {
  return useQuery<Category[], AxiosError, TData>({
    queryKey: [CATEGORY_KEYS.ALL_CATEGORIES],
    queryFn: () => categoryService.getAllCategories(),
    ...options,
  });
}
