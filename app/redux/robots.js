import Axios from "axios";

const initialState = {
  robotsList: [],
  currentRobot: { fuelType: "", projects: [] }
};

// ACTION TYPES
const GOT_ROBOTS_FROM_SERVER = "GOT_ROBOTS_FROM_SERVER";
const GOT_ROBOT_FROM_SERVER = "GOT_ROBOT_FROM_SERVER";
const ADDED_NEW_ROBOT = "ADDED_NEW_ROBOT";
const DELETED_ROBOT_FROM_SERVER = "DELETED_ROBOT_FROM_SERVER";

// ACTION CREATORS
const gotRobotsFromServer = data => ({
  type: GOT_ROBOTS_FROM_SERVER,
  data
});

const gotRobotFromServer = data => ({
  type: GOT_ROBOT_FROM_SERVER,
  data
});

const addedNewRobot = data => ({
  type: ADDED_NEW_ROBOT,
  data
});

const deletedRobotFromServer = data => ({
  type: DELETED_ROBOT_FROM_SERVER,
  data
});

// THUNK!
export const fetchRobots = () => {
  return async function(dispatch) {
    const { data } = await Axios.get("/api/robots");
    dispatch(gotRobotsFromServer(data));
  };
};
export const fetchRobot = id => {
  return async function(dispatch) {
    const { data } = await Axios.get(`/api/robots/${id}`);
    dispatch(gotRobotFromServer(data));
  };
};
export const addRobot = obj => {
  console.log("thunk here");
  return async function(dispatch) {
    const { data } = await Axios.post("/api/robots", obj);
    dispatch(addedNewRobot(data));
  };
};
export const deleteRobot = obj => {
  return async function(dispatch) {
    const { data } = await Axios.delete("/api/robots", obj);
    dispatch(deletedRobotFromServer("data"));
  };
};

//REDUCER!

export const robotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ROBOTS_FROM_SERVER:
      return { ...state, robotsList: action.data };
    case GOT_ROBOT_FROM_SERVER:
      return { ...state, currentRobot: action.data };
    case ADDED_NEW_ROBOT:
      return { ...state, robotsList: [...state.robotsList, action.data] };
    case DELETED_ROBOT_FROM_SERVER:
      return console.log("Houston, we've got a reducer.");
    default:
      return state;
  }
};
