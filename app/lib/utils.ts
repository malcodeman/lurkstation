import { Post } from "@/types";
import { parse } from "path";
import { replace } from "ramda";

export const getExtension = (path: string) => {
  return parse(path).ext;
};

export const parseGifv = (url: string) => {
  return replace("gifv", "mp4", url);
};

export const parsePost = (post: Post): Post => {
  const { url } = post.data;
  if (getExtension(url) === ".gifv") {
    return {
      ...post,
      data: {
        ...post.data,
        is_video: true,
        url: parseGifv(url),
      },
    };
  }
  return post;
};
