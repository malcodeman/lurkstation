"use client";
import { useEffect, useRef } from "react";
import { equals, map } from "ramda";
import { useIntersectionObserver } from "@react-hookz/web";
import Post from "@/app/_components/Post";
import { FiLoader } from "react-icons/fi";
import ServerError from "@/app/_components/ServerError";
import { usePosts } from "@/app/_hooks/usePosts";
import { getGalleryImages } from "@/app/_lib/utils";
import { AxiosError } from "axios";

type Props = {
  queryKey: string[];
};

export default function Posts(props: Props) {
  const { queryKey } = props;
  const { pages, hasNextPage, isFetching, isError, error, fetchNextPage } =
    usePosts({ queryKey });
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
        <ServerError
          reason={
            error instanceof AxiosError ? error.response?.data.reason : ""
          }
          isForbidden={
            error instanceof AxiosError
              ? equals(error.response?.status, 403)
              : false
          }
        />
      ) : (
        <main
          data-testid="posts-grid"
          className="grid auto-rows-auto grid-cols-[1fr_1fr] sm:mt-[49px] md:auto-rows-[280px] md:grid-cols-[repeat(auto-fit,minmax(270px,1fr))]"
        >
          {map(
            (item) =>
              map((item) => {
                const gallery = getGalleryImages(item.data.media_metadata);

                return (
                  <Post
                    key={item.data.id}
                    url={item.data.is_gallery ? gallery[0] : item.data.url}
                    isVideo={item.data.is_video}
                    href={item.data.permalink}
                    isGallery={item.data.is_gallery || false}
                    title={item.data.title}
                  />
                );
              }, item.children),
            pages,
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
