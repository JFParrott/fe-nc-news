import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nc-news-jp.herokuapp.com/api/',
});

export const getArticles = (slug, sort_by, order) => {
  return instance.get('articles', {
    params: { topic: slug, sort_by, order },
  });
};

export const postComment = (article_id, body) => {
  return instance.post(`articles/${article_id}/comments`, {
    body,
    username: 'jessjelly',
  });
};

export const postArticle = (title, topic, body) => {
  console.log(title, topic, body);
  return instance.post('articles', {
    title,
    topic,
    body,
    author: 'jessjelly',
  });
};

export const getArticleComments = (article_id) => {
  return instance.get(`articles/${article_id}/comments`);
};

export const getTopics = () => {
  return instance.get('topics');
};

export const getArticle = (article_id) => {
  return instance.get(`articles/${article_id}`);
};

export const patchCommentVotes = (comment_id, value) => {
  return instance.patch(`comments/${comment_id}`, {
    inc_votes: parseInt(value),
  });
};

export const patchArticleVotes = (article_id, value) => {
  return instance.patch(`articles/${article_id}`, {
    inc_votes: parseInt(value),
  });
};

export const delComment = (comment_id) => {
  return instance.patch(`comments/${comment_id}`);
};
