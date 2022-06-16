import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { map } from "ramda";
import { useParams, useSearchParams } from "react-router-dom";
import { useIntersectionObserver } from "@react-hookz/web";

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
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(270px, 1fr))"
      gridAutoRows="280px"
    >
      {map(
        (item) =>
          map(
            (post) => (
              <Post key={post.id} url={post.url} isVideo={post.is_video} />
            ),
            item.data.posts.parsed
          ),
        pages
      )}
      <Box ref={elementRef} />
    </Grid>
  );
}

export default Posts;
