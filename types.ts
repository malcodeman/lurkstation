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
        e?: string;
        status: "valid" | "failed";
        id?: string;
        s?: {
          mp4?: string;
          gif?: string;
          u?: string;
        };
      };
    };
    preview?: {
      images?: {
        source: {
          url: string;
        };
      }[];
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
    permalink: string;
    author: string;
    title: string;
    ups: number;
    number: number;
    created_utc: number;
    over_18: boolean;
    media: {
      reddit_video?: {
        fallback_url: string;
      };
    } | null;
  };
};

export type RedditComment = {
  kind: string;
  data: {
    author: string;
    id: string;
    body: string;
    ups: number;
    created_utc: number;
  };
};

export type CommentTree = [
  { kind: string; data: { children: RedditPost[] } },
  { kind: string; data: { children: RedditComment[] } },
];

export type ErrorComponent = {
  error: Error;
  reset: () => void;
};
