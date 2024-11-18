import { RedditPost, RedditComment } from "@/types";
import { parse } from "path";
import { all, and, equals, filter, includes, or, replace, values } from "ramda";
import {
  SUPPORTED_FILE_EXTENSIONS,
  SUPPORTED_VIDEO_EXTENSIONS,
} from "@/app/_lib/constants";

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
      or(
        includes(getExtension(item.data.url), SUPPORTED_FILE_EXTENSIONS),
        and(
          equals(item.data.is_gallery, true),
          all(
            (item) => equals(item.status, "valid"),
            values(item.data.media_metadata ?? {}),
          ),
        ),
      ),
    posts,
  );
};

export const parseComments = (comments: RedditComment[]) => {
  return filter(
    (item) =>
      item.kind !== "more" &&
      item.data.author !== "AutoModerator" &&
      item.data.body !== "[removed]" &&
      item.data.body !== "[deleted]",
    comments,
  );
};

export const parseParam = (param: string | string[] | undefined) => {
  return Array.isArray(param) ? param[0] : param;
};
