import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { TAG_KEYS, type Tag } from "../model";
import type { HttpError } from "@/shared/api/api";
import { tagService } from "../api/service";

export function useGetAllTagsQuery<TData = Tag[]>(
  options?: Partial<UseQueryOptions<Tag[], HttpError, TData>>
): UseQueryResult<TData> {
  return useQuery<Tag[], HttpError, TData>({
    queryKey: [TAG_KEYS.ALL_TAGS],
    queryFn: () => tagService.getAllTags(),
    ...options,
  });
}
