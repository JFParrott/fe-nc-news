import React from 'react';
import { delComment } from '../utils/api';
import styled from 'styled-components';

const DeleteButton = styled.button`
  position: absolute;
  right: 8px;
  margin: 8px;
  height: 2.8vh;
  border-radius: 3px;
  color: #e85a4f;
  background-color: #e8e1e4;
`;

const CommentDeleter = (props) => {
  const handleClick = () => {
    const { comment_id, deleteComment } = props;
    delComment(comment_id).then(() => {
      deleteComment(comment_id);
    });
  };

  return <DeleteButton onClick={handleClick}>Delete</DeleteButton>;
};

export default CommentDeleter;
