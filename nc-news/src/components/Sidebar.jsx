import React from "react";
import "../App.css";
import { Link } from "@reach/router";

const Sidebar = ({ user, logout }) => {
  if (user.username)
    return (
      <section className="sideBar">
        <p>Welcome to NC News {user.username}</p>
        <button onClick={logout}> Log out</button>{" "}
      </section>
    );

  return (
    <div>
      <h3>Please Login to View Articles</h3>
      <ul>
        <Link to={`/articles`}>
          <li>All Articles</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
