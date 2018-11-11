import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Post from "../components/Post";

const StyledPosts = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #454469;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 280px;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
`;

class Posts extends Component {
  render() {
    const { posts } = this.props;

    return (
      <StyledPosts>
        <Grid>
          {posts &&
            posts.map(post => {
              return (
                <Post
                  key={post.id}
                  url={post.url}
                  postUrl={post.post_url}
                  commentsCount={post.comments_count}
                  likesCount={post.likes_count}
                  videoUrl={post.video_url}
                  youtubeVideoUrl={post.youtube_video_url}
                />
              );
            })}
        </Grid>
      </StyledPosts>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts
  };
};

export default connect(
  mapStateToProps,
  null
)(Posts);
