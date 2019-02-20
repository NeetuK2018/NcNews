import axios from "axios";
const BASE_URL = "https://nc-news-neetu.herokuapp.com/api";

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);

  return data.topics;
};

export const getArticles = async topic => {
  const URL = topic
    ? `${BASE_URL}/topics/${topic}/articles`
    : `${BASE_URL}/articles`;

  const { data } = await axios.get(URL);
  return data.articles;
};

export const getArticlesByArticleID = async article_id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`);
  return data.article;
};
export const fetchUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);

  return data.user;
};

export const getCommentsByArticleID = async article_id => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${article_id}/comments`
  );
  return data.comments;
};

export const VoteOnArticle = async ({ article_id, direction }) => {
  const { data } = await axios.patch(`/articles/${article_id}`, {
    inc_votes: direction
  });
  return data.article;
};
// {article_id, comment_id direction}
