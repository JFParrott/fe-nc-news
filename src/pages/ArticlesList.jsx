import React from 'react';
import { Link } from '@reach/router';
import ArticleContainer from '../components/ArticleContainer';
import Loader from '../components/Loader';
import { getArticles } from '../utils/api';
import Voter from '../components/Voter';
import ErrorDisplayer from '../components/ErrorDisplayer';
import Sorter from '../components/Sorter';
import styled from 'styled-components';

const ArticleCard = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  margin: 2px 8px 0 8px;
  &:hover {
    background-color: #d4d4d4;
  }
`;

const UserInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`;

const PostButton = styled.button`
  position: absolute;
  right: 0;
  margin: 5px 10px 5px 0;
  height: 2.7vh;
  font-size: 2vh;
`;

class ArticlesList extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    error: false,
    sort_by: undefined,
  };

  componentDidMount() {
    const { slug } = this.props;
    const { sort_by } = this.state;
    getArticles(slug, sort_by)
      .then(({ data: { articles } }) => {
        this.setState({ articles, isLoading: false });
      })
      .catch(
        ({
          response: {
            data: { msg },
            status,
          },
        }) => {
          this.setState({ error: { msg, status } });
        }
      );
  }

  componentDidUpdate(prevProps, prevState) {
    const { slug } = this.props;
    const { sort_by } = this.state;
    if (prevProps.slug !== slug || prevState.sort_by !== sort_by) {
      getArticles(slug, sort_by).then(({ data: { articles } }) => {
        this.setState({ articles, isLoading: false, error: false });
      });
    }
  }

  addSort = (value) => {
    this.setState({ sort_by: value });
  };

  render() {
    const { articles, isLoading, error } = this.state;
    if (error) return <ErrorDisplayer msg={error.msg} status={error.status} />;
    return (
      <div>
        <UserInputContainer>
          <Sorter addSort={this.addSort} />
          <Link to="/submit-article">
            <PostButton>Post article</PostButton>
          </Link>
        </UserInputContainer>
        {isLoading ? (
          <Loader />
        ) : (
          articles.map((article) => {
            const { article_id, votes } = article;
            return (
              <ArticleCard key={article_id}>
                <Voter article_id={article_id} votes={votes} />
                <ArticleContainer article={article} key={article_id} />
              </ArticleCard>
            );
          })
        )}
      </div>
    );
  }
}

export default ArticlesList;
