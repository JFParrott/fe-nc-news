import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #eae7d7;
`;

const HeaderText = styled.h1`
  color: #e85a4f;
  margin: 0 3vw 0 3vw;
  font-size: 4vh;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <HeaderText>Northcoders News.. Now!</HeaderText>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
