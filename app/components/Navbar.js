import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <button type="button">
        <Link to="/">Home Page</Link>
      </button>
      <button type="button">
        <Link to="/robots"> Robots Page </Link>
      </button>
      <button type="button">
        <Link to="/projects"> Projects Page </Link>
      </button>
      <button type="button">
        <Link to="/newProject">Create New Project</Link>
      </button>
      <button type="button">
        <Link to="/newRobot">Create New Robot</Link>
      </button>
    </nav>
  );
};
export default Navbar;
