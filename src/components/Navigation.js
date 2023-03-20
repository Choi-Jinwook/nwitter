import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj, refreshUser }) => {
  if (userObj.displayName === null) {
    const name = userObj.email.split("@")[0];
    userObj.displayName = name;
    refreshUser();
  }
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">{userObj.displayName}</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
