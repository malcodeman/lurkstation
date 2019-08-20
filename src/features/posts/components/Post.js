import React from "react";
import styled from "styled-components";

const LinkWrapper = styled.a``;

const StyledPost = styled.div``;

const Image = styled.img`
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
`;

const Video = styled.video`
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
`;

function Post(props) {
  const { url, postUrl } = props;

  function renderPostContent() {
    const extension = url.split(".").pop();

    if (extension === "mp4") {
      return <Video src={url} controls={true} />;
    }
    return <Image src={url} />;
  }

  return (
    <StyledPost>
      <LinkWrapper href={postUrl} target={"_blank"}>
        {renderPostContent()}
      </LinkWrapper>
    </StyledPost>
  );
}

export default Post;
