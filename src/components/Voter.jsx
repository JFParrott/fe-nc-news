import React from 'react';
import { patchArticleVotes, patchCommentVotes } from '../utils/api';

class Voter extends React.Component {
  state = {
    vote: 0,
    hasVoted: false,
  };

  addVote = (e) => {
    const { comment_id, article_id } = this.props;
    const { value } = e.target;
    if (comment_id) {
      patchCommentVotes(comment_id, value).then(() => {
        this.setState({ vote: parseInt(value), hasVoted: true });
      });
    }
    if (article_id) {
      patchArticleVotes(article_id, value).then(() => {
        this.setState({ vote: parseInt(value), hasVoted: true });
      });
    }
  };

  render() {
    const { vote } = this.state;
    return (
      <div>
        <button onClick={this.addVote} value={1}>
          Replace this with up arrow emoji
        </button>
        <p>{this.props.votes + vote}</p>
        <button onClick={this.addVote} value={-1}>
          Replace this with down arrow emoji
        </button>
      </div>
    );
  }
}

export default Voter;
