import React, { Component } from "react";
import "../App.css";
import * as api from "../api.js";
import { Link } from "@reach/router";

class Users extends Component {
  state = {
    users: []
  };

  render() {
    const { users } = this.state;
    return (
      <div className="main">
        {users.map(user => (
          <div key={user.username}>
            <Link to={`/users/${user.username}/articles`}>{user.username}</Link>
          </div>
        ))}
      </div>
    );
  }
  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    api
      .getUsers()
      .then(users => {
        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default Users;
