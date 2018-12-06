import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="dir">
        <Link className="linkText" to="/">
          Home
        </Link>
      </div>
      <div className="dir">
        <Link className="linkText" to="/robots">
          {" "}
          Robots{" "}
        </Link>
      </div>
      <div className="dir">
        <Link className="linkText" to="/projects">
          {" "}
          Projects{" "}
        </Link>
      </div>
      <div className="dir">
        <Link className="linkText" to="/newProject">
          New Project
        </Link>
      </div>
      <div className="dir">
        <Link className="linkText" to="/newRobot">
          New Robot
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
