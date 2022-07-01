import React from "react";
import { AspectRatio, Box, Flex, Grid, Spinner } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { and, map } from "ramda";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useIntersectionObserver,
  useLocalStorageValue,
  useMediaQuery,
} from "@react-hookz/web";

import queries from "../../api/queries";
import Post from "./Post";

const initialData = {
  pages: [
    {
      config: {},
      data: { posts: { parsed: [] } },
      headers: {},
      statusText: "OK",
      status: 200,
    },
  ],
};

function Posts() {
  const params = useParams();
  const sub = params.sub || "art";
  const sort = params.sort || "hot";
  const [searchParams] = useSearchParams();
  const time = searchParams.get("t");
  const query = useInfiniteQuery(["posts", sub, sort, time], queries.getSubs, {
    initialData: {
      pages: initialData.pages,
      pageParams: [{ sub, sort, time }],
    },
    getNextPageParam: (lastPage) => {
      return { sub, sort, time, after: lastPage.data.after };
    },
  });
  const pages = query.data?.pages || [];
  const elementRef = React.useRef<HTMLDivElement>(null);
  const intersection = useIntersectionObserver(elementRef, {
    threshold: [0, 0.5],
  });
  const [dataSaver] = useLocalStorageValue("dataSaver", false);
  const [matureContent] = useLocalStorageValue("matureContent", false);
  const isLarge = useMediaQuery("(min-width: 810px)");

  React.useEffect(() => {
    if (
      intersection?.isIntersecting &&
      query.hasNextPage &&
      !query.isFetching
    ) {
      query.fetchNextPage();
    }
  }, [intersection?.isIntersecting, query]);

  return (
    <Box>
      <Grid
        gridTemplateColumns={
          isLarge ? "repeat(auto-fit, minmax(270px, 1fr))" : "1fr 1fr 1fr"
        }
        gridAutoRows={isLarge ? "280px" : "auto"}
      >
        {map(
          (item) =>
            map(
              (post) => {
                const props = {
                  id: post.id,
                  url: dataSaver ? post.thumbnail : post.url,
                  isVideo: post.is_video,
                  isBlurred: and(post.nsfw, !matureContent),
                };
                if (isLarge) {
                  return <Post key={post.id} {...props} />;
                }
                return (
                  <AspectRatio key={post.id}>
                    <Post {...props} />
                  </AspectRatio>
                );
              },

              item.data.posts.parsed
            ),
          pages
        )}
        <Box ref={elementRef} />
      </Grid>
      {query.isFetchingNextPage ? (
        <Flex
          position="fixed"
          left="50%"
          bottom="64px"
          transform="translateX(-50%)"
        >
          <Spinner size="lg" color="teal.500" />
        </Flex>
      ) : null}
    </Box>
  );
}

export default Posts;
