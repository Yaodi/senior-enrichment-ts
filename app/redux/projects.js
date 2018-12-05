import Axios from "axios";

const initialState = [];

// ACTION TYPES
const GOT_PROJECTS_FROM_SERVER = "GOT_PROJECTS_FROM_SERVER";

// ACTION CREATORS
const gotProjectsFromServer = data => ({
  type: GOT_PROJECTS_FROM_SERVER,
  data
});

// THUNK!
export const fetchProjects = () => {
  return async function(dispatch) {
    const { data } = await Axios.get("/api/projects");
    dispatch(gotProjectsFromServer(data));
  };
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PROJECTS_FROM_SERVER:
      return action.data;
    default:
      return state;
  }
};
