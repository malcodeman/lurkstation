import { RedditPost, RedditComment } from "@/types";
import { parse } from "path";
import {
  all,
  and,
  equals,
  filter,
  includes,
  isNil,
  isNotNil,
  map,
  not,
  replace,
  values,
} from "ramda";
import { SUPPORTED_FILE_EXTENSIONS } from "@/app/_lib/constants";

export const parsePost = (post: RedditPost) => {
  if (hasRedditVideo(post)) {
    return {
      ...post,
      data: {
        ...post.data,
        is_video: true,
        url: post.data.media?.reddit_video?.fallback_url ?? "",
      },
    };
  }

  if (hasVideoPreview(post)) {
    return {
      ...post,
      data: {
        ...post.data,
        is_video: true,
        url: post.data.preview?.reddit_video_preview?.fallback_url ?? "",
      },
    };
  }

  if (isGifv(post)) {
    return {
      ...post,
      data: {
        ...post.data,
        is_video: true,
        url: parseGifv(post.data.url),
      },
    };
  }

  if (hasImagePreview(post)) {
    return {
      ...post,
      data: {
        ...post.data,
        url: post.data.preview?.images?.[0].source.url ?? "",
      },
    };
  }

  return post;
};

export const parsePosts = (posts: RedditPost[]) => {
  const isValidFileExtension = (url: string) =>
    includes(getExtension(url), SUPPORTED_FILE_EXTENSIONS);
  const isValidGallery = (item: RedditPost) =>
    and(
      equals(item.data.is_gallery, true),
      all(
        (item) => equals(item.status, "valid"),
        values(item.data.media_metadata ?? {}),
      ),
    );
  const isImgurAndOver18 = (item: RedditPost) =>
    and(isImgur(item.data.url), item.data.over_18);
  const isRedgifsAndNoPreview = (item: RedditPost) =>
    and(isRedgifs(item.data.url), isNil(item.data.preview));

  return filter((item) => {
    return and(
      isValidFileExtension(item.data.url) ||
        isValidGallery(item) ||
        hasVideoPreview(item) ||
        hasImagePreview(item) ||
        hasRedditVideo(item),
      not(isImgurAndOver18(item)) && not(isRedgifsAndNoPreview(item)),
    );
  }, posts);
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

export const getGalleryImages = (
  media_metadata: RedditPost["data"]["media_metadata"],
) => {
  return map(
    (item) =>
      equals(item.e, "AnimatedImage") ? (item.s?.gif ?? "") : (item.s?.u ?? ""),
    values(media_metadata ?? {}),
  );
};

const getExtension = (path: string) => {
  return parse(path).ext;
};

const isRedgifs = (url: string) => {
  try {
    return includes("redgifs.com", new URL(url).hostname);
  } catch {
    return false;
  }
};

const isImgur = (url: string) => {
  try {
    return includes("imgur.com", new URL(url).hostname);
  } catch {
    return false;
  }
};

const isGifv = (item: RedditPost) => {
  return equals(getExtension(item.data.url), ".gifv");
};

const parseGifv = (url: string) => {
  return replace("gifv", "mp4", url);
};

const hasVideoPreview = (item: RedditPost) =>
  isNotNil(item.data.preview?.reddit_video_preview?.fallback_url);

const hasImagePreview = (item: RedditPost) =>
  isNotNil(item.data.preview?.images?.[0].source.url);

const hasRedditVideo = (item: RedditPost) =>
  isNotNil(item.data.media?.reddit_video?.fallback_url);
