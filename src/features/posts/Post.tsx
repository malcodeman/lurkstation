import { Box, Image } from "@chakra-ui/react";

type Props = {
  url: string;
  isVideo: boolean;
};

function Post(props: Props) {
  const { url, isVideo } = props;

  if (isVideo) {
    return (
      <Box
        src={url}
        as="video"
        height="full"
        width="full"
        objectFit="cover"
        controls
      />
    );
  }
  return <Image src={url} height="full" width="full" objectFit="cover" />;
}

export default Post;
