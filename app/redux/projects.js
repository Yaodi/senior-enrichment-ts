import Axios from "axios";

const initialState = {
  projectsList: [],
  currentProject: {
    robots: [],
    deadline: "",
    title: ""
  },
  loading: true
};

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
export const fetchProjects = sortBy => {
  return async function(dispatch) {
    const { data } = await Axios.get(`/api/projects/all/${sortBy}`);
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
  return async function() {
    await Axios.post("/api/projects", obj);
  };
};
export const deleteProject = id => {
  return async function(dispatch) {
    const { data } = await Axios.delete(`/api/projects/${id}`);
    dispatch(gotProjectsFromServer(data));
  };
};
export const updateProject = (id, fieldToUpdate) => {
  return async function(dispatch) {
    let { data } = await Axios.put(`/api/projects/${id}`, fieldToUpdate);
    dispatch(gotProjectFromServer(data));
  };
};
export const updateRelation = (projectId, robotId) => {
  return async function(dispatch) {
    const { data } = await Axios.put("/api/relations", {
      projectId,
      robotId,
      type: "Project"
    });
    dispatch(gotProjectFromServer(data));
  };
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PROJECTS_FROM_SERVER:
      return { ...state, projectsList: action.data, loading: false };
    case GOT_PROJECT_FROM_SERVER:
      return { ...state, currentProject: action.data };
    default:
      return state;
  }
};
