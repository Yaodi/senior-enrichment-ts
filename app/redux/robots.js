import Axios from "axios";

const initialState = {
  robotsList: [],
  currentRobot: { fuelType: "", projects: [], name: "intialize" }
};

// ACTION TYPES
const GOT_ROBOTS_FROM_SERVER = "GOT_ROBOTS_FROM_SERVER";
const GOT_ROBOT_FROM_SERVER = "GOT_ROBOT_FROM_SERVER";
const GOT_NEW_ROBOT_FROM_SERVER = "GOT_NEW_ROBOT_FROM_SERVER";
const GOT_UPDATED_ROBOT_FROM_SERVER = "GOT_UPDATED_ROBOT_FROM_SERVER";

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
  type: GOT_NEW_ROBOT_FROM_SERVER,
  data
});

const updatedRobot = data => ({
  type: GOT_UPDATED_ROBOT_FROM_SERVER,
  data
});

// THUNKS!
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
export const addRobot = newRobotObj => {
  return async function(dispatch) {
    const { data } = await Axios.post("/api/robots", newRobotObj);
    dispatch(addedNewRobot(data));
  };
};
export const deleteRobot = id => {
  return async function(dispatch) {
    const { data } = await Axios.delete(`/api/robots/${id}`);
    dispatch(gotRobotsFromServer(data));
  };
};

export const updateRobot = (id, fieldToUpdate) => {
  return async function(dispatch) {
    const { data } = await Axios.put(`/api/robots/${id}`, fieldToUpdate);
    dispatch(updatedRobot(data));
  };
};

//REDUCER!

export const robotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ROBOTS_FROM_SERVER:
      return { ...state, robotsList: action.data };
    case GOT_ROBOT_FROM_SERVER:
      return { ...state, currentRobot: action.data };
    case GOT_NEW_ROBOT_FROM_SERVER:
      return { ...state, robotsList: [...state.robotsList, action.data] };
    case GOT_UPDATED_ROBOT_FROM_SERVER:
      return {
        ...state,
        robotsList: [
          ...state.robotsList.map(obj => {
            if (obj.id === action.data.id) return action.data;
            return obj;
          })
        ]
      };
    default:
      return state;
  }
};
