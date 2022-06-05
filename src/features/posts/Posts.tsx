import { Box, Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { map } from "ramda";

import queries from "../../api/queries";

function Posts() {
  const query = useQuery(["subs"], queries.getSubs);
  const posts = query.data?.data.posts.parsed || [];
  return (
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(270px, 1fr))">
      {map(
        (item) => (
          <Box>{JSON.stringify(item.id)}</Box>
        ),
        posts
      )}
    </Grid>
  );
}

export default Posts;
