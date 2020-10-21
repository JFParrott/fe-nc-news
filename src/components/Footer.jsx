import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>Powered by.. coffee</p>
    </FooterContainer>
  );
};

export default Footer;
