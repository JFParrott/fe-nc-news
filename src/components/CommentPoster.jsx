import React from 'react';
import { postComment } from '../utils/api';

class CommentPoster extends React.Component {
  state = {
    body: '',
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ body: value });
  };

  handleSubmit = (e) => {
    const { article_id, addComment } = this.props;
    const { body } = this.state;
    e.preventDefault();
    postComment(article_id, body).then(() => {
      addComment();
    });
  };

  render() {
    const { body } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              onChange={this.handleChange}
              value={body}
              required
            ></input>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CommentPoster;
