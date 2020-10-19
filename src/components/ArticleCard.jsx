import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = (props) => {
  const {
    article: {
      article_id,
      title,
      votes,
      topic,
      comment_count,
      author,
      created_at,
    },
  } = props;
  //put votes to the side and add up/down vote capabilities
  return (
    <div>
      <p>
        <Link to={`/${topic}/${article_id}`}>{title}</Link> <br />
        Submitted by: {author} at {created_at}
        <br />
        <Link to={`/${topic}/${article_id}`}>{comment_count} comments </Link>
        <br />
        Votes: {votes} <br />
      </p>
      <p></p>
    </div>
  );
};

export default ArticleCard;
