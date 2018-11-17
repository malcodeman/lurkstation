import React from "react";
import styled from "styled-components";

import Posts from "../../posts/containers/Posts";
import GetSubForm from "../../posts/containers/GetSubForm";
import PopularSubs from "../../posts/containers/PopularSubs";
import Filters from "../../posts/containers/Filters";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${props => props.theme.background};
  padding: 48px 12px;
  display: flex;
  flex-direction: column;
`;

const Homepage = () => {
  return (
    <Wrapper>
      <Header>
        <GetSubForm />
        <PopularSubs />
        <Filters />
      </Header>
      <Posts />
    </Wrapper>
  );
};

export default Homepage;
