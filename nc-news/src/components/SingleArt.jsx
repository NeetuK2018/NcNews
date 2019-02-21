import React, { Component } from "react";
import * as api from "../api.js";
import Comments from "./Comments";
import Voter from "./Voter";
import Moment from "moment";

class SingleArt extends Component {
  state = {
    article: {},
    isLoading: true
  };
  render() {
    const { article, isLoading } = this.state;
    const { user } = this.props;
    if (isLoading) return <p>Loading...</p>;
    return (
      <div className="main">
        <div>
          <p>
            {article.title} {article.topic}{" "}
            {Moment(article.created_at, "YYYY-MM-DD-Thh:mm:ss").fromNow()}
          </p>
          <div>
            {article.body}
            <p>by</p>
            {article.author === user.username ? (
              <p>Votes:{article.votes}</p>
            ) : (
              <Voter votes={article.votes} article_id={article.article_id} />
            )}

            <p>Author: {article.author}</p>
          </div>
        </div>
        <Comments
          article_id={article.article_id}
          user={user}
          comments={article.article_id}
        />
      </div>
    );
  }
  componentDidMount() {
    this.fetchArticles();
  }
  fetchArticles = () => {
    const { article_id } = this.props;
    api
      .getArticlesByArticleID(article_id)
      .then(article => {
        this.setState({ article, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default SingleArt;
