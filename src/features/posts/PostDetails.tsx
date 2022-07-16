import {
  Box,
  Grid,
  Image,
  Skeleton,
  Icon,
  Heading,
  Tag,
  Text,
  Divider,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FiDownload, FiMaximize } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import { and, map } from "ramda";
import { formatDistanceToNow } from "date-fns";
import { useLocalStorageValue } from "@react-hookz/web";

import { REDDIT_URL } from "../../constants";

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
  const details = query.data?.data || {
    url: "",
    author: "",
    comments: [],
    nsfw: false,
  };
  const filename = `${details.author}_${id}`;
  const [matureContent] = useLocalStorageValue("matureContent", false);
  const isBlurred = and(details.nsfw, !matureContent);

  if (query.isLoading) {
    return <Skeleton />;
  }

  const renderContent = () => {
    if (details.is_video) {
      return (
        <Box
          position="relative"
          role="group"
          overflow="hidden"
          backgroundColor="var(--chakra-colors-blackAlpha-50)"
          padding="2"
        >
          <Box
            src={details.url}
            as="video"
            height="full"
            width="full"
            objectFit="contain"
            controls={isBlurred ? false : true}
            filter={isBlurred ? "blur(1rem)" : "none"}
          />
          <Options url={details.url} filename={filename} />
        </Box>
      );
    }
    return (
      <Box
        position="relative"
        role="group"
        overflow="hidden"
        backgroundColor="var(--chakra-colors-blackAlpha-50)"
        padding="2"
      >
        <Image
          src={details.url}
          height="full"
          width="full"
          objectFit="contain"
          filter={isBlurred ? "blur(1rem)" : "none"}
        />
        <Options url={details.url} filename={filename} />
      </Box>
    );
  };

  return (
    <Grid
      gridTemplateColumns={["1fr", "1fr", "1fr 365px"]}
      height={["auto", "auto", "calc(100vh - 48px)"]}
    >
      {renderContent()}
      <Box padding="2" overflowY="auto" style={{ scrollbarWidth: "thin" }}>
        <Heading fontSize="2xl" mb="2">
          {details.title}
        </Heading>
        <Link href={`${REDDIT_URL}/user/${details.author}`} isExternal>
          <Tag>{details.author}</Tag>
        </Link>
        <Divider marginY="4" />
        <Box>
          <Text mb="2">{details.comments_count} comments</Text>
          <Stack>
            {map(
              (item) => (
                <Box key={item.id}>
                  <Tag>{item.author}</Tag>
                  <Text opacity="0.8">{item.body}</Text>
                  <Text opacity="0.6" fontSize="sm">
                    {formatDistanceToNow(item.created_at, { addSuffix: true })}{" "}
                    {new Intl.NumberFormat().format(item.upvotes_count)} ups
                  </Text>
                </Box>
              ),
              details.comments
            )}
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
}

export default PostDetails;
