import React from 'react';
import { Link } from '@reach/router';
import { getTopics } from '../utils/api';

class Topics extends React.Component {
  state = {
    topics: [],
  };

  componentDidMount() {
    getTopics().then(({ data: { topics } }) => {
      this.setState({ topics });
    });
  }

  render() {
    const { topics } = this.state;
    return (
      <div>
        {topics.map(({ slug, description }) => {
          return (
            <Link to={`/topics/${slug}`} key={slug}>
              <button>{description}</button>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Topics;
