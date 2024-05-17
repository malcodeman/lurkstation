import { RedditPost, RedditComment } from "@/types";
import { parse } from "path";
import { equals, filter, includes, replace } from "ramda";

import {
  SUPPORTED_FILE_EXTENSIONS,
  SUPPORTED_VIDEO_EXTENSIONS,
} from "./constants";

export const getExtension = (path: string) => {
  return parse(path).ext;
};

export const parseGifv = (url: string) => {
  return replace("gifv", "mp4", url);
};

export const parsePost = (post: RedditPost): RedditPost => {
  const { url } = post.data;
  const extension = getExtension(url);

  if (includes(extension, SUPPORTED_VIDEO_EXTENSIONS)) {
    return {
      ...post,
      data: {
        ...post.data,
        is_video: true,
        url: equals(extension, ".gifv")
          ? post.data.preview?.reddit_video_preview?.fallback_url || ""
          : url,
      },
    };
  }

  return post;
};

export const parsePosts = (posts: RedditPost[]) => {
  return filter(
    (item) =>
      includes(getExtension(item.data.url), SUPPORTED_FILE_EXTENSIONS) ||
      equals(item.data.is_gallery, true),
    posts
  );
};

export const parseComments = (comments: RedditComment[]) => {
  return filter(
    (item) =>
      item.kind !== "more" &&
      item.data.author !== "AutoModerator" &&
      item.data.body !== "[removed]" &&
      item.data.body !== "[deleted]",
    comments
  );
};

export const parseParam = (param: string | string[]) => {
  return Array.isArray(param) ? param[0] : param;
};
