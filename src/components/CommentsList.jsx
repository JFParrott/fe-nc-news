import React from 'react';
import CommentCard from './CommentCard';
import Loader from './Loader';
import Voter from './Voter';
import { getArticleComments } from '../utils/api';
import styled from 'styled-components';
import Pagination from './Pagination';

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
    page: 1,
    total_count: 0,
    isLoading: true,
    commentDeleted: false,
  };

  componentDidMount() {
    const { article_id, comment_count } = this.props;
    const { page } = this.state;
    getArticleComments(article_id, page).then(({ data: { comments } }) => {
      this.setState({ comments, total_count: comment_count, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id, commentAdded } = this.props;
    const { commentDeleted, page } = this.state;
    if (
      prevProps.commentAdded !== commentAdded ||
      prevState.commentDeleted !== commentDeleted ||
      prevState.page !== page
    ) {
      getArticleComments(article_id, page).then(({ data: { comments } }) => {
        this.setState({ comments, isLoading: false });
      });
    }
  }

  deleteComment = (comment_id) => {
    this.setState((prevState) => {
      const filteredComments = prevState.comments.filter((comment) => {
        return comment.comment_id !== comment_id;
      });
      return { comments: filteredComments };
    });
  };

  changePage = (newPage) => {
    this.setState({ page: newPage });
  };

  render() {
    const { comments, isLoading, page, total_count } = this.state;
    const commentsPerPage = 10;
    const pageCount = Math.ceil(total_count / commentsPerPage);
    const atStart = page === 1;
    const atEnd = page === pageCount;
    const pages = Array.from({ length: pageCount }).map((item, i) => i + 1);
    return (
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          comments.map((comment) => {
            const { comment_id, votes } = comment;
            return (
              <CommentContainer id="comments" key={comment_id}>
                <Voter comment_id={comment_id} votes={votes} />
                <CommentCard
                  comment={comment}
                  deleteComment={this.deleteComment}
                />
              </CommentContainer>
            );
          })
        )}
        <Pagination
          page={page}
          atStart={atStart}
          atEnd={atEnd}
          pages={pages}
          changePage={this.changePage}
        />
      </div>
    );
  }
}

export default CommentsList;
