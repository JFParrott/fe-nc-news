import axios from 'axios';

export const getArticles = (slug, sort_by) => {
  return axios.get('https://nc-news-jp.herokuapp.com/api/articles', {
    params: { topic: slug, sort_by },
  });
};

export const postComment = (article_id, body) => {
  return axios.post(
    `https://nc-news-jp.herokuapp.com/api/articles/${article_id}/comments`,
    { body, username: 'jessjelly' }
  );
};

export const getArticleComments = (article_id) => {
  return axios.get(
    `https://nc-news-jp.herokuapp.com/api/articles/${article_id}/comments`
  );
};

export const getTopics = () => {
  return axios.get('https://nc-news-jp.herokuapp.com/api/topics');
};

export const getArticle = (article_id) => {
  return axios.get(
    `https://nc-news-jp.herokuapp.com/api/articles/${article_id}`
  );
};

export const patchCommentVotes = (comment_id, value) => {
  return axios.patch(
    `https://nc-news-jp.herokuapp.com/api/comments/${comment_id}`,
    {
      inc_votes: parseInt(value),
    }
  );
};

export const patchArticleVotes = (article_id, value) => {
  return axios.patch(
    `https://nc-news-jp.herokuapp.com/api/articles/${article_id}`,
    {
      inc_votes: parseInt(value),
    }
  );
};
