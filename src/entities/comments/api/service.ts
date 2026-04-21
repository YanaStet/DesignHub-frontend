import api from "@/shared/api/api";
import type { Comment, CommentRequest, UpdateCommentRequest } from "../model";
import type { PaginationParams, PaginationResponse } from "@/shared/types";
import { buildQueryParams } from "@/shared/utils/query";

class CommentService {
  async getByWorkIdComments(workId: string): Promise<Comment[]> {
    const data = await api.get<Comment[]>(`/comments/${workId}`);
    return data;
  }
  async createComment(body: CommentRequest): Promise<Comment> {
    const data = await api.post<Comment>(`/comments/${body.designId}`, {
      text: body.content,
    });
    return data;
  }
  async updateComment(
    commentId: string,
    body: UpdateCommentRequest,
  ): Promise<Comment> {
    const data = await api.put<Comment>(`/comments/${commentId}`, {
      text: body.content,
    });
    return data;
  }
  async deleteComment(commentId: string): Promise<Comment> {
    const data = await api.delete<Comment>(`/comments/${commentId}`);
    return data;
  }
  async getPaginatedComments(
    params?: PaginationParams,
  ): Promise<PaginationResponse<Comment>> {
    const data = await api.get<PaginationResponse<Comment>>(
      params ? `/comments?${buildQueryParams(params)}` : `/comments`,
    );
    return data;
  }
  async banComment(commentId: string, reason: string): Promise<Comment> {
    const data = await api.put<Comment>(`/comments/ban/${commentId}`, {
      reason,
    });
    return data;
  }
}

export const commentService = new CommentService();
