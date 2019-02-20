import React, { Component } from "react";
import "../App.css";
import * as api from "../api.js";
import { Link } from "@reach/router";

class Articles extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    const { user } = this.props;
    return (
      <div className="main">
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
    console.log("updating articles", this.props.topic);
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
        console.log(err);
      });
  };
}

export default Articles;
