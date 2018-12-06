import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const HomePage = props => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Yaodi's Bots!</h1>
    </div>
  );
};

export default HomePage;
