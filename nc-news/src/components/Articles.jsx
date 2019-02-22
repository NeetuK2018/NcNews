import React, { Component } from "react";
import "../App.css";
import * as api from "../api.js";
import { Link, navigate } from "@reach/router";
import SortBy from "./sortBy";
import Error from "./error";

class Articles extends Component {
  state = {
    articles: [],
    errorStatus: null
  };
  render() {
    const { articles, errorStatus } = this.state;
    if (errorStatus !== null) return <Error errorStatus={errorStatus} />;

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
      .catch(err => {
        this.setState({ articles: [], errorStatus: err.response.status });
      });
  };

  sortedArticles = articles => {
    this.setState({ articles });
  };
}

export default Articles;
