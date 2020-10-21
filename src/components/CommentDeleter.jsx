import React from 'react';
import { delComment } from '../utils/api';
import styled from 'styled-components';

const DeleteButton = styled.button`
  height: 2.8vh;
  height: 4vh;
`;

const CommentDeleter = (props) => {
  const handleClick = () => {
    const { comment_id, deleteComment } = props;
    delComment(comment_id).then(() => {
      deleteComment();
    });
  };

  return (
    <DeleteButton onClick={handleClick}>
      <span role="img" aria-label="Delete button">
        Delete comment
      </span>
    </DeleteButton>
  );
};

export default CommentDeleter;
