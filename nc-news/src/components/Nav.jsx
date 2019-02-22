import React, { Component } from "react";
import "../App.css";
import * as api from "../api.js";
import { Link } from "@reach/router";
import "../nav.css";
import AddArticle from "../components/AddArticle";

class Nav extends Component {
  state = {
    topics: []
  };

  render() {
    const { topics } = this.state;
    const { user } = this.props;
    return (
      <div className="nav links">
        <Link to={`/topics/topic/articles`}>
          <p>Post an Article</p>
        </Link>
        <p>Topics:</p>

        {topics.map(topic => (
          <span key={topic.slug}>
            <Link to={`/topics/${topic.slug}/articles`}>{topic.slug} </Link>
          </span>
        ))}

        <p>
          {" "}
          <AddArticle topics={topics} user={user} />
        </p>
      </div>
    );
  }
  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default Nav;
