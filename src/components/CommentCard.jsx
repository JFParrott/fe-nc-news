import React from 'react';

const CommentCard = (props) => {
  const { author, body, created_at, votes } = props.comment;
  return (
    <div>
      <p>
        {author} <br /> Posted: {created_at} <br /> Votes: {votes}
      </p>
      <p>{body}</p>
    </div>
  );
};

export default CommentCard;
