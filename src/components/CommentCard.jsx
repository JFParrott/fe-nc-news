import React from 'react';
import { formatTime } from '../utils/formatTime';
import styled from 'styled-components';
import CommentDeleter from './CommentDeleter';

const AllComment = styled.div`
  width: 85vw;
`;

const CommentCard = (props) => {
  const { author, body, created_at, comment_id } = props.comment;
  const formattedTime = formatTime(created_at);
  return (
    <AllComment>
      <p>
        {author} <br /> Posted {formattedTime}
      </p>
      {author === 'jessjelly' ? (
        <CommentDeleter
          comment_id={comment_id}
          deleteComment={props.deleteComment}
        />
      ) : null}
      <p>{body}</p>
    </AllComment>
  );
};

export default CommentCard;
