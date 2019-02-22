import React, { Component } from "react";
import "../App.css";
import * as api from "../api.js";
import { Link } from "@reach/router";
import SortBy from "./sortBy";

class Articles extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;

    return (
      <div className="main">
        <SortBy sortedArticles={this.sortedArticles} />
        {articles.map(article => (
          <div key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
          </div>
        ))}
      </div>
    );
  }
  componentDidMount() {
    this.fetchArticles();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) this.fetchArticles();
  }

  fetchArticles = () => {
    const { topic } = this.props;
    api
      .getArticles(topic)
      .then(articles => {
        this.setState({ articles });
      })
      .catch(err => err);
  };

  sortedArticles = articles => {
    this.setState({ articles });
  };
}

export default Articles;
