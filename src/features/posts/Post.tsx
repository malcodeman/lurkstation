import { Box, Image } from "@chakra-ui/react";

type Props = {
  url: string;
  isVideo: boolean;
  isBlurred: boolean;
};

function Post(props: Props) {
  const { url, isVideo, isBlurred } = props;

  if (isVideo) {
    return (
      <Box
        src={url}
        as="video"
        height="full"
        width="full"
        objectFit="cover"
        filter={isBlurred ? "blur(1rem)" : "none"}
        controls
      />
    );
  }
  return (
    <Image
      src={url}
      height="full"
      width="full"
      objectFit="cover"
      filter={isBlurred ? "blur(1rem)" : "none"}
    />
  );
}

export default Post;
