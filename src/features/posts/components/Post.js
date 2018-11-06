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

const Post = props => {
  const { pic_url, post_url } = props;
  return (
    <StyledPost>
      <LinkWrapper href={post_url} target={"_blank"}>
        <Image src={pic_url} />
      </LinkWrapper>
    </StyledPost>
  );
};

export default Post;
