import api from "@/shared/api/api";
import type { Comment, CommentRequest, UpdateCommentRequest } from "../model";

class CommentService {
  async getByWorkIdComments(workId: number): Promise<Comment[]> {
    const data = await api.get<Comment[]>(`/comments/by-work/${workId}`);
    return data;
  }
  async createComment(body: CommentRequest): Promise<Comment> {
    const data = await api.post<Comment>("/comments/", body);
    return data;
  }
  async updateComment(
    commentId: number,
    body: UpdateCommentRequest
  ): Promise<Comment> {
    const data = await api.put<Comment>(`/comments/${commentId}`, body);
    return data;
  }
  async deleteComment(commentId: number): Promise<Comment> {
    const data = await api.delete<Comment>(`/comments/${commentId}`);
    return data;
  }
}

export const commentService = new CommentService();
