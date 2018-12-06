import React, { Component } from "react";
import Navbar from "./Navbar";
import { fetchRobot, updateRobot } from "../redux/robots";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SingleRobot extends Component {
  componentDidMount() {
    this.props.fetchRobot(this.props.match.params.robotId);
  }
  render() {
    // this.props.robot.projects = [];
    return (
      <div>
        <Navbar />
        <button
          onClick={() =>
            this.props.updateRobot(this.props.robot.id, {
              name: "Changed"
            })
          }
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
    robot: state.robots.currentRobot,
    robotsList: state.robots.robotsList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRobot: id => dispatch(fetchRobot(id)),
    updateRobot: (id, fieldToUpdate) => dispatch(updateRobot(id, fieldToUpdate))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleRobot);
