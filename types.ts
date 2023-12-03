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
    preview: {
      reddit_video_preview?: {
        bitrate_kbps: number;
        dash_url: string;
        duration: number;
        fallback_url: string;
        height: number;
        hls_url: string;
        is_gif: boolean;
        scrubber_media_url: string;
        transcoding_status: string;
        width: number;
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
