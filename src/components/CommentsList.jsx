import React from 'react';
import CommentCard from './CommentCard';
import Loader from './Loader';
import Voter from './Voter';
import { getArticleComments } from '../utils/api';
import styled from 'styled-components';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  align-items: center;
  margin: 2px 7px 0 7px;
`;

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
              <CommentContainer key={comment_id}>
                <Voter comment_id={comment_id} votes={votes} />
                <CommentCard
                  comment={comment}
                  deleteComment={this.deleteComment}
                />
              </CommentContainer>
            );
          })
        )}
      </div>
    );
  }
}

export default CommentsList;
