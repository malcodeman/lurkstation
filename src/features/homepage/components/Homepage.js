import React from "react";
import styled from "styled-components";

import Posts from "../../posts/containers/Posts";
import GetSubForm from "../../posts/containers/GetSubForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${props => props.theme.background};
  padding: 48px 12px;
  display: flex;
  justify-content: center;
`;

const Main = styled.main``;

const Homepage = () => {
  return (
    <Wrapper>
      <Header>
        <GetSubForm />
      </Header>
      <Posts />
    </Wrapper>
  );
};

export default Homepage;
