import React from 'react';
import { Link } from '@reach/router';
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
  font-size: 4vh;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderText className="header">Northcoders News.. Now!</HeaderText>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
