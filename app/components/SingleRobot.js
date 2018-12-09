import React, { Component } from "react";
import Navbar from "./Navbar";
import { fetchRobot, updateRelation, updateRobot } from "../redux/robots";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SingleRobot extends Component {
  componentDidMount() {
    this.props.fetchRobot(this.props.match.params.robotId);
  }
  render() {
    console.log("Props >>>>>>>", this.props.robot);
    return isNaN(parseInt(this.props.match.params.robotId, 10)) ||
      this.props.robot === null ? (
      <React.Fragment>
        <Navbar />
        <h1>Robot not Found</h1>
      </React.Fragment>
    ) : (
      <React.Fragment>
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
        <h1> {this.props.robot.name} </h1>
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
        {this.props.robot.projects.length ? (
          this.props.robot.projects.map(project => (
            <li>
              <Link to={`/projects/${project.id}`}>{project.title}</Link>
              {"  "}
              <button
                onClick={() => {
                  this.props.updateRelation(this.props.robot.id, project.id);
                }}
              >
                {" "}
                Unassign
              </button>
            </li>
          ))
        ) : (
          <h1>This lazy robot has no projects right now!!</h1>
        )}
      </React.Fragment>
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
      dispatch(updateRelation(robotId, projectId)),
    updateRobot: (id, fieldToUpdate) => dispatch(updateRobot(id, fieldToUpdate))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleRobot);
