import Axios from "axios";

const initialState = [];

// ACTION TYPES
const GOT_ROBOTS_FROM_SERVER = "GOT_ROBOTS_FROM_SERVER";

// ACTION CREATORS
const gotRobotsFromServer = data => ({
  type: GOT_ROBOTS_FROM_SERVER,
  data
});

// THUNK!
export const fetchRobots = () => {
  return async function(dispatch) {
    const { data } = await Axios.get("/api/robots");
    dispatch(gotRobotsFromServer(data));
  };
};

export const robotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ROBOTS_FROM_SERVER:
      return action.data;
    default:
      return state;
  }
};
