import React from "react";
import "../App.css";
import { Link } from "@reach/router";

const Sidebar = ({ user, logout }) => {
  if (user.username)
    return (
      <section className="sideBar">
        <p>Welcome to NC News {user.username}</p>
        <button onClick={logout}> Log out</button>{" "}
        <ul>
          <Link to={`/articles`}>
            <li>All Articles</li>
          </Link>
          <Link to={`/users`}>
            <li>All Users</li>
          </Link>
        </ul>
      </section>
    );

  return (
    <div>
      <h3>Please Login to View Articles</h3>
    </div>
  );
};

export default Sidebar;
