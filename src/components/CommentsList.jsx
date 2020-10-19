import React from 'react';
import axios from 'axios';
import CommentCard from './CommentCard';
import Loader from './Loader';

class CommentsList extends React.Component {
  state = {
    comments: [],
    isLoading: true,
  };

  componentDidMount() {
    const { article_id } = this.props;
    axios
      .get(
        `https://nc-news-jp.herokuapp.com/api/articles/${article_id}/comments`
      )
      .then(({ data: { comments } }) => {
        this.setState({ comments, isLoading: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id, commentAdded } = this.props;
    if (prevProps.commentAdded !== commentAdded) {
      axios
        .get(
          `https://nc-news-jp.herokuapp.com/api/articles/${article_id}/comments`
        )
        .then(({ data: { comments } }) => {
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
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })
        )}
      </div>
    );
  }
}

export default CommentsList;
