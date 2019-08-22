import React from "react";
import styled from "styled-components";

import Header from "../../header/components/Header";
import Filters from "../../filters/components/Filters";
import Posts from "../../posts/components/Posts";

const Main = styled.main`
  padding-top: 54px;
  min-height: 100vh;
  background-color: ${props => props.theme.backgroundPrimary};
`;

function Home() {
  return (
    <>
      <Header />
      <Main>
        <Filters />
        <Posts />
      </Main>
    </>
  );
}

export default Home;
