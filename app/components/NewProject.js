import React, { Component } from "react";
import { addProject } from "../redux/projects";
import { connect } from "react-redux";
import Navbar from "./Navbar";

class NewProject extends Component {
  constructor() {
    super();
    this.state = { title: "" };
  }
  render() {
    return (
      <div>
        <Navbar />
        <h1>Create A New Project!</h1>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.props.addProject(this.state);
            this.setState({ title: "" });
            this.props.history.push("/projects");
          }}
        >
          <label>
            Project Title:{" "}
            <input
              type="text"
              name="projectTitle"
              value={this.state.title}
              onChange={event => {
                event.preventDefault();
                return this.setState({ title: event.target.value });
              }}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  addProject: obj => dispatch(addProject(obj))
});

export default connect(
  null,
  mapDispatchToProps
)(NewProject);
