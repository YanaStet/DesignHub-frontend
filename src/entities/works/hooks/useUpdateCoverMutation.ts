import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { HttpError } from "@/shared/api/api";
import type { Work } from "../model";
import { workService } from "../api/service";

export function useUpdateCoverMutation(
    workId: string,
): UseMutationResult<Work, HttpError, File> {
    return useMutation({
        mutationFn: (body: File) => workService.updateCoverImg(workId, body),
    });
}
