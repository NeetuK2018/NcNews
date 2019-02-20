import React, { Component } from "react";
import * as api from "../api.js";
import Comments from "./Comments";

class SingleArt extends Component {
  state = {
    article: {},
    isLoading: true
  };
  render() {
    const { article, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>;
    return (
      <div className="main">
        <div>
          <p>
            {article.title} ID:{article.article_id}
          </p>
          <div>
            {article.body}
            <p>by</p>
            <p>
              {article.author} Votes:{article.votes}
            </p>
          </div>
        </div>
        <Comments article_id={article.article_id} />
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
