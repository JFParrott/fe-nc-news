import React from 'react';
import { postArticle } from '../utils/api';
import { navigate } from '@reach/router';

class ArticlePoster extends React.Component {
  state = {
    title: '',
    body: '',
    topic: '',
    articlePosted: false,
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
    const { title, body, topic, articlePosted, article_id } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              onChange={this.handleChange}
              name="title"
              value={title}
              required
            ></input>
          </label>
          <label htmlFor="body">
            Text:
            <input
              type="text"
              id="body"
              onChange={this.handleChange}
              name="body"
              value={body}
              required
            ></input>
          </label>
          <label htmlFor="topic">
            Topic:
            <select
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
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
        {articlePosted ? <p>Created</p> : null}
      </div>
    );
  }
}

export default ArticlePoster;
