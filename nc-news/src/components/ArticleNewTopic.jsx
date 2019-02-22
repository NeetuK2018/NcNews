import React, { Component } from "react";
import * as api from "../api.js";
import { navigate } from "@reach/router";

class ArticleNewTopic extends Component {
  state = {
    title: "",
    body: ""
  };
  render() {
    const { body, title } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={this.handleChange}
            name="title"
          />
          <label>Your article</label>
          <input
            type="text"
            value={body}
            onChange={this.handleChange}
            name="body"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, body } = this.state;
    const { user, topic } = this.props;

    api.addArticle(title, topic, body, user.username).then(article => {
      navigate(`/articles/${article.article_id}`);
    });
    this.setState({ title: "", body: "" });
  };
}

export default ArticleNewTopic;
