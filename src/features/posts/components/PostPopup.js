import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Modal } from "@malcodeman/react-modal";

const MODAL_ROOT = document.getElementById("modal-root");

const StyledModal = styled(Modal)`
  padding: 1rem;
  z-index: 2;
`;

const StyledPostPopup = styled.div`
  max-width: 768px;
  margin: 0 auto;
  height: 100%;
  overflow-y: auto;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  min-height: 60px;
  position: sticky;
  top: 0;
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const Title = styled.h2`
  font-size: 0.8rem;
  font-weight: 400;
`;

const media = css`
  display: block;
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Video = styled.video`
  ${media};
  ${(props) => props.censure && props.theme.filter}
`;

const Image = styled.img`
  ${media};
  ${(props) => props.censure && props.theme.filter}
`;

function PostPopup(props) {
  const { onClose, url, title, video, censure, isOpen } = props;

  return (
    <StyledModal onClose={onClose} isOpen={isOpen} mountNode={MODAL_ROOT}>
      <StyledPostPopup>
        <Header>
          <Title>{title}</Title>
        </Header>
        <div>
          {video ? (
            <Video src={url} controls loop censure={censure} />
          ) : (
            <Image src={url} alt="" censure={censure} />
          )}
        </div>
      </StyledPostPopup>
    </StyledModal>
  );
}

PostPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
  video: PropTypes.bool,
  censure: PropTypes.bool,
  isOpen: PropTypes.bool,
};

PostPopup.defaultProps = {
  url: "",
  title: "",
  video: false,
  censure: false,
  isOpen: false,
};

export default PostPopup;
