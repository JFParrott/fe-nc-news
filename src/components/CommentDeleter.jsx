import React from 'react';
import { delComment } from '../utils/api';
import styled from 'styled-components';

const DeleteButton = styled.button`
  position: absolute;
  right: 8px;
  margin: 8px;
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
        Delete
      </span>
    </DeleteButton>
  );
};

export default CommentDeleter;
