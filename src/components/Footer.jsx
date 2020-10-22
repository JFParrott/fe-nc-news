import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  background-color: #e98074;
  max-height: 9vh;
  margin-top: 5px;
  color: #eae7dc;
  min-height: 50px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>Powered by.. coffee</p>
    </FooterContainer>
  );
};

export default Footer;
