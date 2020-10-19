import React from 'react';
import { Link } from '@reach/router';
import axios from 'axios';

class Topics extends React.Component {
  state = {
    topics: [],
  };

  componentDidMount() {
    axios
      .get('https://nc-news-jp.herokuapp.com/api/topics')
      .then(({ data: { topics } }) => {
        this.setState({ topics });
      });
  }

  render() {
    const { topics } = this.state;
    return (
      <div>
        {topics.map(({ slug, description }) => {
          return (
            <Link to={`/${slug}`} key={slug}>
              <button>{description}</button>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Topics;
