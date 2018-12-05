import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllRobots from "./AllRobots";
import HomePage from "./HomePage";
import AllProjects from "./AllProjects";
import { Provider } from "react-redux";
import store from "../store";

export default class Root extends React.Component {
  componentDidMount() {
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
    // DISPATCH A FETCH ACTION TO GRAB ALL OF THE  DATA!!!!!!!
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/robots" component={AllRobots} />
            <Route exact path="/projects" component={AllProjects} />
          </div>
        </Router>
      </Provider>
    );
  }
}
