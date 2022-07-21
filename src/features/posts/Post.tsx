import { Box, Image, Icon } from "@chakra-ui/react";
import { FiVideo } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

type Props = {
  id: string;
  url: string;
  isVideo: boolean;
  isBlurred: boolean;
};

function Post(props: Props) {
  const { id, url, isVideo, isBlurred } = props;
  const params = useParams();
  const sub = params.sub || "art";
  const link = `/${sub}/comments/${id}`;

  if (isVideo) {
    return (
      <Link to={link} data-cy="post">
        <Box position="relative" height="full" width="full">
          <Box
            src={url}
            as="video"
            height="full"
            width="full"
            objectFit="cover"
            filter={isBlurred ? "blur(1rem)" : "none"}
          />
          <Icon as={FiVideo} position="absolute" right="1rem" bottom="1rem" />
        </Box>
      </Link>
    );
  }
  return (
    <Link to={link} data-cy="post">
      <Image
        src={url}
        height="full"
        width="full"
        objectFit="cover"
        filter={isBlurred ? "blur(1rem)" : "none"}
      />
    </Link>
  );
}

export default Post;
