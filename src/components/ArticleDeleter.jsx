import React from 'react';
import styled from 'styled-components';

const ArticleDelete = styled.button`
  height: 2.7vh;
  position: absolute;
  right: 4vw;
  color: #e85a4f;
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
