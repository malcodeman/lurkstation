import React from "react";
import styled, { css } from "styled-components";

const LinkWrapper = styled.a``;

const StyledPost = styled.div``;

const filter = css`
  filter: blur(1rem);
`;

const Image = styled.img`
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
  ${props => props.censure && filter}
`;

const Video = styled.video`
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
  ${props => props.censure && filter}
`;

function Post(props) {
  const { url, postUrl, nsfw, nsfwMode } = props;
  const censure = nsfw && !nsfwMode;

  function renderPostContent() {
    const extension = url.split(".").pop();

    if (extension === "mp4") {
      return <Video src={url} controls censure={censure} />;
    }
    return <Image src={url} censure={censure} />;
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
