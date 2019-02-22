import React, { Component } from "react";
import * as api from "../api.js";
import Articles from "./Articles";
import { navigate } from "@reach/router";
import NewTopic from "./NewTopic";
import Error from "./error";

class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "coding",
    errorStatus: null,
    
  };
  render() {
    const { body, title, topic, errorStatus } = this.state;
    const { topics, user } = this.props;
    if (errorStatus !== null) return <Error errorStatus={errorStatus} />;
    return (
      <div className="sidebar">
        {this.state.topic === "add-topic" && <NewTopic user={user} />}
        {this.state.topic !== "add topic" && (
          <form className="articleAdd" onSubmit={this.handleSubmit}>
            <h3>Post an Article</h3> <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={this.handleChange}
              name="title"
              required
            />
            <br />
            <label>Topic</label>
            <select id="topics" onChange={this.handleChange} name="topic">
              {" "}
              {topics &&
                topics.map(topic => {
                  return (
                    <option key={topic.slug} value={topic.slug}>
                      {topic.slug}
                    </option>
                  );
                })}
              <option key="other" value="add-topic">
                Add Topic
              </option>
            </select>
            <br />
            <label>Your article</label>
            <input
              type="text"
              value={body}
              onChange={this.handleChange}
              name="body"
              required
            />
            {this.state.topic !== "add-topic" && (
              <button type="submit">Submit Article</button>
            )}
          </form>
        )}
        {
          (title,
          topic,
          body && <Articles article={this.state.body} user={user} />)
        }
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, body, topic } = this.state;
    const { user } = this.props;

    api
      .addArticle(title, topic, body, user.username)
      .then(article => {
        this.setState({ title: "", topic: "", body: "" });
        navigate(`/articles/${article.article_id}`);
      })
      .catch(err => {
        this.setState({ errorStatus: err.response.status });
      });
  };
}

export default AddArticle;
