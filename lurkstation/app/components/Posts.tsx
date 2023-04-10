"use client";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { map } from "ramda";
import { useParams, useSearchParams } from "next/navigation";
import { useIntersectionObserver } from "@react-hookz/web";
import Post from "@/app/components/Post";
import { Sort } from "@/types";

import { DEFAULT_SORT, DEFAULT_SUBREDDIT } from "../lib/constants";

const getSubreddit = async (props: {
  pageParam?: {
    subreddit: string;
    sort: Sort;
    time: string | null;
    after: string | null;
  };
}) => {
  const { pageParam } = props;
  if (!pageParam) {
    return { children: [], after: null };
  }
  const resp = await fetch(
    `/api/${pageParam.subreddit}/${pageParam.sort}?after=${pageParam.after}&t=${pageParam.time}`
  );
  return resp.json();
};

export default function Posts() {
  const params = useParams();
  const subreddit = params.subreddit || DEFAULT_SUBREDDIT;
  const sort = params.sort || DEFAULT_SORT;
  const searchParams = useSearchParams();
  const time = searchParams.get("t");
  const { data, hasNextPage, isFetching, isError, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", subreddit, sort, time],
      queryFn: getSubreddit,
      getNextPageParam: ({ after }) => {
        return { subreddit, sort, time, after };
      },
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
  }, [intersection?.isIntersecting, hasNextPage, isFetching, isError]);

  return (
    <main className="mt-[46px] grid auto-rows-auto md:auto-rows-[280px] grid-cols-[1fr_1fr_1fr] md:grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
      {map(
        (item) =>
          map(
            (item) => (
              <Post
                key={item.data.id}
                url={item.data.url}
                isVideo={item.data.is_video}
                href={`${subreddit}/comments/${item.data.id}`}
              />
            ),
            item.children
          ),
        pages
      )}
      <div ref={elementRef} />
    </main>
  );
}
