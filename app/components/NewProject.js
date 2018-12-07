import React, { Component } from "react";
import { addProject } from "../redux/projects";
import { connect } from "react-redux";
import Navbar from "./Navbar";

class NewProject extends Component {
  constructor() {
    super();
    this.state = { title: "" };
  }
  validateTitle(title) {
    let count = 0;
    for (let i = 0; i < title.length; i++) {
      if (title[i] !== " ") count++;
    }
    return !!count;
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
          <button
            type="submit"
            disabled={!this.validateTitle(this.state.title)}
          >
            Submit
          </button>
          {!this.validateTitle(this.state.title) ? (
            <span> Invalid Title </span>
          ) : null}
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
