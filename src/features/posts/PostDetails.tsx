import { Box, Grid, Image, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import queries from "../../api/queries";

function PostDetails() {
  const params = useParams<{ id: string }>();
  const id = params.id || "";
  const query = useQuery(["post", id], () => queries.getPost(id), {
    enabled: Boolean(id),
  });
  const details = query.data?.data || { url: "" };

  const renderContent = () => {
    if (query.isLoading) {
      return <Skeleton />;
    }
    if (details.is_video) {
      return (
        <Box
          src={details.url}
          as="video"
          height="full"
          width="full"
          objectFit="contain"
          controls
        />
      );
    }
    return (
      <Image src={details.url} height="full" width="full" objectFit="contain" />
    );
  };
  return (
    <Grid gridTemplateColumns="1fr auto" height="calc(100vh - 56px)">
      {renderContent()}
    </Grid>
  );
}

export default PostDetails;
