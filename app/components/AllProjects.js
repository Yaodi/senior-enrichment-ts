import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProjects, deleteProject } from "../redux/projects";
import { runInThisContext } from "vm";

class AllProjects extends Component {
  constructor() {
    super();
    this.state = { sortBy: "createdAt" };
  }
  componentDidMount() {
    this.props.fetchProjects(this.state.sortBy);
  }
  render() {
    return this.props.loading ? (
      <h1>loading</h1>
    ) : this.props.projects.length ? (
      <div>
        <Navbar />
        <div className="projectList">
          {this.props.projects.map(project => {
            let deadline = project.deadline;
            let arr = deadline.split("T");
            arr[0] = arr[0].split("-");
            let AMERICA = [arr[0][1], arr[0][2], arr[0][0]];
            deadline = AMERICA.join("/");

            return (
              <span className="project">
                <button
                  type="button"
                  onClick={() => this.props.deleteProject(project.id)}
                >
                  x
                </button>
                <Link
                  style={{ textDecorationLine: "none", color: "black" }}
                  to={`/projects/${project.id}`}
                >
                  <h2>{project.title}</h2>
                  <h4>Deadline: {deadline}</h4>
                  <h4>Description</h4> {project.description}
                </Link>
              </span>
            );
          })}
        </div>
        )
      </div>
    ) : (
      <div>
        <Navbar />
        <h1> NO PROJECTS </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projectsList,
    loading: state.projects.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: sortBy => dispatch(fetchProjects(sortBy)),
    deleteProject: id => dispatch(deleteProject(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProjects);

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState)(AllProjects)
