export type Sort = "hot" | "new" | "top" | "controversial";

export type Time = "hour" | "day" | "week" | "month" | "year" | "all";

export type Post = {
  kind: string;
  data: {
    id: string;
    url: string;
    is_video: boolean;
  };
};

export type Comment = {
  kind: string;
  data: {
    author: string;
    id: string;
    body: string;
  };
};

export type ErrorComponent = {
  error: Error;
  reset: () => void;
};
