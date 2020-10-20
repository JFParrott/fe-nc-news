import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #fad970;
  border: 1px solid black;
`;

const HeaderText = styled.h1`
  color: #76a4ab;
  margin: 0 3vw 0 3vw;
  font-size: 5vh;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderText className="header">Northcoders News.. Now!</HeaderText>
    </HeaderContainer>
  );
};

export default Header;
