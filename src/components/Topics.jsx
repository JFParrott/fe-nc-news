import React from 'react';
import { Link } from '@reach/router';
import { getTopics } from '../utils/api';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 1.8vh;
  height: 100%;
  background-color: #f2fcff;
  margin: 0px 5px 0px 5px;
  border: 1px;
  &:hover {
    text-decoration: underline;
  }
`;

const TopicsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  border: 1px solid black;
  background-color: #f2fcff;
`;

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
      <TopicsContainer>
        {topics.map(({ slug, description }) => {
          return (
            <Link to={`/topics/${slug}`} key={slug}>
              <Button className="topic-button">- {description} -</Button>
            </Link>
          );
        })}
      </TopicsContainer>
    );
  }
}

export default Topics;
