import Axios from "axios";

const initialState = { projectsList: [], currentProject: { robots: [] } };

// ACTION TYPES
const GOT_PROJECTS_FROM_SERVER = "GOT_PROJECTS_FROM_SERVER";
const GOT_PROJECT_FROM_SERVER = "GOT_PROJECT_FROM_SERVER";

// ACTION CREATORS
const gotProjectsFromServer = data => ({
  type: GOT_PROJECTS_FROM_SERVER,
  data
});
const gotProjectFromServer = data => ({
  type: GOT_PROJECT_FROM_SERVER,
  data
});

// THUNK!
export const fetchProjects = () => {
  return async function(dispatch) {
    const { data } = await Axios.get("/api/projects");
    dispatch(gotProjectsFromServer(data));
  };
};
export const fetchProject = id => {
  return async function(dispatch) {
    const { data } = await Axios.get(`/api/projects/${id}`);
    dispatch(gotProjectFromServer(data));
  };
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PROJECTS_FROM_SERVER:
      return { ...state, projectsList: action.data };
    case GOT_PROJECT_FROM_SERVER:
      console.log("ACTION DATA", action.data);
      return { ...state, currentProject: action.data };
    default:
      return state;
  }
};
