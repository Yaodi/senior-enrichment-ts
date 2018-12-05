import React, { Component } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { fetchProjects } from "../redux/projects";

class AllProjects extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }
  render() {
    return (
      <div>
        <Navbar />
        {this.props.projects.map(project => (
          <div>
            <h4>Project Name: {project.name}</h4>
            <p>Project Deadline: {project.deadline}</p>
          </div>
        ))}
        )
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { projects: state.projects };
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
