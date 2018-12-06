import React, { Component } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { fetchProject } from "../redux/projects";
import { Link } from "react-router-dom";

class SingleProject extends Component {
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.projectId);
  }
  render() {
    let deadline = this.props.project.deadline;
    if (deadline) {
      let arr = deadline.split("T");
      arr[0] = arr[0].split("-");
      let AMERICA = [arr[0][1], arr[0][2], arr[0][0]];

      deadline = `${AMERICA.join("/")} at ${arr[1].split(".")[0]}`;
    }
    return (
      <div>
        <Navbar />
        <h1> Title: {this.props.project.title}</h1>
        <h3> Deadline: {deadline}</h3>
        <h3> Robots Assigned: </h3>
        <p>
          <h3>Description: </h3>
          {this.props.project.description}
        </p>
        <h3>Priority Level: {this.props.project.priority}</h3>
        <h3>Robots Assigned:</h3>
        <ul>
          {this.props.project.robots.length ? (
            this.props.project.robots.map(robot => (
              <li>
                <Link to={`/robots/${robot.id}`}>{robot.name}</Link>
              </li>
            ))
          ) : (
            <h1>No robots assigned to this project, yikes!</h1>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { project: state.projects.currentProject };
};

const mapDispatchToProps = dispatch => {
  return { fetchProject: id => dispatch(fetchProject(id)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProject);
