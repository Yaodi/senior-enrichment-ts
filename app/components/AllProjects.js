import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProjects } from "../redux/projects";

class AllProjects extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }
  render() {
    return this.props.projects.length ? (
      <div>
        <Navbar />
        {this.props.projects.map(project => (
          <div>
            <h4>Project Title: {project.title}</h4>
            <p>Project Deadline: {project.deadline}</p>
            <p>
              <h4>Description:</h4> {project.description}
            </p>
            <Link to={`/projects/${project.id}`}>View Project</Link>
          </div>
        ))}
        )
      </div>
    ) : (
      <div>
        <Navbar />
        <h1>ERROR NO PROJECTS FOUND</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { projects: state.projects.projectsList };
};

const mapDispatchToProps = dispatch => {
  return { fetchProjects: () => dispatch(fetchProjects()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProjects);

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState)(AllProjects)
