import React, { Component } from "react";
import * as api from "../api.js";
import Articles from "./Articles";

class AddArticle extends Component {
  state = {
    body: ""
  };
  render() {
    const { body } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Add a comment...</p>
          <input type="text" value={body} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
        {body && <Articles newArticle={this.state.body} />}
      </div>
    );
  }
  handleChange = event => {
    this.setState({ body: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { body } = this.state;
    const { article_id, user } = this.props;

    api.addArticletByArticleID(body, article_id, user);
    this.setState({ body: "" });
  };
}

export default AddArticle;
