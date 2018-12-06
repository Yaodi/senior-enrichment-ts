import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllRobots from "./AllRobots";
import HomePage from "./HomePage";
import AllProjects from "./AllProjects";
import { Provider } from "react-redux";
import store from "../store";
import SingleRobot from "./SingleRobot";
import SingleProject from "./SingleProject";
import NewProject from "./NewProject";
import NewRobot from "./NewRobot";
import RobotUpdateForm from "./RobotUpdateForm";

export default class Root extends React.Component {
  componentDidMount() {
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
    // DISPATCH A FETCH ACTION TO GRAB ALL OF THE  DATA!!!!!!!
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/robots" component={AllRobots} />
            <Route exact path="/projects" component={AllProjects} />
            <Route exact path="/newProject" component={NewProject} />
            <Route exact path="/newRobot" component={NewRobot} />
            <Route exact path="/robots/:robotId" component={SingleRobot} />
            <Route
              exact
              path="/projects/:projectId"
              component={SingleProject}
            />
            <Route
              exact
              path="/robots/:robotId/update"
              component={RobotUpdateForm}
            />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}
