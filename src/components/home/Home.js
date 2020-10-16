import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div>
      <p>Home Component</p>
      <Link to="/issues">Facebook React Issues</Link>
    </div>
  );
};

export default HomeComponent;
