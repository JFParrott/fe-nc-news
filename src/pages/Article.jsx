import React from 'react';
import CommentPoster from '../components/CommentPoster';
import CommentsList from '../components/CommentsList';
import Loader from '../components/Loader';
import Voter from '../components/Voter';
import ErrorDisplayer from '../components/ErrorDisplayer';
import { getArticle } from '../utils/api';

class Article extends React.Component {
  state = {
    article: {},
    isLoading: true,
    error: false,
    commentAdded: false,
  };

  componentDidMount() {
    const { article_id } = this.props;
    getArticle(article_id)
      .then(({ data: { article } }) => {
        this.setState({ article, isLoading: false, commentAdded: false });
      })
      .catch(
        ({
          response: {
            data: { msg },
            status,
          },
        }) => {
          this.setState({ error: { msg, status } });
        }
      );
  }

  addComment = () => {
    this.setState((prevState) => {
      return { ...prevState, commentAdded: true };
    });
  };

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
      commentAdded,
      error,
    } = this.state;

    if (error) return <ErrorDisplayer msg={error.msg} status={error.status} />;
    return (
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2>{title}</h2>
            <p>
              Submitted by: {author} at {created_at} <br />
            </p>
            <p>{body}</p>
            <Voter article_id={article_id} votes={votes} />
            <CommentPoster
              article_id={article_id}
              addComment={this.addComment}
            />
            {commentAdded ? <p>Comment added!</p> : null}
            <CommentsList
              comment_count={comment_count}
              article_id={article_id}
              commentAdded={commentAdded}
            />
          </>
        )}
      </div>
    );
  }
}

export default Article;
