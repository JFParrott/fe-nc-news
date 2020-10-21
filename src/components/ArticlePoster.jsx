import React from 'react';
import { postArticle } from '../utils/api';
import { navigate } from '@reach/router';
import styled from 'styled-components';

const FormIntro = styled.p`
  margin-left: 4px;
`;

const ArticleForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const TitleInput = styled.textarea`
  width: 480px;
  margin: 5px;
  @media screen and (max-width: 600px) {
    width: 80vw;
  }
  @media screen and (min-width: 850px) {
    width: 510px;
  }
`;

const BodyInput = styled.textarea`
  width: 550px;
  height: 200px;
  margin: 5px;
  @media screen and (max-width: 600px) {
    width: 90vw;
    height: 15vh;
  }
  @media screen and (min-width: 850px) {
    width: 600px;
  }
`;

const TopicSelect = styled.select`
  margin: 5px;
  width: 150px;
`;

const ArticleSubmit = styled.button`
  width: 100px;
`;

class ArticlePoster extends React.Component {
  state = {
    title: '',
    body: '',
    topic: '',
  };

  handleChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    this.setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  handleSubmit = (e) => {
    const { title, body, topic } = this.state;
    e.preventDefault();
    postArticle(title, topic, body).then(
      ({
        data: {
          postedArticle: { article_id },
        },
      }) => {
        this.setState({
          title: '',
          body: '',
          topic: '',
          articlePosted: true,
        });
        navigate(`articles/${article_id}`);
      }
    );
  };

  render() {
    const { title, body, topic } = this.state;
    return (
      <div>
        <FormIntro>Submit to Northcoders News</FormIntro>
        <ArticleForm onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title:</label>
          <TitleInput
            type="text"
            id="title"
            onChange={this.handleChange}
            name="title"
            value={title}
            required
          ></TitleInput>

          <label htmlFor="body">Text:</label>
          <BodyInput
            type="text"
            id="body"
            onChange={this.handleChange}
            name="body"
            value={body}
            required
          ></BodyInput>

          <label htmlFor="topic">Topic:</label>
          <TopicSelect
            id="topic"
            onChange={this.handleChange}
            name="topic"
            value={topic}
            required
          >
            <option value="">--Please select topic--</option>
            <option value="coding">Code is love, code is life</option>
            <option value="football">FOOTIE!</option>
            <option value="cooking">
              Hey good looking, what you got cooking?
            </option>
          </TopicSelect>

          <ArticleSubmit type="submit">Submit</ArticleSubmit>
        </ArticleForm>
      </div>
    );
  }
}

export default ArticlePoster;
