import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import GetSubForm from "./GetSubForm";
import Post from "../components/Post";

const StyledPosts = styled.div`
  display: flex;
  flex-direction: column;
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
        <GetSubForm />
        <Grid>
          {posts &&
            posts.map(post => {
              return (
                <Post
                  key={post.id}
                  pic_url={post.pic_url}
                  post_url={post.post_url}
                  comments_count={post.comments_count}
                  likes_count={post.likes_count}
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
