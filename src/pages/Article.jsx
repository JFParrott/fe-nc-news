import React from 'react';
import CommentPoster from '../components/CommentPoster';
import CommentsList from '../components/CommentsList';
import Loader from '../components/Loader';
import Voter from '../components/Voter';
import ErrorDisplayer from '../components/ErrorDisplayer';
import { getArticle } from '../utils/api';
import { formatTime } from '../utils/formatTime';
import styled from 'styled-components';

const ArticleHead = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0 0 5px;
`;

const ArticleHeader = styled.h2`
  margin: 0 0 0 7px;
  font-size: 3vh;
`;

const ArticleInfo = styled.p`
  margin: 0 0 0 7px;
  font-size: 2vh;
`;

const ArticleBody = styled.p`
  margin: 15px;
  padding: 5px;
  font-size: 2.2vh;
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
  line-height: 2.8vh;
`;

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

    const formattedTime = formatTime(created_at);

    if (error) return <ErrorDisplayer msg={error.msg} status={error.status} />;
    return (
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ArticleHead>
              <Voter article_id={article_id} votes={votes} />
              <div>
                <ArticleHeader>{title}</ArticleHeader>
                <ArticleInfo>
                  Submitted by {author} {formattedTime} <br />
                  {comment_count} comments
                </ArticleInfo>
              </div>
            </ArticleHead>
            <ArticleBody>{body}</ArticleBody>
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
