import Axios from "axios";

const initialState = {
  projectsList: [],
  currentProject: { robots: [], deadline: "" }
};

// ACTION TYPES
const GOT_PROJECTS_FROM_SERVER = "GOT_PROJECTS_FROM_SERVER";
const GOT_PROJECT_FROM_SERVER = "GOT_PROJECT_FROM_SERVER";
const ADDED_NEW_PROJECT = "ADDED_NEW_PROJECT";

// ACTION CREATORS
const gotProjectsFromServer = data => ({
  type: GOT_PROJECTS_FROM_SERVER,
  data
});
const gotProjectFromServer = data => ({
  type: GOT_PROJECT_FROM_SERVER,
  data
});
const addedNewProject = data => ({
  type: ADDED_NEW_PROJECT,
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
export const addProject = obj => {
  return async function(dispatch) {
    const { data } = await Axios.post("/api/projects", obj);
    dispatch(addedNewProject(data));
  };
};
export const deleteProject = id => {
  return async function(dispatch) {
    const { data } = await Axios.delete(`/api/projects/${id}`);
    dispatch(gotProjectsFromServer(data));
  };
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PROJECTS_FROM_SERVER:
      return { ...state, projectsList: action.data };
    case GOT_PROJECT_FROM_SERVER:
      return { ...state, currentProject: action.data };
    case ADDED_NEW_PROJECT:
      return { ...state, projectsList: [...state.projectsList, action.data] };
    default:
      return state;
  }
};
