import React, { Component } from "react";

class Auth extends Component {
  state = {
    username: ""
  };
  render() {
    const { user, children } = this.props;
    const { username } = this.state;
    if (user.username) return <div className="main">{children}</div>;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Enter Username:</label>
        <input onChange={this.handleChange} value={username} required />
        <button type="submit">Login</button>
      </form>
    );
  }
  handleChange = event => {
    const { value } = event.target;
    this.setState({ username: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { login } = this.props;
    const { username } = this.state;
    login(username);
    this.setState({ username: "" });
  };
}

export default Auth;
