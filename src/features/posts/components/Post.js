import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Heart from "../../commonAssets/icons/Heart";
import MessageCircle from "../../commonAssets/icons/MessageCircle";
import PostPopup from "./PostPopup";

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

const StyledPost = styled(Link)`
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
  const {
    id,
    url,
    nsfw,
    nsfwMode,
    upvotesCount,
    commentsCount,
    subreddit,
    listing,
    title
  } = props;
  const censure = nsfw && !nsfwMode;
  const extension = url.split(".").pop();
  const video = extension === "mp4" ? true : false;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <StyledPost
        to={`/${subreddit}/${listing}/${id}`}
        onClick={() => setVisible(true)}
      >
        {video ? (
          <Video src={url} censure={censure} />
        ) : (
          <Image src={url} censure={censure} />
        )}
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
      {visible && (
        <PostPopup
          onCancel={() => setVisible(false)}
          url={url}
          title={title}
          video={video}
        />
      )}
    </>
  );
}

Post.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  nsfw: PropTypes.bool,
  nsfwMode: PropTypes.bool,
  upvotesCount: PropTypes.number,
  commentsCount: PropTypes.number
};

Post.defaultProps = {
  url: "",
  title: "",
  nsfw: false,
  nsfwMode: false,
  upvotesCount: 0,
  commentsCount: 0
};

export default Post;
