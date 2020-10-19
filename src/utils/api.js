import axios from 'axios';

export const getArticles = (slug) => {
  return axios.get('https://nc-news-jp.herokuapp.com/api/articles', {
    params: { topic: slug },
  });
};

export const postComment = (article_id, body) => {
  return axios.post(
    `https://nc-news-jp.herokuapp.com/api/articles/${article_id}/comments`,
    { body, username: 'jessjelly' }
  );
};
