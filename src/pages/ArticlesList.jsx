import React from 'react';
import { Link } from '@reach/router';
import ArticleCard from '../components/ArticleCard';
import Loader from '../components/Loader';
import { getArticles } from '../utils/api';
import Voter from '../components/Voter';
import ErrorDisplayer from '../components/ErrorDisplayer';
import Sorter from '../components/Sorter';

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
        this.setState({ articles, isLoading: false });
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
        <Sorter addSort={this.addSort} />
        {isLoading ? (
          <Loader />
        ) : (
          articles.map((article) => {
            const { article_id, votes } = article;
            return (
              <div key={article_id}>
                <ArticleCard article={article} key={article_id} />
                <Voter article_id={article_id} votes={votes} />
              </div>
            );
          })
        )}
        <Link to="/submit-article">
          <button>Post your own article</button>
        </Link>
      </div>
    );
  }
}

export default ArticlesList;
