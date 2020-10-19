import React from 'react';
import axios from 'axios';

class Voter extends React.Component {
  state = {
    votes: 0,
    hasVoted: false,
  };

  componentDidMount() {
    this.setState({ votes: this.props.votes });
  }

  addVote = (e) => {
    const { comment_id, article_id } = this.props;
    const { value } = e.target;
    if (comment_id) {
      axios
        .patch(`https://nc-news-jp.herokuapp.com/api/comments/${comment_id}`, {
          inc_votes: parseInt(value),
        })
        .then(
          ({
            data: {
              updatedComment: { votes },
            },
          }) => {
            this.setState({ votes, hasVoted: true });
          }
        );
    }
    if (article_id) {
      axios
        .patch(`https://nc-news-jp.herokuapp.com/api/articles/${article_id}`, {
          inc_votes: parseInt(value),
        })
        .then(
          ({
            data: {
              updatedArticle: { votes },
            },
          }) => {
            this.setState({ votes, hasVoted: true });
          }
        );
    }
  };

  render() {
    const { votes } = this.state;
    return (
      <div>
        <button onClick={this.addVote} value={1}>
          Replace this with up arrow emoji
        </button>
        <p>{votes}</p>
        <button onClick={this.addVote} value={-1}>
          Replace this with down arrow emoji
        </button>
      </div>
    );
  }
}

export default Voter;
