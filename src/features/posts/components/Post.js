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

const YoutubeVideo = styled.iframe`
  max-width: 100%;
  height: 100%;
  width: 100%;
`;

const TextPost = styled.span`
  color: #fff;
`;

const Post = props => {
  const {
    url,
    postUrl,
    videoUrl,
    youtubeVideoUrl,
    textPost,
    imgurAlbum
  } = props;
  function renderPostContent() {
    if (videoUrl) {
      return <Video src={videoUrl} />;
    } else if (youtubeVideoUrl) {
      return (
        <YoutubeVideo
          src={youtubeVideoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      );
    } else if (textPost) {
      return <TextPost>Go to post</TextPost>;
    } else if (imgurAlbum) {
      return <Image src={imgurAlbum[0]} />;
    } else {
      return <Image src={url} />;
    }
  }
  return (
    <StyledPost>
      <LinkWrapper href={postUrl} target={"_blank"}>
        {renderPostContent()}
      </LinkWrapper>
    </StyledPost>
  );
};

export default Post;
