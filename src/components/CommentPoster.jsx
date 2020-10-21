import React from 'react';
import { postComment } from '../utils/api';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 15px 0 15px;
`;

const InputField = styled.textarea`
  width: 70vw;
  height: 20vh;
`;

const SubmitButton = styled.button`
  width: 70px;
  margin-top: 7px;
`;

class CommentPoster extends React.Component {
  state = {
    body: '',
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ body: value });
  };

  handleSubmit = (e) => {
    const { article_id, addComment } = this.props;
    const { body } = this.state;
    e.preventDefault();
    postComment(article_id, body).then(() => {
      addComment();
    });
  };

  render() {
    const { body } = this.state;
    return (
      <div>
        <FormContainer onSubmit={this.handleSubmit}>
          <p>Post a comment...</p>
          <label>
            <InputField
              type="text"
              onChange={this.handleChange}
              value={body}
              required
            ></InputField>
          </label>
          <SubmitButton type="submit">Submit</SubmitButton>
        </FormContainer>
      </div>
    );
  }
}

export default CommentPoster;
