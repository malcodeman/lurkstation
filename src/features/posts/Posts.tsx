import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { map } from "ramda";

import queries from "../../api/queries";
import Post from "./Post";

function Posts() {
  const query = useQuery(["subs"], queries.getSubs);
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
