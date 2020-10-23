import React from 'react';
import { patchArticleVotes, patchCommentVotes } from '../utils/api';
import styled from 'styled-components';

const VoteButton = styled.button`
  background: none;
  border: none;
`;

const VoteCount = styled.p`
  margin: 0;
  font-size: 12px;
`;

const VoterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2vw 0 2vw;
  @media screen and (max-width: 450px) {
    margin: 0 3px 0 3px;
  }
`;

const UpVoteButton = styled.span`
  font-size: 20px;
  border: none;
  &:hover {
    color: #1aeb1a;
  }
`;

const DownVoteButton = styled.span`
  font-size: 20px;
  &:hover {
    color: red;
  }
`;

class Voter extends React.Component {
  state = {
    vote: 0,
    hasVoted: false,
  };

  addVote = (value) => {
    const { comment_id, article_id } = this.props;
    if (comment_id) {
      this.setState({ vote: parseInt(value), hasVoted: true });
      patchCommentVotes(comment_id, value).catch(() => {
        this.setState({ vote: 0, hasVoted: false });
      });
    }
    if (article_id) {
      this.setState({ vote: parseInt(value), hasVoted: true });
      patchArticleVotes(article_id, value).catch(() => {
        this.setState({ vote: 0, hasVoted: false });
      });
    }
  };

  changeVote = (value, by) => {
    const { comment_id, article_id } = this.props;
    if (comment_id) {
      this.setState({ vote: parseInt(value) + parseInt(by), hasVoted: true });
      patchCommentVotes(comment_id, value).catch(() => {
        this.setState({ vote: 0, hasVoted: false });
      });
    }
    if (article_id) {
      this.setState({ vote: parseInt(value) + parseInt(by), hasVoted: true });
      patchArticleVotes(article_id, value).catch(() => {
        this.setState({ vote: 0, hasVoted: false });
      });
    }
  };

  render() {
    const { vote, hasVoted } = this.state;
    return (
      <VoterContainer>
        <VoteButton
          onClick={() => {
            if (vote === -1) {
              this.changeVote(2, -1);
            }
            if (!hasVoted) {
              this.addVote(1);
            }
          }}
        >
          <UpVoteButton className={vote === 1 ? 'green' : null}>
            &#8679;
          </UpVoteButton>
        </VoteButton>
        <VoteCount>{this.props.votes + vote}</VoteCount>
        <VoteButton
          onClick={() => {
            if (vote === 1) {
              this.changeVote(-2, 1);
            }
            if (!hasVoted) {
              this.addVote(-1);
            }
          }}
        >
          <DownVoteButton className={vote === -1 ? 'red' : null}>
            &#8681;
          </DownVoteButton>
        </VoteButton>
      </VoterContainer>
    );
  }
}

export default Voter;
