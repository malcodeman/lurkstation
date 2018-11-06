import React from "react";
import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
`;

const StyledLoader = styled.div`
  border: 2px solid ${props => props.theme.black};
  border-radius: 50%;
  border-top: 2px solid ${props => props.theme.white};
  width: 24px;
  height: 24px;
  animation: ${rotate360} 2s linear infinite;
  margin: 0 6px;
`;

const Message = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.white};
`;

const Loader = props => {
  return (
    <LoaderWrapper>
      <StyledLoader />
      {props.message && <Message>{props.message}</Message>}
    </LoaderWrapper>
  );
};

export default Loader;
