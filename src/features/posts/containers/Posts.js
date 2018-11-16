import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Observer from "@researchgate/react-intersection-observer";

import Post from "../components/Post";
import Loader from "../../loader/components/Loader";
import { getPosts } from "../actions/postsActions";

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
  componentDidMount() {
    const { getPosts } = this.props;

    getPosts("popular", null);
  }
  handleChange = ({ isIntersecting }) => {
    const { getPosts, after } = this.props;

    if (isIntersecting) {
      getPosts("popular", after);
    }
  };

  render() {
    const { posts, fetching } = this.props;

    return (
      <StyledPosts>
        <Grid>
          {posts.length > 0 &&
            posts.map((post, index) => {
              return (
                <Post
                  key={post.id}
                  url={post.url}
                  postUrl={post.post_url}
                  commentsCount={post.comments_count}
                  likesCount={post.likes_count}
                  videoUrl={post.video_url}
                  youtubeVideoUrl={post.youtube_video_url}
                  textPost={post.text_post}
                />
              );
            })}
        </Grid>
        {fetching ? <Loader message={"Fetching posts"} /> : null}
        {posts.length > 0 ? (
          <Observer onChange={this.handleChange}>
            <div />
          </Observer>
        ) : null}
      </StyledPosts>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    after: state.posts.after,
    fetching: state.posts.fetching
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
