import React from 'react';
import styled from 'styled-components';

const ArticleDelete = styled.button`
  height: 2.7vh;
  position: absolute;
  right: 4vw;
  border-radius: 3px;
  color: #e85a4f;
  background-color: #e8e1e4;
  border: 1px solid black;
  &:hover {
    background-color: #c2babd;
  }
  @media screen and (max-height: 650px) {
    height: 20px;
  }
`;

const ArticleDeleter = (props) => {
  const { handleClick, article_id } = props;
  return (
    <ArticleDelete
      onClick={() => {
        handleClick(article_id);
      }}
    >
      Delete
    </ArticleDelete>
  );
};

export default ArticleDeleter;
