import { Box, Image } from "@chakra-ui/react";

type Props = {
  url: string;
};

function Post(props: Props) {
  const { url } = props;
  return (
    <Box>
      <Image src={url} height="full" width="full" objectFit="cover" />
    </Box>
  );
}

export default Post;
