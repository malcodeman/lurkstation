import React from "react";
import { compose } from "redux";
import { withFormik, Form } from "formik";
import { object, string } from "yup";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { getParam } from "../../../core/utils";
import {
  DEFAULT_SUBREDDIT,
  DEFAULT_LISTING_SORT
} from "../../../core/constants";
import Input from "../../commonComponents/Input";
import Button from "../../commonComponents/Button";

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
      <Button type="primary" icon="search" htmlType="submit" />
    </StyledForm>
  );
}

const formEnhancer = withFormik({
  displayName: "SearchForm",
  enableReinitialize: true,
  validationSchema: object().shape({
    subreddit: string().required()
  }),
  mapPropsToValues: props => ({
    subreddit: props.match.params.subreddit || DEFAULT_SUBREDDIT
  }),
  handleSubmit(payload, bag) {
    const { history, match } = bag.props;
    const { subreddit } = payload;
    const listing = match.params.listing || DEFAULT_LISTING_SORT;
    const time = getParam("time");

    if (time) {
      history.push(`/${subreddit}/${listing}?time=${time}`);
    } else {
      history.push(`/${subreddit}/${listing}?`);
    }
  }
})(SearchForm);

export default compose(withRouter)(formEnhancer);
