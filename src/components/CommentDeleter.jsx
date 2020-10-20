import React from 'react';
import axios from 'axios';
import { delComment } from '../utils/api';

class CommentDeleter extends React.Component {
  state = {};

  handleClick = (e) => {
    const { comment_id, deleteComment } = this.props;
    delComment(comment_id).then(() => {
      deleteComment();
    });
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        <span role="img" aria-label="Delete button">
          Delete comment
        </span>
      </button>
    );
  }
}

export default CommentDeleter;
