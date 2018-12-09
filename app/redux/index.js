import { combineReducers } from "redux";
import { robotsReducer, fetchRobots } from "./robots";
import { projectsReducer } from "./projects";

const appReducer = combineReducers({
  robots: robotsReducer,
  projects: projectsReducer
});

export default appReducer;
