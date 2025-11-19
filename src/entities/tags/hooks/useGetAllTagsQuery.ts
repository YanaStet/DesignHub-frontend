import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { TAG_KEYS, type Tag } from "../model";
import { AxiosError } from "axios";
import { tagService } from "../api/service";

export function useGetAllTagsQuery<TData = Tag[]>(
  options?: Partial<UseQueryOptions<Tag[], AxiosError, TData>>
): UseQueryResult<TData> {
  return useQuery<Tag[], AxiosError, TData>({
    queryKey: [TAG_KEYS.ALL_TAGS],
    queryFn: () => tagService.getAllTags(),
    ...options,
  });
}
