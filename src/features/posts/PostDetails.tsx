import {
  Box,
  Grid,
  Image,
  Skeleton,
  Icon,
  Heading,
  Tag,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FiDownload, FiMaximize } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";

import queries from "../../api/queries";

function Options(props: { url: string; filename: string }) {
  const { url, filename } = props;

  const handleOnDownload = () => {
    saveAs(url, filename);
  };

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
      <Icon
        as={FiDownload}
        cursor="pointer"
        mr="2"
        onClick={handleOnDownload}
      />
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
  const details = query.data?.data || { url: "", author: "" };
  const filename = `${details.author}_${id}`;
  const height = ["auto", "auto", "calc(100vh - 56px)"];

  if (query.isLoading) {
    return <Skeleton height="calc(100vh - 56px)" />;
  }

  const renderContent = () => {
    if (details.is_video) {
      return (
        <Box position="relative" role="group" height={height}>
          <Box
            src={details.url}
            as="video"
            height="full"
            width="full"
            objectFit="contain"
            controls
          />
          <Options url={details.url} filename={filename} />
        </Box>
      );
    }
    return (
      <Box position="relative" role="group" height={height}>
        <Image
          src={details.url}
          height="full"
          width="full"
          objectFit="contain"
        />
        <Options url={details.url} filename={filename} />
      </Box>
    );
  };
  return (
    <Grid gridTemplateColumns={["1fr", "1fr", "1fr 365px"]}>
      {renderContent()}
      <Box padding="2">
        <Heading fontSize="2xl" mb="2">
          {details.title}
        </Heading>
        <Tag>{details.author}</Tag>
      </Box>
    </Grid>
  );
}

export default PostDetails;
