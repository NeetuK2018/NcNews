import React, { Component } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import { Router } from "@reach/router";
import "./App.css";
import SingleArt from "./components/SingleArt";
import * as api from "./api.js";
import Auth from "./components/Auth";
import Users from "./components/Users";
import SingleUserArticles from "./components/SingleUserArticles";

class App extends Component {
  state = {
    user: {}
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header />
        <Nav />
        <Auth user={user} login={this.setUser}>
          <Router className="main">
            <Articles path="/" />
            <Articles path="/topics/:topic/articles" />
            <Articles path="/articles" />
            <SingleArt path="/articles/:article_id" user={user} />
            <Users path="/users" />
            <SingleUserArticles path="/users/:username/articles" />
          </Router>
        </Auth>
        <Sidebar user={user} logout={this.clearUser} />
        <Footer />
      </div>
    );
  }

  setUser = username => {
    api.getUserByUsername(username).then(user => {
      this.setState({ user });
    });
  };

  clearUser = () => {
    this.setState({ user: "" });
  };
}
export default App;
