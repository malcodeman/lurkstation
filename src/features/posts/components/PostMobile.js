import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { format } from "date-fns";

import Text from "../../commonComponents/Text";

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.theme.backgroundPrimary};
`;

const Image = styled.img`
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
  ${props => props.censure && props.theme.filter}
`;

const Video = styled.video`
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
  ${props => props.censure && props.theme.filter}
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${props => props.theme.backgroundPrimary};
`;

function PostMobile(props) {
  const {
    url,
    thumbnail,
    title,
    upvotesCount,
    commentsCount,
    isVideo,
    createdAt,
    censure,
    showThumbnail,
    theme
  } = props;

  return (
    <article>
      <Header>
        <Text size={1}>{title}</Text>
      </Header>
      {isVideo ? (
        <Video src={url} censure={censure} controls loop />
      ) : (
        <Image src={showThumbnail ? thumbnail : url} censure={censure} />
      )}
      <Footer>
        <Text strong size={1}>
          {upvotesCount} upvotes
        </Text>
        <Text size={1} color={theme.secondary}>
          {commentsCount} comments
        </Text>
        <Text color={theme.secondary}>
          {format(createdAt, "MMMM dd, yyyy")}
        </Text>
      </Footer>
    </article>
  );
}

PostMobile.propTypes = {
  url: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  upvotesCount: PropTypes.number,
  commentsCount: PropTypes.number,
  isVideo: PropTypes.bool,
  createdAt: PropTypes.number,
  censure: PropTypes.bool,
  showThumbnail: PropTypes.bool
};

PostMobile.defaultProps = {
  url: "",
  thumbnail: "",
  title: "",
  upvotesCount: 0,
  commentsCount: 0,
  isVideo: false,
  createdAt: 0,
  censure: false,
  showThumbnail: false
};

export default PostMobile;
