import React, { Component } from "react";
import * as api from "../api.js";
import Moment from "moment";
import AddComment from "./Addcomment";
import Voter from "./Voter";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    commentDeleted: false
  };
  render() {
    const { user, article_id, newComment, commentDeleted } = this.props;
    const { comments, isLoading } = this.state;

    if (isLoading) return <p>Loading...</p>;
    if (commentDeleted) return null;
    return (
      <div className="main">
        <h2>Comment below:</h2>
        {comments.map(comment => (
          <div key={comment.comment_id}>
            <div>
              <p>Comment:</p>
              {comment.body}
              <p>by</p>
              {comment.username}
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
              {user.username === comment.username && (
                <button onClick={() => this.handleDelete(comment.comment_id)}>
                  delete
                </button>
              )}
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
  handleDelete = comment_id => {
    const { article_id } = this.props;

    api.deleteCommentByID({ article_id, comment_id }).then(res => {
      this.setState(prevState => ({
        comments: prevState.comments.filter(
          comment => comment.comment_id !== comment_id
        )
      }));
      this.setState({ commentDeleted: true });
    });
  };
}

export default Comments;
//this.props.navigate('/', {state:{commentDeleted:true}})
