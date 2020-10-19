import React from 'react';
import { Link } from '@reach/router';
import ArticleCard from '../components/ArticleCard';
import Loader from '../components/Loader';
import { getArticles } from '../utils/api';
import Voter from '../components/Voter';

class ArticlesList extends React.Component {
  state = {
    articles: [],
    isLoading: true,
  };

  componentDidMount() {
    const { slug } = this.props;
    getArticles(slug).then(({ data: { articles } }) => {
      this.setState({ articles, isLoading: false });
    });
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
    const { articles, isLoading } = this.state;
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
