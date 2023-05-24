import { RedditPost, RedditComment } from "@/types";
import { parse } from "path";
import { equals, filter, includes, map, replace } from "ramda";

import {
  SUPPORTED_FILE_EXTENSIONS,
  SUPPORTED_VIDEO_EXTENSIONS,
} from "./constants";
import { getGif } from "./redgifs";

export const getExtension = (path: string) => {
  return parse(path).ext;
};

export const parseGifv = (url: string) => {
  return replace("gifv", "mp4", url);
};

const parseRedgifs = async (url: string) => {
  const { pathname } = new URL(url);
  const response = await getGif(replace("/watch/", "", pathname));
  return response?.gif.urls.hd;
};

const parseVideoUrl = (url: string) => {
  if (getExtension(url) === ".gifv") {
    return parseGifv(url);
  }

  if (includes("https://www.redgifs.com/watch/", url)) {
    return parseRedgifs(url);
  }

  return url;
};

export const parsePost = async (post: RedditPost) => {
  const { url } = post.data;

  if (
    includes(getExtension(url), SUPPORTED_VIDEO_EXTENSIONS) ||
    includes("https://www.redgifs.com/watch/", url)
  ) {
    return {
      ...post,
      data: {
        ...post.data,
        is_video: true,
        url: await parseVideoUrl(url),
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
    // includes("https://www.redgifs.com/watch/", item.data.url),
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
