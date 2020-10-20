import React from 'react';
import { Link } from '@reach/router';
import { formatTime } from '../utils/formatTime';

const ArticleCard = (props) => {
  const {
    article: { article_id, title, comment_count, author, created_at },
  } = props;
  const formattedTime = formatTime(created_at);
  return (
    <div>
      <p>
        <Link to={`/articles/${article_id}`}>{title}</Link> <br />
        Submitted {formattedTime} by {author}
        <br />
        <Link to={`/articles/${article_id}`}>{comment_count} comments </Link>
        <br />
      </p>
      <p></p>
    </div>
  );
};

export default ArticleCard;
