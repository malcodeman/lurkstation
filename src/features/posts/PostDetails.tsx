import { Box, Grid, Image, Skeleton, Icon } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FiDownload, FiMaximize } from "react-icons/fi";
import { useParams } from "react-router-dom";

import queries from "../../api/queries";

function Options(props: { url: string }) {
  const { url } = props;

  const handleOnMaximize = () => {
    window.open(url, "_blank")?.focus();
  };

  return (
    <Box
      display="none"
      _groupHover={{ display: "block" }}
      position="absolute"
      left="50%"
      bottom="6"
      transform="translateX(-50%)"
    >
      <Icon as={FiDownload} mr="2" />
      <Icon as={FiMaximize} cursor="pointer" onClick={handleOnMaximize} />
    </Box>
  );
}

function PostDetails() {
  const params = useParams<{ id: string }>();
  const id = params.id || "";
  const query = useQuery(["post", id], () => queries.getPost(id), {
    enabled: Boolean(id),
  });
  const details = query.data?.data || { url: "" };

  const renderContent = () => {
    if (query.isLoading) {
      return <Skeleton height="calc(100vh - 56px)" />;
    }
    if (details.is_video) {
      return (
        <Box position="relative" role="group" height="calc(100vh - 56px)">
          <Box
            src={details.url}
            as="video"
            height="full"
            width="full"
            objectFit="contain"
            controls
          />
          <Options url={details.url} />
        </Box>
      );
    }
    return (
      <Box position="relative" role="group" height="calc(100vh - 56px)">
        <Image
          src={details.url}
          height="full"
          width="full"
          objectFit="contain"
        />
        <Options url={details.url} />
      </Box>
    );
  };
  return <Grid gridTemplateColumns="1fr auto">{renderContent()}</Grid>;
}

export default PostDetails;
