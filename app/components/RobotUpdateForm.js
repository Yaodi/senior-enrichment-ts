import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRobot, updateRobot } from "../redux/robots";
import Navbar from "./Navbar";

class RobotUpdateForm extends Component {
  constructor() {
    super();
    this.state = { name: "", fuelType: "electric" };
  }
  render() {
    return (
      <React.Fragment>
        <Navbar />
        {/* <h1>Name:{this.props.robot.name}</h1> */}
        <h2>Update Robot!</h2>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.props.updateRobot(this.props.robot.id, this.state);
            this.props.history.push(`/robots/${this.props.robot.id}`);
          }}
        >
          <div>
            Name:{" "}
            <input
              type="text"
              value={this.state.name}
              onChange={event => {
                this.setState({ name: event.target.value });
              }}
            />
          </div>
          <br />
          <div>
            Fuel Type:{" "}
            <select
              name="fuelType"
              onChange={event => {
                this.setState({ fuelType: event.target.value });
              }}
            >
              <option value="electric">Electric</option>
              <option value="diesel">Diesel</option>
              <option value="gas">Gas</option>
            </select>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
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
    updateRobot: (id, fieldToUpdate) => dispatch(updateRobot(id, fieldToUpdate))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RobotUpdateForm);
