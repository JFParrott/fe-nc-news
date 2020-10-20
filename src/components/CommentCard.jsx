import React from 'react';
import { formatTime } from '../utils/formatTime';

const CommentCard = (props) => {
  const { author, body, created_at } = props.comment;
  const formattedTime = formatTime(created_at);
  return (
    <div>
      <p>
        {author} <br /> Posted {formattedTime}
      </p>
      <p>{body}</p>
    </div>
  );
};

export default CommentCard;
