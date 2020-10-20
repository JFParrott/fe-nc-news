import React from 'react';
import CommentCard from './CommentCard';
import Loader from './Loader';
import Voter from './Voter';
import { getArticleComments } from '../utils/api';

class CommentsList extends React.Component {
  state = {
    comments: [],
    isLoading: true,
  };

  componentDidMount() {
    const { article_id } = this.props;
    getArticleComments(article_id).then(({ data: { comments } }) => {
      this.setState({ comments, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id, commentAdded } = this.props;
    if (prevProps.commentAdded !== commentAdded) {
      getArticleComments(article_id).then(({ data: { comments } }) => {
        this.setState({ comments, isLoading: false });
      });
    }
  }

  render() {
    const { comments, isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          comments.map((comment) => {
            const { comment_id, votes } = comment;
            return (
              <div key={comment_id}>
                <CommentCard comment={comment} />
                <Voter comment_id={comment_id} votes={votes} />
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default CommentsList;
