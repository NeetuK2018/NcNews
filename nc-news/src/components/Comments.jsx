import React, { Component } from "react";
import * as api from "../api.js";
import Moment from "moment";
import AddComment from "./Addcomment";
import Voter from "./Voter";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true
  };
  render() {
    const { user, article_id, newComment } = this.props;
    const { comments, isLoading } = this.state;
    console.log(this.state);
    if (isLoading) return <p>Loading...</p>;
    return (
      <div className="main">
        <h2>Comment below:</h2>
        {comments.map(comment => (
          <div key={comment.comment_id}>
            <div>
              <p>Comment:</p>
              {comment.body}
              <p>by</p>
              {comment.username === user.username ? (
                <p>Votes:{comment.votes}</p>
              ) : (
                <Voter
                  votes={comment.votes}
                  comment_id={comment.comment_id}
                  article_id={comment.article_id}
                />
              )}
              <p>Date added:</p>
              {Moment(comment.created_at, "YYYY-MM-DD-Thh:mm:ss").fromNow()}
            </div>
          </div>
        ))}
        <AddComment user={user} article_id={article_id} />
        {newComment}
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
