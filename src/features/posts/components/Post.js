import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Heart from "../../commonAssets/icons/Heart";
import MessageCircle from "../../commonAssets/icons/MessageCircle";

const Overlay = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: ${props => props.theme.primary};
  background-color: ${props => props.theme.overlay};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
`;

const Count = styled.span`
  margin-left: ${props => props.ml && `${props.ml}rem`};
  margin-right: ${props => props.mr && `${props.mr}rem`};
`;

const StyledPost = styled.div`
  position: relative;
  cursor: pointer;
  &:hover ${Overlay} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

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
  const { url, nsfw, nsfwMode, upvotesCount, commentsCount } = props;

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
      {renderPostContent()}
      <Overlay>
        <Details>
          <Heart />
          <Count ml={0.5} mr={0.5}>
            {upvotesCount}
          </Count>
          <MessageCircle />
          <Count ml={0.5}>{commentsCount}</Count>
        </Details>
      </Overlay>
    </StyledPost>
  );
}

Post.propTypes = {
  url: PropTypes.string,
  nsfw: PropTypes.bool,
  nsfwMode: PropTypes.bool,
  upvotesCount: PropTypes.number,
  commentsCount: PropTypes.number
};

Post.defaultProps = {
  url: "",
  nsfw: false,
  nsfwMode: false,
  upvotesCount: 0,
  commentsCount: 0
};

export default Post;
