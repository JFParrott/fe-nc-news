import React from 'react';
import { Link } from '@reach/router';
import ArticleContainer from '../components/ArticleContainer';
import Loader from '../components/Loader';
import { getArticles, deleteArticle } from '../utils/api';
import Voter from '../components/Voter';
import ErrorDisplayer from '../components/ErrorDisplayer';
import Sorter from '../components/Sorter';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import ArticleDeleter from '../components/ArticleDeleter';

const ArticleCard = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  margin: 2px 4vw 0 4vw;
  border-radius: 3px;
  &:hover {
    background-color: #bab2b5;
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
  margin: 5px 4vw 5px 0;
  height: 2.7vh;
  font-size: 2vh;
`;

class ArticlesList extends React.Component {
  state = {
    articles: [],
    total_count: 0,
    page: 1,
    isLoading: true,
    error: false,
    sort_by: undefined,
    order: undefined,
  };

  componentDidMount() {
    const { slug } = this.props;
    const { sort_by, order, page } = this.state;
    getArticles(slug, sort_by, order, page)
      .then(({ data: { articles, total_count } }) => {
        this.setState({ articles, total_count, isLoading: false });
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
    const { sort_by, order, page } = this.state;
    if (
      prevProps.slug !== slug ||
      prevState.sort_by !== sort_by ||
      prevState.order !== order ||
      prevState.page !== page
    ) {
      getArticles(slug, sort_by, order, page).then(
        ({ data: { articles, total_count } }) => {
          this.setState({
            articles,
            total_count,
            isLoading: false,
            error: false,
          });
        }
      );
    }
  }

  addSort = (sort_by) => {
    this.setState({ sort_by });
  };

  addSortOrder = (order) => {
    this.setState({ order });
  };

  changePage = (newPage) => {
    this.setState({ page: newPage });
  };

  handleClick = (article_id) => {
    deleteArticle(article_id).then(() => {
      this.setState((prevState) => {
        const filteredArticles = prevState.articles.filter((article) => {
          return article.article_id !== article_id;
        });
        return { articles: filteredArticles };
      });
    });
  };

  render() {
    const { articles, total_count, isLoading, error, page } = this.state;
    const articlesPerPage = 10;
    const pageCount = Math.ceil(total_count / articlesPerPage);
    const atStart = page === 1;
    const atEnd = page === pageCount;
    const pages = Array.from({ length: pageCount }).map((item, i) => i + 1);

    if (error) return <ErrorDisplayer msg={error.msg} status={error.status} />;
    return (
      <div>
        <UserInputContainer>
          <Sorter addSort={this.addSort} addSortOrder={this.addSortOrder} />
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
                {article.author === 'jessjelly' ? (
                  <ArticleDeleter
                    handleClick={this.handleClick}
                    article_id={article_id}
                  />
                ) : null}
              </ArticleCard>
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

export default ArticlesList;
