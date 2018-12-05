import { combineReducers } from "redux";
import projects from "./projects";
import Axios from "axios";
import { robotsReducer, fetchRobots } from "./robots";
import { projectsReducer } from "./projects";

// This reducer is just a stub. We should probably do something
// with that combineReducers thing up there...

// ACTION TYPES
// const GOT_ROBOTS_FROM_SERVER = "GOT_ROBOTS_FROM_SERVER";

// // ACTION CREATORS
// const gotRobotsFromServer = data => ({
//   type: GOT_ROBOTS_FROM_SERVER,
//   data
// });

// // THUNK!
// export const fetchRobots = () => {
//   return async function(dispatch) {
//     const { data } = await Axios.get("/api/robots");
//     dispatch(gotRobotsFromServer(data));
//   };
// };

const appReducer = combineReducers({
  robots: robotsReducer,
  projects: projectsReducer
});
// const appReducer = combineReducers({
// robots,
// projects,
// })

export default appReducer;
