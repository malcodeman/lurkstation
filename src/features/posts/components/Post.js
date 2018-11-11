import React from "react";
import styled from "styled-components";

const LinkWrapper = styled.a``;

const StyledPost = styled.div``;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
`;

const Video = styled.video`
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
`;

const Post = props => {
  const { picUrl, postUrl, videoUrl } = props;
  return (
    <StyledPost>
      <LinkWrapper href={postUrl} target={"_blank"}>
        {videoUrl ? <Video src={videoUrl} /> : <Image src={picUrl} />}
      </LinkWrapper>
    </StyledPost>
  );
};

export default Post;
