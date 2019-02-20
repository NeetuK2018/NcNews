import React, { Component } from "react";
import * as api from "../api.js";

class Comments extends Component {
  state = {
    comments: {},
    isLoading: true
  };
  render() {
    const { comments, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>;
    return (
      <div className="main">
        {comments.map(comment => (
          <div key={comments.comment_id}>
            <div>
              <p>User:</p>
              {comment.username}
              <p>Comments:</p>
              {comment.body}
              <p>Votes:</p>
              {comment.votes}
            </div>
          </div>
        ))}
      </div>
    );
  }
  componentDidMount() {
    this.fetchComments();
  }
  fetchComments = () => {
    const { article_id } = this.props;
    api
      .getCommentsByArticleID(article_id)
      .then(comments => {
        this.setState({ comments, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default Comments;
