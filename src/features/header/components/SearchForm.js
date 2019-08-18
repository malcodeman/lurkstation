import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFormik, Form } from "formik";
import { object, string } from "yup";
import styled from "styled-components";

import { searchPosts } from "../../posts/actions/postsActions";
import Input from "../../commonComponents/Input";

const StyledForm = styled(Form)`
  display: flex;
  width: 100%;
`;

function SearchForm(props) {
  const { handleSubmit, handleChange, handleBlur, values } = props;

  return (
    <StyledForm>
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        onPressEnter={handleSubmit}
        value={values.subreddit}
        name="subreddit"
        placeholder="SEARCH"
      />
    </StyledForm>
  );
}

const mapStateToProps = state => {
  return {
    subreddit: state.posts.subreddit,
    sort: state.posts.sort,
    time: state.posts.time
  };
};

const withConnect = connect(
  mapStateToProps,
  { searchPosts }
);

const formEnhancer = withFormik({
  displayName: "SearchForm",
  validationSchema: object().shape({
    subreddit: string().required()
  }),
  mapPropsToValues: props => ({
    subreddit: props.subreddit || "",
    sort: props.sort || null,
    time: props.time || null
  }),
  handleSubmit(payload, bag) {
    const { searchPosts } = bag.props;
    const { subreddit, sort, time } = payload;
    const { setSubmitting } = bag;

    searchPosts(subreddit, sort, time, setSubmitting);
  }
})(SearchForm);

export default compose(withConnect)(formEnhancer);
