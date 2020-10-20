import React from 'react';
import { delComment } from '../utils/api';

const CommentDeleter = (props) => {
  const handleClick = () => {
    const { comment_id, deleteComment } = props;
    delComment(comment_id).then(() => {
      deleteComment();
    });
  };

  return (
    <button onClick={handleClick}>
      <span role="img" aria-label="Delete button">
        Delete comment
      </span>
    </button>
  );
};

export default CommentDeleter;
