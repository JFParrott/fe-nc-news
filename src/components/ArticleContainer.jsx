import React from 'react';
import { Link } from '@reach/router';
import { formatTime } from '../utils/formatTime';
import styled from 'styled-components';

const ArticleSection = styled.div`
  margin: 5px 2vw 5px 0;
  @media screen and (max-width: 750px) {
    width: 60vw;
  }
`;

const AdditionalArticleInfo = styled.p`
  margin: 0;
  font-size: 13px;
`;

const ArticleContainer = (props) => {
  const {
    article: { article_id, title, comment_count, author, created_at },
  } = props;
  const formattedTime = formatTime(created_at);
  return (
    <ArticleSection>
      <Link to={`/articles/${article_id}`} className="link">
        {title}
      </Link>{' '}
      <br />
      <AdditionalArticleInfo>
        Submitted {formattedTime} by {author}
        <br />
        <Link to={`/articles/${article_id}`} className="link">
          {comment_count} comments{' '}
        </Link>
      </AdditionalArticleInfo>
    </ArticleSection>
  );
};

export default ArticleContainer;
