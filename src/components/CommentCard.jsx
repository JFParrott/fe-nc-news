import React from 'react';
import { formatTime } from '../utils/formatTime';
import styled from 'styled-components';
import CommentDeleter from './CommentDeleter';

const CommentInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const CommentHead = styled.p`
  margin: 5px 0 0 5px;
  font-size: 1.8vh;
`;

const CommentBody = styled.p`
  font-size: 2.2vh;
`;

const CommentCard = (props) => {
  const { author, body, created_at, comment_id } = props.comment;
  const formattedTime = formatTime(created_at);
  return (
    <div>
      <CommentInfo>
        <CommentHead>
          {author} <br /> Posted {formattedTime}
        </CommentHead>
        {author === 'jessjelly' ? (
          <CommentDeleter
            comment_id={comment_id}
            deleteComment={props.deleteComment}
          />
        ) : null}
      </CommentInfo>
      <CommentBody>{body}</CommentBody>
    </div>
  );
};

export default CommentCard;
