import React, { Component } from "react";
import { addRobot } from "../redux/robots";
import { connect } from "react-redux";
import Navbar from "./Navbar";

class NewRobot extends Component {
  constructor() {
    super();
    this.state = { name: "" };
  }

  validateName(name) {
    let count = 0;
    for (let i = 0; i < name.length; i++) {
      if (name[i] !== " ") count++;
    }
    return !!count;
  }
  render() {
    return (
      <React.Fragment>
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
                return this.setState({ name: event.target.value });
              }}
            />
          </label>
          <button type="submit" disabled={!this.validateName(this.state.name)}>
            Submit
          </button>
          {!this.validateName(this.state.name) ? (
            <span style={{ color: "red" }}>
              {" "}
              <b>Name can't be empty</b>
            </span>
          ) : null}
        </form>
      </React.Fragment>
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
