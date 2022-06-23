import { Box, Image } from "@chakra-ui/react";
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
      <Link to={link}>
        <Box
          src={url}
          as="video"
          height="full"
          width="full"
          objectFit="cover"
          filter={isBlurred ? "blur(1rem)" : "none"}
        />
      </Link>
    );
  }
  return (
    <Link to={link}>
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
