import React from 'react';
import { Link } from '@reach/router';
import ArticleCard from '../components/ArticleCard';
import Loader from '../components/Loader';
import { getArticles } from '../utils/api';
import Voter from '../components/Voter';
import ErrorDisplayer from '../components/ErrorDisplayer';

class ArticlesList extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    error: false,
  };

  componentDidMount() {
    const { slug } = this.props;
    getArticles(slug)
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
    if (prevProps.slug !== slug) {
      getArticles(slug).then(({ data: { articles } }) => {
        this.setState({ articles, isLoading: false });
      });
    }
  }

  render() {
    const { articles, isLoading, error } = this.state;
    if (error) return <ErrorDisplayer msg={error.msg} status={error.status} />;
    return (
      <div>
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
