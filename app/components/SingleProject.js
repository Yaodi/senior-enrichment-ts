import React, { Component } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { fetchProject, updateRelation, updateProject } from "../redux/projects";
import { Link } from "react-router-dom";

class SingleProject extends Component {
  constructor() {
    super();
    this.state = { show: false };
  }
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.projectId);
  }
  deadline(deadline) {
    if (deadline) {
      let arr = deadline.split("T");
      arr[0] = arr[0].split("-");
      let AMERICA = [arr[0][1], arr[0][2], arr[0][0]];

      return `${AMERICA.join("/")} at ${arr[1].split(".")[0]}`;
    }
  }
  render() {
    return isNaN(parseInt(this.props.match.params.projectId, 10)) ||
      this.props.project === null ? (
      <React.Fragment>
        <Navbar /> <h1>Project does not exist</h1>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Navbar />
        <button
          onClick={() => {
            this.props.history.push(
              `/projects/${this.props.match.params.projectId}/update`
            );
          }}
        >
          Update
        </button>
        <h1> {this.props.project.title}</h1>
        <h3> Deadline: {this.deadline(this.props.project.deadline)}</h3>
        <h3>Description: </h3>
        {this.props.project.description}
        <h3>Priority Level: {this.props.project.priority}</h3>

        {!this.props.project.completed ? (
          <button
            type="button"
            onClick={() =>
              this.props.updateProject(this.props.project.id, {
                completed: true
              })
            }
          >
            Complete
          </button>
        ) : (
          <h3>Complete!</h3>
        )}

        <h3>Robots Assigned:</h3>

        {!this.props.project.robots.length ? (
          <h1>No robots assigned to this project, yikes!</h1>
        ) : this.state.show ? (
          <React.Fragment>
            <button
              onClick={() => {
                this.setState({ show: !this.state.show });
              }}
            >
              Collapse
            </button>
            <span className="allRobots">
              {this.props.project.robots.map(robot => (
                <span className="robot">
                  <Link className="linkText" to={`/robots/${robot.id}`}>
                    {robot.name}
                    <br />
                    <img src={robot.imageUrl} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      this.props.updateRelation(
                        this.props.project.id,
                        robot.id
                      );
                    }}
                  >
                    Remove
                  </button>
                </span>
              ))}
            </span>
          </React.Fragment>
        ) : (
          <button
            onClick={() => {
              this.setState({ show: !this.state.show });
            }}
          >
            Expand
          </button>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { project: state.projects.currentProject };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProject: id => dispatch(fetchProject(id)),
    updateProject: (id, fieldToUpdate) =>
      dispatch(updateProject(id, fieldToUpdate)),
    updateRelation: (projectId, robotId) =>
      dispatch(updateRelation(projectId, robotId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProject);
