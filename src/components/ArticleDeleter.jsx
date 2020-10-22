import React from 'react';

const ArticleDeleter = (props) => {
  const { handleClick, article_id } = props;
  return (
    <button
      onClick={() => {
        handleClick(article_id);
      }}
    >
      Delete
    </button>
  );
};

export default ArticleDeleter;
