import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Modal from "../../commonComponents/Modal";

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
  color: ${props => props.theme.primary};
  background-color: ${props => props.theme.backgroundPrimary};
`;

const Title = styled.h2`
  font-size: 0.8rem;
  font-weight: 400;
`;

const Video = styled.video`
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  height: 100%;
`;

const Image = styled.img`
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

function PostPopup(props) {
  const { onCancel, url, title, video } = props;

  return (
    <Modal onCancel={onCancel} padding={1}>
      <StyledPostPopup>
        <Header>
          <Title>{title}</Title>
        </Header>
        <div>
          {video ? <Video src={url} controls /> : <Image src={url} alt="" />}
        </div>
      </StyledPostPopup>
    </Modal>
  );
}

PostPopup.propTypes = {
  onCancel: PropTypes.func.isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
  video: PropTypes.bool
};

PostPopup.defaultProps = {
  url: "",
  title: "",
  video: false
};

export default PostPopup;
