"use client";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { map, toString, equals, values } from "ramda";
import { useIntersectionObserver } from "@react-hookz/web";
import Post from "@/app/components/Post";
import { RedditPost, Sort } from "@/types";
import { FiLoader } from "react-icons/fi";
import ServerError from "@/app/components/ServerError";

type SubredditPageParam = {
  subreddit: string;
  sort: Sort;
  time: string | null;
  after: string | null;
};

const getSubreddit = async (props: { pageParam: SubredditPageParam }) => {
  const { pageParam } = props;
  const url = `/api/${pageParam.subreddit}/${pageParam.sort}`;
  const searchParams = new URLSearchParams();

  if (pageParam.time) {
    searchParams.append("t", pageParam.time);
  }

  if (pageParam.after) {
    searchParams.append("after", pageParam.after);
  }

  if (equals(toString(searchParams), "")) {
    const response = await fetch(url);
    return response.json();
  }

  const response = await fetch(`${url}?${searchParams}`);
  return response.json();
};

type UserPageParam = {
  username: string;
  sort: Sort;
  time: string | null;
  after: string | null;
};

const getUser = async (props: { pageParam: UserPageParam }) => {
  const { pageParam } = props;
  const url = `/api/user/${pageParam.username}/submitted`;
  const searchParams = new URLSearchParams();

  if (pageParam.sort) {
    searchParams.append("sort", pageParam.sort);
  }

  if (pageParam.time) {
    searchParams.append("t", pageParam.time);
  }

  if (pageParam.after) {
    searchParams.append("after", pageParam.after);
  }

  if (equals(toString(searchParams), "")) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }

  const response = await fetch(`${url}?${searchParams}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

type Props = {
  queryKey: string[];
};

type PageParam = SubredditPageParam | UserPageParam | undefined;

type Data =
  | {
      pages: {
        after: string | null;
        before: string | null;
        children: RedditPost[];
        dist: number;
        geo_filter: null;
        modhash: string;
      }[];
      pageParam: PageParam;
    }
  | undefined;

export default function Posts(props: Props) {
  const { queryKey } = props;
  const isPosts = equals(queryKey[0], "posts");
  const { data, hasNextPage, isFetching, isError, error, fetchNextPage } =
    useInfiniteQuery<any, Error, Data, string[], PageParam>({
      queryKey,
      queryFn: ({ pageParam }) =>
        isPosts
          ? getSubreddit({
              pageParam: {
                subreddit: queryKey[1],
                sort: queryKey[2] as Sort,
                time: queryKey[3],
                after: pageParam?.after || null,
              },
            })
          : getUser({
              pageParam: {
                username: queryKey[1],
                sort: queryKey[2] as Sort,
                time: queryKey[3],
                after: pageParam?.after || null,
              },
            }),
      getNextPageParam: (lastPage) => {
        if (!lastPage.after) {
          return undefined;
        }
        return { ...lastPage };
      },
      initialPageParam: undefined,
    });
  const pages = data?.pages || [];
  const elementRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersectionObserver(elementRef, {
    threshold: [0, 0.5],
  });

  useEffect(() => {
    if (
      intersection?.isIntersecting &&
      hasNextPage &&
      !isFetching &&
      !isError
    ) {
      fetchNextPage();
    }
  }, [
    intersection?.isIntersecting,
    hasNextPage,
    isFetching,
    isError,
    error,
    fetchNextPage,
  ]);

  return (
    <div>
      {isError ? (
        <>
          {JSON.stringify(error)}
          <ServerError
            statusCode={error instanceof Error ? error.message : "Internal"}
          />
        </>
      ) : (
        <main
          data-testid="posts-grid"
          className="grid auto-rows-auto grid-cols-[1fr_1fr_1fr] sm:mt-[49px] md:auto-rows-[280px] md:grid-cols-[repeat(auto-fit,minmax(270px,1fr))]"
        >
          {map(
            (item) =>
              map((item) => {
                const gallery = map(
                  (item) => item.s.u,
                  values(item.data.media_metadata || {})
                );

                return (
                  <Post
                    key={item.data.id}
                    url={item.data.is_gallery ? gallery[0] : item.data.url}
                    isVideo={item.data.is_video}
                    href={item.data.permalink}
                    isGallery={item.data.is_gallery || false}
                  />
                );
              }, item.children),
            pages
          )}
          <div ref={elementRef} />
        </main>
      )}
      {isFetching ? (
        <div className="fixed bottom-20 left-[50%] translate-x-[-50%] sm:bottom-10">
          <FiLoader className="animate-spin" />
        </div>
      ) : null}
    </div>
  );
}
