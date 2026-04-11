export type LikeResponse = {
  count: number;
  liked: boolean;
};

export type ToggleLikeResponse = {
  liked: boolean;
  message: string;
};
