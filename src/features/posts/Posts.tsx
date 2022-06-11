import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { map } from "ramda";
import { useParams, useSearchParams } from "react-router-dom";

import queries from "../../api/queries";
import Post from "./Post";

function Posts() {
  const params = useParams();
  const sub = params.sub || "art";
  const sort = params.sort || "hot";
  const [searchParams] = useSearchParams({ t: "day" });
  const time = searchParams.get("t") || "day";
  const query = useQuery(["subs", sub, sort, time], () =>
    queries.getSubs({ sub, sort, time })
  );
  const posts = query.data?.data.posts.parsed || [];
  return (
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(270px, 1fr))"
      gridAutoRows="280px"
    >
      {map(
        (item) => (
          <Post key={item.id} url={item.url} />
        ),
        posts
      )}
    </Grid>
  );
}

export default Posts;
