export type Sort = "hot" | "new" | "top" | "controversial";

export type Time = "hour" | "day" | "week" | "month" | "year" | "all";

export type RedditPost = {
  kind: string;
  data: {
    id: string;
    url: string;
    is_video: boolean;
    is_gallery?: boolean;
    media_metadata?: {
      [key: string]: {
        status: string;
        id: string;
        s: {
          u: string;
        };
      };
    };
  };
};

export type RedditComment = {
  kind: string;
  data: {
    author: string;
    id: string;
    body: string;
  };
};

export type CommentTree = [
  { kind: string; data: { children: RedditPost[] } },
  { kind: string; data: { children: RedditComment[] } }
];

export type ErrorComponent = {
  error: Error;
  reset: () => void;
};
