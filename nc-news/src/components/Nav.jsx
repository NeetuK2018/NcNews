import React, { Component } from "react";
import "../App.css";
import * as api from "../api.js";
import { Link } from "@reach/router";
import "../nav.css";

class Nav extends Component {
  state = {
    topics: []
  };

  render() {
    const { topics } = this.state;
    return (
      <div className="nav">
        <p>Topics:</p>
        {topics.map(topic => (
          <span className="nav links" key={topic.slug}>
            <Link to={`/topics/${topic.slug}/articles`}>{topic.slug}</Link>
          </span>
        ))}
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
