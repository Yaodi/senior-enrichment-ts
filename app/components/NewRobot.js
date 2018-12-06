import React, { Component } from "react";
import { addRobot } from "../redux/robots";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { Redirect } from "react-router";

class NewRobot extends Component {
  constructor() {
    super();
    this.state = { name: "" };
  }
  render() {
    return (
      <div>
        <Navbar />
        <h1>Create Your Robot!</h1>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.props.addRobot(this.state);
            this.setState({ name: "" });
            this.props.history.push("/robots");
          }}
        >
          <label>
            Robot Name:{" "}
            <input
              type="text"
              name="robotName"
              value={this.state.name}
              onChange={event => {
                event.preventDefault();
                console.log(event.target.value);
                return this.setState({ name: event.target.value });
              }}
            />
          </label>
          <button type="submit">Submit</button>
          {/* </Link> */}
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  addRobot: obj => dispatch(addRobot(obj))
});

export default connect(
  null,
  mapDispatchToProps
)(NewRobot);
