import React from 'react';
import CommentCard from './CommentCard';
import Loader from './Loader';
import Voter from './Voter';
import { getArticleComments } from '../utils/api';
import CommentDeleter from './CommentDeleter';

class CommentsList extends React.Component {
  state = {
    comments: [],
    isLoading: true,
    commentDeleted: false,
  };

  componentDidMount() {
    const { article_id } = this.props;
    getArticleComments(article_id).then(({ data: { comments } }) => {
      this.setState({ comments, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id, commentAdded } = this.props;
    const { commentDeleted } = this.state;
    if (
      prevProps.commentAdded !== commentAdded ||
      prevState.commentDeleted !== commentDeleted
    ) {
      getArticleComments(article_id).then(({ data: { comments } }) => {
        this.setState({ comments, isLoading: false });
      });
    }
  }

  deleteComment = () => {
    this.setState({ commentDeleted: true });
  };

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
                {comment.author === 'jessjelly' ? (
                  <CommentDeleter
                    comment_id={comment_id}
                    deleteComment={this.deleteComment}
                  />
                ) : null}
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default CommentsList;
