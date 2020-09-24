import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useRouteMatch, useHistory } from "react-router-dom";

import { getParam } from "../../../core/utils";
import {
  DEFAULT_SUBREDDIT,
  DEFAULT_LISTING_SORT,
} from "../../../core/constants";
import Input from "../../commonComponents/Input";
import Button from "../../commonComponents/Button";

const StyledForm = styled.form`
  display: flex;
  width: 100%;
`;

const validationSchema = Yup.object().shape({
  subreddit: Yup.string().required(),
});

function SearchForm() {
  const history = useHistory();
  const match = useRouteMatch();
  const initialValues = {
    subreddit: match.params.subreddit || DEFAULT_SUBREDDIT,
  };
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
    enableReinitialize: true,
  });

  function onSubmit() {
    const listing = match.params.listing || DEFAULT_LISTING_SORT;
    const time = getParam("time");

    if (time) {
      return history.push(
        `/${formik.values.subreddit}/${listing}?time=${time}`
      );
    }
    return history.push(`/${formik.values.subreddit}/${listing}`);
  }

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <Input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        onPressEnter={formik.handleSubmit}
        value={formik.values.subreddit}
        name="subreddit"
        placeholder="SEARCH"
      />
      <Button type="primary" icon="search" htmlType="submit" />
    </StyledForm>
  );
}

export default SearchForm;
