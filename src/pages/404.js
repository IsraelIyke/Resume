import React from "react";
import { Link } from "react-router-dom";

export const P404 = () => {
  return (
    <div>
      Hello there, this page does not exist, 404 error stuff :)
      <br />
      <span>
        <Link to="/">Click here</Link> to go to the home page
      </span>
    </div>
  );
};
