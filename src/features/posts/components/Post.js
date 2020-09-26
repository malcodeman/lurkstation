import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import HeartIcon from "../../commonAssets/icons/Heart";
import MessageCircleIcon from "../../commonAssets/icons/MessageCircle";
import VideoIcon from "../../commonAssets/icons/Video";
import PostPopup from "./PostPopup";

const Overlay = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.overlay};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
`;

const Count = styled.span`
  margin-left: ${(props) => props.ml && `${props.ml}rem`};
  margin-right: ${(props) => props.mr && `${props.mr}rem`};
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
  color: ${(props) => props.theme.primary};
`;

const Image = styled.img`
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
  ${(props) => props.censure && props.theme.filter}
`;

const Video = styled.video`
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
  ${(props) => props.censure && props.theme.filter}
`;

function Post(props) {
  const {
    id,
    url,
    thumbnail,
    censure,
    upvotesCount,
    commentsCount,
    subreddit,
    listing,
    time,
    title,
    showThumbnail,
    isVideo,
  } = props;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <StyledPost
        to={
          time
            ? `/${subreddit}/${listing}/${id}?time=${time}`
            : `/${subreddit}/${listing}/${id}`
        }
        onClick={() => setVisible(true)}
      >
        {isVideo ? (
          <Video src={url} censure={censure} />
        ) : (
          <Image src={showThumbnail ? thumbnail : url} censure={censure} />
        )}
        {isVideo && (
          <VideoIcon
            style={{ position: "absolute", top: "1rem", right: "1rem" }}
          />
        )}
        <Overlay>
          <Details>
            <HeartIcon />
            <Count ml={0.5} mr={0.5}>
              {upvotesCount}
            </Count>
            <MessageCircleIcon />
            <Count ml={0.5}>{commentsCount}</Count>
          </Details>
        </Overlay>
      </StyledPost>
      <PostPopup
        onClose={() => setVisible(false)}
        url={url}
        title={title}
        video={isVideo}
        censure={censure}
        isOpen={visible}
      />
    </>
  );
}

Post.propTypes = {
  url: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  censure: PropTypes.bool,
  upvotesCount: PropTypes.number,
  commentsCount: PropTypes.number,
  isVideo: PropTypes.bool,
};

Post.defaultProps = {
  url: "",
  thumbnail: "",
  title: "",
  censure: false,
  upvotesCount: 0,
  commentsCount: 0,
  isVideo: false,
};

export default Post;
