export type Comment = {
  comment_text: string;
  rating_score: number;
  id: number;
  author_id: number;
  work_id: number;
  review_date: string;
  author: {
    id: number;
    firstName: string;
    lastName: string;
  };
};

export type CommentRequest = {
  comment_text: string;
  rating_score: number;
  work_id: number;
};
