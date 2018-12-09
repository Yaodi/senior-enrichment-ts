import Axios from "axios";

const initialState = {
  robotsList: [],
  currentRobot: {
    fuelType: "",
    projects: [],
    name: "",
    fuelLevel: 0
  },
  loading: true
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

// THUNKS!
export const fetchRobots = sortBy => {
  return async function(dispatch) {
    const { data } = await Axios.get(`/api/robots/all/${sortBy}`);
    dispatch(gotRobotsFromServer(data));
  };
};
export const fetchRobot = id => {
  return async function(dispatch) {
    const { data } = await Axios.get(`/api/robots/${id}`);
    dispatch(gotRobotFromServer(data));
  };
};
export const addRobot = newRobotObj => {
  return async function() {
    await Axios.post("/api/robots", newRobotObj);
  };
};
export const deleteRobot = id => {
  return async function(dispatch) {
    const { data } = await Axios.delete(`/api/robots/${id}`);
    dispatch(gotRobotsFromServer(data));
  };
};
export const updateRelation = (robotId, projectId) => {
  return async function(dispatch) {
    const { data } = await Axios.put("/api/relations", {
      robotId,
      projectId
    });
    dispatch(gotRobotFromServer(data));
  };
};

export const updateRobot = (id, fieldToUpdate) => {
  return async function() {
    await Axios.put(`/api/robots/${id}`, fieldToUpdate);
  };
};

//REDUCER!

export const robotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ROBOTS_FROM_SERVER:
      return { ...state, robotsList: action.data, loading: false };
    case GOT_ROBOT_FROM_SERVER:
      return { ...state, currentRobot: action.data };
    default:
      return state;
  }
};
