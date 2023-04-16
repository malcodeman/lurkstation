import { Post } from "@/types";
import { parse } from "path";
import { filter, includes, replace } from "ramda";

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

const parseVideoUrl = (url: string) => {
  switch (getExtension(url)) {
    case ".gifv":
      return parseGifv(url);
    default:
      return url;
  }
};

export const parsePost = (post: Post): Post => {
  const { url } = post.data;
  if (includes(getExtension(url), SUPPORTED_VIDEO_EXTENSIONS)) {
    return {
      ...post,
      data: {
        ...post.data,
        is_video: true,
        url: parseVideoUrl(url),
      },
    };
  }
  return post;
};

export const parsePosts = (posts: Post[]) => {
  return filter(
    (item) => includes(getExtension(item.data.url), SUPPORTED_FILE_EXTENSIONS),
    posts
  );
};
