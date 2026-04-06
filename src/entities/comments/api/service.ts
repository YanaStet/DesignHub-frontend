import api from "@/shared/api/api";
import type { Comment, CommentRequest, UpdateCommentRequest } from "../model";

class CommentService {
  async getByWorkIdComments(workId: string): Promise<Comment[]> {
    const data = await api.get<Comment[]>(`/comments/${workId}`);
    return data;
  }
  async createComment(body: CommentRequest): Promise<Comment> {
    const data = await api.post<Comment>("/comments/", body);
    return data;
  }
  async updateComment(
    commentId: string,
    body: UpdateCommentRequest,
  ): Promise<Comment> {
    const data = await api.put<Comment>(`/comments/${commentId}`, body);
    return data;
  }
  async deleteComment(commentId: string): Promise<Comment> {
    const data = await api.delete<Comment>(`/comments/${commentId}`);
    return data;
  }
}

export const commentService = new CommentService();
