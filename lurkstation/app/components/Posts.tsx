"use client";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { map } from "ramda";
import { useIntersectionObserver } from "@react-hookz/web";
import Post from "@/app/components/Post";
import { Sort } from "@/types";
import { FiLoader } from "react-icons/fi";

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
    `/api/${pageParam.subreddit}/${pageParam.sort}?t=${pageParam.time}&after=${pageParam.after}`
  );
  return resp.json();
};

const getUser = async (props: {
  pageParam?: {
    username: string;
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
    `/api/user/${pageParam.username}/submitted/?sort=${pageParam.sort}&t=${pageParam.time}&after=${pageParam.after}`
  );
  return resp.json();
};

type Props = {
  queryKey: string[];
  getNextPageParamReturn: {};
};

export default function Posts(props: Props) {
  const { queryKey, getNextPageParamReturn } = props;
  const isPosts = queryKey[0] === "posts";
  const {
    data,
    hasNextPage,
    isFetching,
    isError,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: isPosts ? getSubreddit : getUser,
    getNextPageParam: ({ after }) => {
      return { ...getNextPageParamReturn, after };
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
    <div>
      <main className="mt-[46px] grid auto-rows-auto md:auto-rows-[280px] grid-cols-[1fr_1fr_1fr] md:grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
        {map(
          (item) =>
            map(
              (item) => (
                <Post
                  key={item.data.id}
                  url={item.data.url}
                  isVideo={item.data.is_video}
                  href={item.data.permalink}
                />
              ),
              item.children
            ),
          pages
        )}
        <div ref={elementRef} />
      </main>
      {isFetchingNextPage ? (
        <div className="fixed left-[50%] bottom-10 translate-x-[-50%]">
          <FiLoader className="animate-spin" />
        </div>
      ) : null}
    </div>
  );
}
