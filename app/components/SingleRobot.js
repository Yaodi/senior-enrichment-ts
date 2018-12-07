import React, { Component } from "react";
import Navbar from "./Navbar";
import { fetchRobot, updateRobot, updateRelation } from "../redux/robots";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RobotUpdateForm from "./RobotUpdateForm";

class SingleRobot extends Component {
  componentDidMount() {
    this.props.fetchRobot(this.props.match.params.robotId);
  }
  render() {
    return (
      <div>
        <Navbar />
        <button
          onClick={() => {
            this.props.history.push(
              `/robots/${this.props.match.params.robotId}/update`
            );
          }}
        >
          Update
        </button>
        <h1> Name: {this.props.robot.name} </h1>
        <img src={this.props.robot.imageUrl} />
        <h3>
          Fuel Type:{" "}
          {this.props.robot.fuelType
            .slice(0, 1)
            .toUpperCase()
            .concat(this.props.robot.fuelType.slice(1))}
        </h3>
        <h3>Fuel Level: {this.props.robot.fuelLevel}%</h3>
        <h3>Projects: </h3>
        <ul>
          {this.props.robot.projects.length ? (
            this.props.robot.projects.map(project => (
              <li>
                <Link to={`/projects/${project.id}`}>{project.title}</Link>
                {"  "}
                <button
                  type="button"
                  onClick={event => {
                    event.preventDefault();
                    this.props.updateRelation(this.props.robot.id, project.id);
                    this.props.history.push("/updated");
                  }}
                >
                  {" "}
                  Remove
                </button>
              </li>
            ))
          ) : (
            <h1>This lazy robot has no projects right now!!</h1>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    robot: state.robots.currentRobot
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRobot: id => dispatch(fetchRobot(id)),
    updateRelation: (robotId, projectId) =>
      dispatch(updateRelation(robotId, projectId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleRobot);
