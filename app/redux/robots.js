import Axios from "axios";

const initialState = {
  robotsList: [],
  currentRobot: { fuelType: "", projects: [] }
};

// ACTION TYPES
const GOT_ROBOTS_FROM_SERVER = "GOT_ROBOTS_FROM_SERVER";
const GOT_ROBOT_FROM_SERVER = "GOT_ROBOT_FROM_SERVER";

// ACTION CREATORS
const gotRobotsFromServer = data => ({
  type: GOT_ROBOTS_FROM_SERVER,
  data
});

const gotRobotFromServer = data => ({
  type: GOT_ROBOT_FROM_SERVER,
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

export const robotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ROBOTS_FROM_SERVER:
      return { ...state, robotsList: action.data };
    case GOT_ROBOT_FROM_SERVER:
      return { ...state, currentRobot: action.data };
    default:
      return state;
  }
};
