import React from 'react';
import axios from 'axios';
import CommentPoster from '../components/CommentPoster';
import CommentsList from '../components/CommentsList';
import Loader from '../components/Loader';

class Article extends React.Component {
  state = {
    article: {},
    isLoading: true,
    commentAdded: false,
  };

  componentDidMount() {
    const { article_id } = this.props;
    axios
      .get(`https://nc-news-jp.herokuapp.com/api/articles/${article_id}`)
      .then(({ data: { article } }) => {
        this.setState({ article, isLoading: false, commentAdded: false });
      });
  }

  render() {
    const {
      article: {
        article_id,
        author,
        body,
        comment_count,
        created_at,
        title,
        votes,
      },
      isLoading,
    } = this.state;

    return (
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2>{title}</h2>
            <p>
              Submitted by: {author} at {created_at} <br />
              Votes: {votes}
            </p>
            <p>{body}</p>
            <CommentPoster article_id={article_id} />
            <CommentsList
              comment_count={comment_count}
              article_id={article_id}
            />
          </>
        )}
      </div>
    );
  }
}

export default Article;
